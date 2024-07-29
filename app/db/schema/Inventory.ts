import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { productsTable } from "./Product";
import { suppliersTable } from "./Supplier";

const statusEnum = pgEnum('inventory_status', ['Available', 'Unavailable', 'Low Stock'])

export const inventoriesTable = pgTable('inventory', {
   product_id: text('product_id').primaryKey().references(()=> productsTable.product_id),
   supplier_id: text('supplier_id').references(()=> suppliersTable.supplier_id),
   stock_quantity: integer('stock_quantity').notNull().default(0),
   incart_quantity: integer('incart_quantity').notNull().default(0),
   processing_quantity: integer('processing_quantity').notNull().default(0),
   stock_threshold: integer('stock_threshold').notNull().default(10),
   total_sold: integer('total_sold').notNull().default(0),
   status: statusEnum('status')
});

export type InventoryInsert = typeof inventoriesTable.$inferInsert;