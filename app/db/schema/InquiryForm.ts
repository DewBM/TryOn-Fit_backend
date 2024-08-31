import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const inquiry_reportTable = pgTable('InquiryReport', {
  orderId: text('order_id').primaryKey().notNull(),
  issueType: text('issue_type').notNull(),
  image: text('image'),
  issueDescription: text('issue_description').notNull(),
  additionalComments: text('additional_comments'),
});

export type SelectInquiryReport = typeof inquiry_reportTable.$inferSelect;


