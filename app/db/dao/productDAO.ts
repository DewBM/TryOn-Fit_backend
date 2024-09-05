import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "..";
import { categoriesTable, measurementTypesTable, Product, productsTable, productVariantsTable, sizeChartsTable, sizesTable } from "../schema/Product";
import { error } from "console";

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


// export async function insertProduct(product :Product) {
//    try {
//       await db.transaction(async (tx) => {
//          await tx.insert(categoriesTable).values({category_type: product.category}).onConflictDoNothing();

//          await tx.insert(productsTable).values({
//             product_id: product.product_id,
//             supplier: product.supplier,
//             category: product.category,
//             gender: product.gender,
//             age_group: product.ageGroup,
//             createdAt: new Date(),
//             updatedAt: new Date()
//          })
//          .onConflictDoNothing();

//          const sizes = product.variant.sizes;
//          for (const sizeObj of sizes){
//             for (const measurement of sizeObj.measurements){
//                await tx.insert(measurementTypesTable).values({
//                   measurement_type: measurement.measurement_type
//                })
//                .onConflictDoNothing();

//                await tx.insert(sizeChartsTable).values({
//                   supplier: product.supplier,
//                   size: sizeObj.size,
//                   category: product.category,
//                   measurement: measurement.measurement_type,
//                   value_min: measurement.value_min,
//                   value_max: measurement.value_max
//                })
//                .onConflictDoUpdate({
//                   target: [sizeChartsTable.supplier, sizeChartsTable.size, sizeChartsTable.measurement, sizeChartsTable. category],
//                   set: {value_min: measurement.value_min, value_max: measurement.value_max}
//                });
//             }

//             await tx.insert(productVariantsTable).values({
//                variant_id: product.variant.variant_id,
//                product_id: product.product_id,
//                size: sizeObj.size,
//                name: product.name,
//                color: product.variant.color,
//                design: product.variant.design,
//                description: product.variant.description,
//                price: sizeObj.price,
//                stock_quantity: sizeObj.stock_quantity,
//                createdAt: new Date(),
//                updatedAt: new Date()
//             })
//             .onConflictDoNothing();
//          }
//       });

//       return {
//          isSuccess: true,
//          msg: "Product added successfully.",
//          error: ""
//       }
//    }
//    catch(e) {
//       return {
//          isSuccess: false,
//          msg: "Error inserting product to databse.",
//          error: e
//       };
//    }
// }


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
export async function getProductDetailsByVariantId(variant_id: string) {
   try {
     // Select specific columns from the productVariantsTable
     const variant = await db
       .select({
         name: productVariantsTable.name,
         color: productVariantsTable.color,
         price: productVariantsTable.price,
         description: productVariantsTable.description,
       })
       .from(productVariantsTable)
       .where(eq(productVariantsTable.variant_id, variant_id));
 
     // Return the result
     return {
       isSuccess: true,
       data: variant[0] || null, // Ensure to handle the case where no data is returned
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


 

export async function getProductIdByVariantDAO(variant_id: string) {
    try {
        const variant = await db.select({
            product_id: productVariantsTable.product_id
        })
        .from(productVariantsTable)
        .where(eq(productVariantsTable.variant_id, variant_id))
        .limit(1);

        if (variant.length > 0) {
            return {
                isSuccess: true,
                data: variant[0].product_id,
                msg: "Product ID fetched successfully",
                error: ""
            };
        } else {
            return {
                isSuccess: false,
                data: null,
                msg: "Product ID not found for the given variant ID",
                error: ""
            };
        }
    } catch (error) {
        console.log("Error fetching product ID by variant ID:", error);
        return {
            isSuccess: false,
            data: null,
            msg: "Couldn't fetch product ID",
            error: error
        };
    }
}
