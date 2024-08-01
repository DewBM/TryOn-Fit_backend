import { numeric, pgEnum, pgTable, text, serial, timestamp, unique, integer, foreignKey, primaryKey, index } from "drizzle-orm/pg-core";
import { suppliersTable } from "./Supplier";
import { relations, sql } from "drizzle-orm";
import { tsvector } from "../db-utils";
import ExcelJS from "exceljs";

const ageGroupEnum = pgEnum('age_group', ['adult', 'kids']);
const genderEnum = pgEnum('gender', ['Male', 'Female', 'Unisex']);


export const sizesTable = pgTable('size_labels', {
   size_label: text('size_label').primaryKey(),
   size_name: text('size_name')
});


export const measurementTypesTable = pgTable('measurement_type', {
   measurement_type: text('measurement_type').primaryKey()
});


export const categoriesTable = pgTable('cloth_category', {
   category_type: text('category_type').primaryKey()
});


export const sizeChartsTable = pgTable('size_chart', {
   supplier: text('sup_id').references(()=> suppliersTable.supplier_id),
   size: text('size').references(()=> sizesTable.size_label),
   measurement: text('measurement').references(()=> measurementTypesTable.measurement_type),
   category: text('category').references(()=> categoriesTable.category_type),
   value_min: numeric('value_min'),
   value_max: numeric('value_max')
}, (table) => ({
   pk: primaryKey({columns: [table.supplier, table.size, table.measurement, table.category]})
}));


export const productsTable = pgTable('product', {
   product_id: text('product_id').primaryKey(),
   supplier: text('supplier').references(()=> suppliersTable.supplier_id),
   category: text('category').references(()=> categoriesTable.category_type),
   gender: genderEnum('gender'),
   age_group: ageGroupEnum('age_group'),
   createdAt: timestamp('createdAt'),
   updatedAt: timestamp('updatedAt')
});


export const productVariantsTable = pgTable('product_variants', {
   variant_id: text('variant_id').primaryKey(),
   product_id: text('product_id').references(()=> productsTable.product_id).notNull(),
   name: text('name'),
   size: text('size').references(()=> sizesTable.size_label),
   color: text('color'),
   design: text('design'),
   price: numeric('price'),
   stock_quantity: integer('stock_quantity'),
   description: text('description'),
   createdAt: timestamp('createdAt'),
   updatedAt: timestamp('updatedAt'),
   searchable_text: tsvector("searchable_text", {
      sources: ['name', 'design', 'description'], // list of column names
      weighted: true
   }),
},(table) => ({
   titleSearchIndex: index('textsearch_idx')
   .using('gin', sql`(${table.searchable_text})`),
 })
);



export type Product = {
   product_id: string,
   name: string,
   supplier: string,
   category: string,
   gender: "Male" | "Female" | "Unisex",
   ageGroup: "adult" | "kids",
   price: number,
   variants: {
      variant_id: string,
      product_id: string,
      color: string,
      design: string,
      stock_quantity: number,
      description: string,
      createdAt: DataView,
      updatedAt: DataView,
      sizes: {
         size: string,
         stock_quantity: number,
      }[],
      img_front: ExcelJS.Buffer | string,
      img_rear: ExcelJS.Buffer | string | null
   }[],
};



/*
export type Product = {
   product_id: string,
   name: string,
   supplier: string,
   category: string,
   gender: "Male" | "Female" | "Unisex",
   ageGroup: "adult" | "kids",
   variant: {
      variant_id: string,
      product_id: string,
      size: string,
      color: string,
      design: string,
      price: number,
      stock_quantity: number,
      description: string,
      createdAt: DataView,
      updatedAt: DataView,
      sizes: [{
         size: string,
         price: string,
         stock_quantity: number,
         measurements: [{
            measurement_type: string,
            value_min: string,
            value_max: string
         }]
      }]
   },
};
*/