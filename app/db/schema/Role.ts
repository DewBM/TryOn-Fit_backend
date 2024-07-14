import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { users } from "./User";

export const roles = pgTable('Role', {
   role: text('role').primaryKey()
});

export const roleRelations = relations(roles, ({ many }) => ({
   users: many(users)
}));