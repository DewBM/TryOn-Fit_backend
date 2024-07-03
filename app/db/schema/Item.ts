import { numeric, pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";

const ageGroupEnum = pgEnum('age_group', ['adult', 'kids']);
const genderEnum = pgEnum('gender', ['Male', 'Female']);

export const items = pgTable('Item', {
   item_id: text('item_id').primaryKey(),
   name: text('name'),
   price: numeric('price'),
   age_group: ageGroupEnum('age_group'),
   gender: genderEnum('gender'),
});