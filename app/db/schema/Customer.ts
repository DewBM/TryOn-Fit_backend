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
import { addressesTable } from "./Address";

export const customersTable = pgTable("Customer", {
  customer_id: serial("customer_id").primaryKey(),
  user_id: integer("user_id").references(() => users.userId),
  first_name: text("first_name"),
  last_name: text("last_name"),
  email: text("email"),
});

// export const addressesTable = pgTable("addresses", {
//   address_id: serial("address_id").primaryKey(),
//   customer_id: integer("customer_id").references(() => customersTable.customer_id),
//   address_line_1: text("address_line_1").notNull(),
//   address_line_2: text("address_line_2"),
//   postal_code: text("postal_code"),
// });

//add for measurement part 
export const bodyMeasurementsTable = pgTable("body_measurement", {
  measurement_id: serial("measurement_id").primaryKey(),
  customer_id: integer("customer_id").references(() => customersTable.customer_id),
  chest: integer("chest"),
  underbust: integer("underbust"),
  neck: integer("neck"),
  waist: integer("waist"),
  hip: integer("hip"),
  arm_length: integer("arm_length"),
  thigh_circumference: integer("thigh_circumference"),
  torso: integer("torso"),
  inseam: integer("inseam"),
  calf_circumference: integer("calf_circumference"),
  shoulder: integer("shoulder"),
  bicep: integer("bicep"),
});

export type SelectCustomer = typeof customersTable.$inferSelect;
// export type SelectAddress = typeof addressesTable.$inferSelect;
export type SelectBodyMeasurements = typeof bodyMeasurementsTable.$inferSelect;
