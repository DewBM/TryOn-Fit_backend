import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const suppliersTable = pgTable('supplier', {
   supplier_id: serial('supplier_id').primaryKey(),
   first_name: text('first_name'),
   last_name: text('last_name'),
   brand_name: text('brand_name'),
   contact_no: text('contact_no'),
   address: text('address')
});