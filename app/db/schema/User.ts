import { relations } from "drizzle-orm";
import { integer, numeric, pgTable, serial } from "drizzle-orm/pg-core";
import { text } from 'drizzle-orm/pg-core';
import { roles } from "./Role";

export const users = pgTable('User', {
   userId: serial('userId').unique(),
   username: text('username').primaryKey(),
   password: text('password').notNull(),
   role: text('role').references(() => roles.role)
});

export const userRelations = relations(users, ({ one }) => ({
   role: one(roles, {
      fields: [users.role],
      references: [roles.role]
   })
}));

