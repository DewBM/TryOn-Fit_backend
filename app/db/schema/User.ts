import { integer, numeric, pgTable, serial } from "drizzle-orm/pg-core";
import { text } from 'drizzle-orm/pg-core';

export const users = pgTable('User', {
   userId: serial('userId'),
   username: text('username').primaryKey(),
   password: text('password').notNull(),
});