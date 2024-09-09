import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./User";
import { customersTable } from "./Customer";
import { suppliersTable } from "./Supplier";
import { employeesTable } from "./Employee";

export const addressesTable = pgTable("addresses", {
  address_id: serial("address_id").primaryKey(),
  customer_id: integer("customer_id").references(
    () => customersTable.customer_id
  ),
  supplier_id: text("supplier_id").references(() => suppliersTable.supplier_id),
  emp_id: integer("emp_id").references(() => employeesTable.emp_id),
  address_line_1: text("address_line_1").notNull(),
  address_line_2: text("address_line_2"),
  city: text("city").notNull(),
  district: text("district").notNull(),
  postal_code: text("postal_code").notNull(),
});

export type SelectAddress = typeof addressesTable.$inferSelect;
