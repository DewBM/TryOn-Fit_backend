import { numeric, pgEnum, pgTable, text, serial, timestamp, unique, integer, foreignKey, primaryKey } from "drizzle-orm/pg-core";
import { suppliersTable } from "./Supplier";

const ageGroupEnum = pgEnum('age_group', ['adult', 'kids']);
const genderEnum = pgEnum('gender', ['Male', 'Female']);


export const sizesTable = pgTable('size_labels', {
   size_label: text('size_label').primaryKey()
});


export const measurementTypesTable = pgTable('measurement_type', {
   measurement_type: text('measurement_type').primaryKey()
});


export const categoriesTable = pgTable('cloth_category', {
   category_type: text('category_type').primaryKey()
});


// export const categoryMeasurementsTable = pgTable('category_measurements', {
//    category: text('category').references(()=> categoriesTable.category_type),
//    measurement_type: text('measurement_type').references(()=> measurementTypesTable.measurement_type)
// }, (table) => {
//    return {
//       pk: primaryKey({columns: [table.category, table.measurement_type]})
//    }
// });

export const sizeChartsTable = pgTable('size_chart', {
   // chart_id: serial('chart_id').primaryKey(),
   sup_id: integer('sup_id').references(()=> suppliersTable.supplier_id),
   size: text('size').references(()=> sizesTable.size_label),
   measurement: text('measurement').references(()=> measurementTypesTable.measurement_type),
   category: text('category').references(()=> categoriesTable.category_type),
   value_min: numeric('value_min'),
   value_max: numeric('value_max')
}, (table) => ({
   pk: primaryKey({columns: [table.sup_id, table.size, table.measurement, table.category]})
}));


export const productsTable = pgTable('product', {
   product_id: text('product_id').primaryKey(),
   name: text('name'),
   description: text('description'),
   supplier: integer('supplier').references(()=> suppliersTable.supplier_id),
   category: text('category').references(()=> categoriesTable.category_type),
   gender: genderEnum('gender'),
   age_group: ageGroupEnum('age_group'),
   createdAt: timestamp('createdAt'),
   updatedAt: timestamp('updatedAt')
});

export type selectProduct  = typeof productsTable.$inferSelect;
export const productVariantsTable = pgTable('product_variants', {
   variant_id: text('variant_id').primaryKey(),
   product_id: text('product_id').references(()=> productsTable.product_id),
   size: text('size').references(()=> sizesTable.size_label),
   color: text('color'),
   design: text('design'),
   price: text('price'),
   stock_quantity: text('stock_quantity'),
   description: text('description'),
   createdAt: timestamp('createdAt'),
   updatedAt: timestamp('updatedAt')
});