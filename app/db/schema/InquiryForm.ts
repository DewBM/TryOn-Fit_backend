import { pgTable, serial, text ,integer, numeric} from "drizzle-orm/pg-core";
import { ordersTable } from "./Order";
import { productsTable } from "./Product";

export const inquiry_reportTable = pgTable('InquiryReport', {

  inquiry_id: serial('inquiry_id').primaryKey(),
  order_id: integer('order_id').references(()=> ordersTable.order_id),
  product_id: text('product_id').references(()=>productsTable.product_id),
  issue_type: text('issue_type').notNull(),
  image: text('image'),
  issue_description: text('issue_description').notNull(),
  additional_comments: text('additional_comments'),
  solution : text('solution'),
 


});

export type SelectInquiryReport = typeof inquiry_reportTable.$inferSelect;
export type InsertInquiryReport = typeof inquiry_reportTable.$inferInsert;


