"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sizeStocksTable = exports.productVariantsTable = exports.productsTable = exports.sizeChartsTable = exports.categoriesTable = exports.measurementTypesTable = exports.sizesTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const Supplier_1 = require("./Supplier");
const drizzle_orm_1 = require("drizzle-orm");
const db_utils_1 = require("../db-utils");
const ageGroupEnum = (0, pg_core_1.pgEnum)('age_group', ['adult', 'kids']);
const genderEnum = (0, pg_core_1.pgEnum)('gender', ['Male', 'Female', 'Unisex']);
exports.sizesTable = (0, pg_core_1.pgTable)('size_labels', {
    size_label: (0, pg_core_1.text)('size_label').primaryKey(),
    size_name: (0, pg_core_1.text)('size_name')
});
exports.measurementTypesTable = (0, pg_core_1.pgTable)('measurement_type', {
    measurement_type: (0, pg_core_1.text)('measurement_type').primaryKey()
});
exports.categoriesTable = (0, pg_core_1.pgTable)('cloth_category', {
    category_type: (0, pg_core_1.text)('category_type').primaryKey()
});
exports.sizeChartsTable = (0, pg_core_1.pgTable)('size_chart', {
    supplier: (0, pg_core_1.text)('sup_id').references(() => Supplier_1.suppliersTable.supplier_id),
    size: (0, pg_core_1.text)('size').references(() => exports.sizesTable.size_label),
    measurement: (0, pg_core_1.text)('measurement').references(() => exports.measurementTypesTable.measurement_type),
    category: (0, pg_core_1.text)('category').references(() => exports.categoriesTable.category_type),
    value_min: (0, pg_core_1.numeric)('value_min'),
    value_max: (0, pg_core_1.numeric)('value_max')
}, (table) => ({
    pk: (0, pg_core_1.primaryKey)({ columns: [table.supplier, table.size, table.measurement, table.category] })
}));
exports.productsTable = (0, pg_core_1.pgTable)('product', {
    product_id: (0, pg_core_1.text)('product_id').primaryKey(),
    supplier: (0, pg_core_1.text)('supplier').references(() => Supplier_1.suppliersTable.supplier_id),
    category: (0, pg_core_1.text)('category').references(() => exports.categoriesTable.category_type),
    gender: genderEnum('gender'),
    age_group: ageGroupEnum('age_group'),
    createdAt: (0, pg_core_1.timestamp)('createdAt'),
    updatedAt: (0, pg_core_1.timestamp)('updatedAt')
});
exports.productVariantsTable = (0, pg_core_1.pgTable)('product_variants', {
    variant_id: (0, pg_core_1.text)('variant_id').primaryKey(),
    product_id: (0, pg_core_1.text)('product_id').references(() => exports.productsTable.product_id).notNull(),
    name: (0, pg_core_1.text)('name'),
    // size: text('size').references(()=> sizesTable.size_label),
    color: (0, pg_core_1.text)('color'),
    design: (0, pg_core_1.text)('design'),
    price: (0, pg_core_1.numeric)('price'),
    // stock_quantity: integer('stock_quantity'),
    description: (0, pg_core_1.text)('description'),
    createdAt: (0, pg_core_1.timestamp)('createdAt'),
    updatedAt: (0, pg_core_1.timestamp)('updatedAt'),
    searchable_text: (0, db_utils_1.tsvector)("searchable_text", {
        sources: ['name', 'design', 'description'],
        weighted: true
    }),
}, (table) => ({
    titleSearchIndex: (0, pg_core_1.index)('textsearch_idx')
        .using('gin', (0, drizzle_orm_1.sql) `(${table.searchable_text})`),
}));
exports.sizeStocksTable = (0, pg_core_1.pgTable)('size_stocks', {
    variant_id: (0, pg_core_1.text)('variant_id').references(() => exports.productVariantsTable.variant_id),
    size: (0, pg_core_1.text)('size').references(() => exports.sizesTable.size_label),
    quantity: (0, pg_core_1.integer)('quantity')
}, (table) => ({
    pk: (0, pg_core_1.primaryKey)({ columns: [table.variant_id, table.size] })
}));
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
