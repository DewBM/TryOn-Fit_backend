import { pgTable } from "drizzle-orm/pg-core";
import { text } from 'drizzle-orm/pg-core';

export const users = pgTable('User', {
   username: text('username').primaryKey(),
   password: text('password').notNull(),
});