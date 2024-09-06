import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "..";
import { categoriesTable, measurementTypesTable, productsTable, productVariantsTable, sizeChartsTable, sizesTable, sizeStocksTable } from "../schema/Product";
import { error } from "console";
import { Product } from "../../types/custom_types";
import { uploadProductImgs } from "../../utils/imgHandler";

export async function getAllProducts() {
   return db.query.productsTable.findMany();
}



export async function queryProducts(prompt: string) {
   return await db
      .select({...
         getTableColumns(productVariantsTable),
         rank: sql`ts_rank(searchable_text, websearch_to_tsquery('english', ${prompt}))`
      })
      .from(productVariantsTable)
      .where(sql`searchable_text @@ websearch_to_tsquery('english', ${prompt})`)
      // .orderBy(sql`ts_rank(searchable_text, websearch_to_tsquery('english', ${prompt}))`);
      .orderBy(t=> desc(t.rank));
}


export async function insertProduct(product :Product) {
   try {
      await db.transaction(async (tx) => {
         // await tx.insert(categoriesTable).values({category_type: product.category}).onConflictDoNothing();

         await tx.insert(productsTable).values({
            product_id: product.product_id,
            supplier: product.supplier,
            category: product.category,
            gender: product.gender,
            age_group: product.ageGroup,
            createdAt: new Date(),
            updatedAt: new Date()
         })
         .onConflictDoNothing();


         for (const variant of product.variants) {
            await tx.insert(productVariantsTable).values({
               variant_id: variant.variant_id,
               product_id: product.product_id,
               name: product.name,
               color: variant.color,
               design: variant.design,
               description: variant.description,
               price: product.price,
               createdAt: new Date(),
               updatedAt: new Date()
            })
            .onConflictDoNothing();

            for (const sizeObj of variant.sizes){
               await tx.insert(sizeStocksTable).values({
                  variant_id:variant.variant_id,
                  size: sizeObj.size,
                  quantity: sizeObj.stock_quantity
               })
               .onConflictDoNothing();
            }
         }

         for (const variant of product.variants) {
            await tx.update(productVariantsTable)
               .set({
                  img_front: variant.img_front.name,
                  img_back: variant.img_rear ? variant.img_rear.name : ""
               })
               .where(eq(productVariantsTable.variant_id, variant.variant_id));
         }

         await uploadProductImgs(product);

      });

      return {
         isSuccess: true,
         msg: "Product added successfully.",
         error: ""
      }
   }
   catch(e) {
      return {
         isSuccess: false,
         msg: "Error inserting product to databse.",
         error: e
      };
   }
}


export async function queryVariantById(variant_id: string) {
   try {
      const variant = await db
         .select()
         .from(productVariantsTable)
         .where(eq(productVariantsTable.variant_id, variant_id));

      return {
         isSuccess: true,
         data: variant[0],
         msg: "",
         error: ""
      };
   }
   catch (e) {
      return {
         isSuccess: false,
         data: null,
         msg: "Couldn't get variant from database.",
         error: e
      };
   }
}