import { date, integer, pgEnum, pgTable, serial, text, uniqueIndex, varchar  } from "drizzle-orm/pg-core";

export const employee = pgTable('Employee',{
  Emp_Id: serial('Emp_Id').primaryKey(),
  First_Name: text('first_Name'),
  Last_Name: text('last_Name'),
  Email: text('email'),
  Enrolled_Date: text('enrolled_Date'),
  Role: text('role'),
  Phone_Number: text('phone_Number')

});

export type selectEmployee = typeof employee.$inferSelect;