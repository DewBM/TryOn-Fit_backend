"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoriesTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const Product_1 = require("./Product");
const Supplier_1 = require("./Supplier");
const statusEnum = (0, pg_core_1.pgEnum)('inventory_status', ['Available', 'Unavailable', 'Low Stock']);
exports.inventoriesTable = (0, pg_core_1.pgTable)('inventory', {
    product_id: (0, pg_core_1.text)('product_id').primaryKey().references(() => Product_1.productsTable.product_id),
    supplier_id: (0, pg_core_1.text)('supplier_id').references(() => Supplier_1.suppliersTable.supplier_id),
    stock_quantity: (0, pg_core_1.integer)('stock_quantity').notNull().default(0),
    incart_quantity: (0, pg_core_1.integer)('incart_quantity').notNull().default(0),
    processing_quantity: (0, pg_core_1.integer)('processing_quantity').notNull().default(0),
    stock_threshold: (0, pg_core_1.integer)('stock_threshold').notNull().default(10),
    total_sold: (0, pg_core_1.integer)('total_sold').notNull().default(0),
    status: statusEnum('status')
});
