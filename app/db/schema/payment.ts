import { pgTable, serial, integer, numeric, varchar, timestamp } from "drizzle-orm/pg-core";

export const paymentsTable = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  amount: numeric("amount").notNull(),
  status: varchar("status", { length: 20 }).default("PENDING").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
