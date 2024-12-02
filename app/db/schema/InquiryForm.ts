import { pgTable, serial, text ,integer, numeric} from "drizzle-orm/pg-core";
import { ordersTable } from "./Order";
import { productsTable } from "./Product";
import { customersTable} from "./Customer";

export const inquiry_reportTable = pgTable('InquiryReport', {

  inquiry_id: serial('inquiry_id').primaryKey(),
  order_id: integer('order_id').references(()=> ordersTable.order_id).notNull(),
  product_id: text('product_id').references(()=>productsTable.product_id).notNull(),
  customer_id: integer('customer_id').references(()=>customersTable.customer_id).notNull(),
  issue_type: text('issue_type').notNull(),
  image: text('image'),
  issue_description: text('issue_description').notNull(),
  additional_comments: text('additional_comments'),
  solution : text('solution'),
  name : text('name'),
  contact_num: text('contact_num').notNull(),
  status: text('status').notNull().default('pending'),

 


});

export type SelectInquiryReport = typeof inquiry_reportTable.$inferSelect;
export type InsertInquiryReport = typeof inquiry_reportTable.$inferInsert;


