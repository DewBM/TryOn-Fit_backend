import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const inquiry_reportTable = pgTable('InquiryReport', {
  //orderId: text('order_id').primaryKey().notNull(),
  order_id: text('order_id').primaryKey(),
  product_id: text('product_id'),
  customer_id: text('customer_id'),
  customer_name : text('customer_name'),
  customer_tele : text('customer_tele'),
  issue_type: text('issue_type').notNull(),
  image: text('image'),
  issue_description: text('issue_description').notNull(),
  additional_comments: text('additional_comments'),
  solution : text('solution'),
 


});

export type SelectInquiryReport = typeof inquiry_reportTable.$inferSelect;


