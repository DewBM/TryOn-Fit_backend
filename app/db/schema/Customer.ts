import { integer, pgEnum, pgTable, serial, text, uniqueIndex, varchar } from 'drizzle-orm/pg-core';


export const customersTable = pgTable('Customer', {
  customer_id: serial('customer_id').primaryKey(),
  first_name: text('first_name'),
  last_name: text('last_name'),
  email: text('email'),
  username: text('username'),
  password: text('password')
});

export type SelectCustomer = typeof customersTable.$inferSelect;