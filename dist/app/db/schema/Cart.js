"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItemsTable = exports.cartsTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const User_1 = require("./User");
const Product_1 = require("./Product");
exports.cartsTable = (0, pg_core_1.pgTable)('cart', {
    cart_id: (0, pg_core_1.serial)('card_id').primaryKey(),
    user_id: (0, pg_core_1.integer)('user)id').references(() => User_1.users.userId).notNull(),
});
exports.cartItemsTable = (0, pg_core_1.pgTable)('cart_item', {
    cart_item_id: (0, pg_core_1.serial)('cart_item_id').primaryKey(),
    cart_id: (0, pg_core_1.integer)('cart_id').references(() => exports.cartsTable.cart_id).notNull(),
    variant_id: (0, pg_core_1.text)('variant_id').references(() => Product_1.productVariantsTable.variant_id).notNull(),
    quantity: (0, pg_core_1.integer)('quantity').default(0).notNull()
});
