import { numeric, pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { db } from "..";

const ageGroupEnum = pgEnum('age_group', ['adult', 'kids']);
const genderEnum = pgEnum('gender', ['Male', 'Female']);

export const product = pgTable('Product', {
   product_id: text('product_id').primaryKey(),
   name: text('name'),
   price: numeric('price'),
   age_group: ageGroupEnum('age_group'),
   gender: genderEnum('gender'),
});