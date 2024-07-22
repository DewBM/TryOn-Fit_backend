import { date, integer, pgEnum, pgTable, serial, text, uniqueIndex, varchar  } from "drizzle-orm/pg-core";

export const employeesTable = pgTable('employee',{
  emp_id: serial('emp_id').primaryKey(),
  first_name: text('first_name'),
  last_name: text('last_name'),
  email: text('email').unique(),
  enrolled_date: text('enrolled_date'),
  role: text('role'),
  contact_number: text('contact_number')

});

export type selectEmployee = typeof employeesTable.$inferSelect;