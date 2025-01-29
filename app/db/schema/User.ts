import { relations } from "drizzle-orm";
import { integer, numeric, pgTable, serial, bigint, text ,pgEnum} from "drizzle-orm/pg-core";
import { roles } from "./Role";
import { GenderType } from "../../types/custom_types";

const genderEnum = pgEnum('gender', ['Male', 'Female', 'Unisex']);

export const users = pgTable('User', {
   userId: serial('userId').unique(),
   username: text('username').primaryKey(),
   password: text('password').notNull(),
   role: text('role').references(() => roles.role)
});


export const customers = pgTable('Customer', {
   customerId: bigint('customer_id', { mode: 'number' }).primaryKey(),
   userId: integer('user_id').references(() => users.userId),
   firstName: text('first_name'),
   lastName: text('last_name'),
   email: text('email'),
   phone: text('phone'),  // Allow phone to be nullable
   gender: genderEnum('gender'),  // Gender for which the product is designed
});

export const userRelations = relations(users, ({ one }) => ({
   role: one(roles, {
      fields: [users.role],
      references: [roles.role]
   })
}));
