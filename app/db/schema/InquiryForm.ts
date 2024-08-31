import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const inquiry_reportTable = pgTable('InquiryReport', {
  //orderId: text('order_id').primaryKey().notNull(),
  order_id: serial('order_id').primaryKey(),
  issue_type: text('issue_type').notNull(),
  image: text('image'),
  issue_description: text('issue_description').notNull(),
  additional_comments: text('additional_comments'),
});

export type SelectInquiryReport = typeof inquiry_reportTable.$inferSelect;


