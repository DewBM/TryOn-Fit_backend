import { pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";
const supplierStatus = pgEnum('supplier_status',['available','unavailable']);
export const suppliersTable = pgTable('supplier', {
   supplier_id: text('supplier_id').primaryKey(),
   first_name: text('first_name'),
   last_name: text('last_name'),
   brand_name: text('brand_name'),
   contact_no: text('contact_no'),
   address: text('address'),
   email: text('email'),
   register_date: text('register_date'),
   status: supplierStatus('supplier_status') 
});
export type SelectSupllier = typeof suppliersTable.$inferSelect;