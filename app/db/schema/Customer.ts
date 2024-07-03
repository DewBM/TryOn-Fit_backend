import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar } from 'drizzle-orm/pg-core';


export const customers = pgTable('Customer', {
  customer_id: serial('customer_id').primaryKey(),
  first_name: varchar('first_name', { length: 25 }),
  last_name: varchar('last_name', {length: 25}),
  email: varchar('email', {length: 25}),
  username: varchar('username', {length: 25}),
  password: varchar('password', {length: 25})
});

export type SelectCustomer = typeof customers.$inferSelect;