import { eq } from "drizzle-orm";
import { db } from "..";
import { categoriesTable, measurementTypesTable, Product, productsTable, productVariantsTable, sizeChartsTable, sizesTable } from "../schema/Product";

export async function getAllProducts() {
   return db.query.productsTable.findMany();
}



export async function insertProduct(product :Product) {
   try {
      await db.transaction(async (tx) => {
         await tx.insert(categoriesTable).values({category_type: product.category}).onConflictDoNothing();

         await tx.insert(productsTable).values({
            product_id: product.product_id,
            name: product.name,
            supplier: product.supplier,
            category: product.category,
            gender: product.gender,
            age_group: product.ageGroup,
            createdAt: new Date(),
            updatedAt: new Date()
         })
         .onConflictDoNothing();

         const sizes = product.variant.sizes;
         for (const sizeObj of sizes){
            for (const measurement of sizeObj.measurements){
               await tx.insert(measurementTypesTable).values({
                  measurement_type: measurement.measurement_type
               })
               .onConflictDoNothing();

               await tx.insert(sizeChartsTable).values({
                  sup_id: product.supplier,
                  size: sizeObj.size,
                  category: product.category,
                  measurement: measurement.measurement_type,
                  value_min: measurement.value_min,
                  value_max: measurement.value_max
               })
               .onConflictDoUpdate({
                  target: [sizeChartsTable.sup_id, sizeChartsTable.size, sizeChartsTable.measurement, sizeChartsTable. category],
                  set: {value_min: measurement.value_min, value_max: measurement.value_max}
               });
            }

            await tx.insert(productVariantsTable).values({
               variant_id: product.variant.variant_id,
               product_id: product.product_id,
               size: sizeObj.size,
               color: product.variant.color,
               design: product.variant.design,
               description: product.variant.description,
               price: sizeObj.price,
               stock_quantity: sizeObj.stock_quantity,
               createdAt: new Date(),
               updatedAt: new Date()
            })
            .onConflictDoNothing();
         }
      });
   }
   catch(e) {
      return {
         isSuccess: false,
         msg: "Error inserting product to databse.",
         error: e
      };
   }
}