"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertNewCart = exports.getCartByUserId = exports.insertNewCartItem = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const __1 = require("..");
const schema_1 = require("../schema");
const Cart_1 = require("../schema/Cart");
async function insertNewCartItem(cartItem) {
    try {
        await __1.db.insert(Cart_1.cartItemsTable).values(cartItem);
        return {
            isSuccess: true,
            msg: "Cart item inserted successfully",
            error: ""
        };
    }
    catch (e) {
        console.log(e);
        return {
            isSuccess: false,
            msg: "Couldn't insert cart item to database",
            error: e
        };
    }
}
exports.insertNewCartItem = insertNewCartItem;
async function getCartByUserId(user_id) {
    try {
        let cart = await __1.db.select()
            .from(schema_1.cartsTable)
            .where((0, drizzle_orm_1.eq)(schema_1.cartsTable.user_id, user_id));
        return {
            isSuccess: true,
            data: cart[0],
            msg: "",
            error: ""
        };
    }
    catch (e) {
        console.log(e);
        return {
            isSuccess: false,
            data: null,
            msg: "Couldn't get cart for user id",
            error: e
        };
    }
}
exports.getCartByUserId = getCartByUserId;
async function insertNewCart(user_id) {
    try {
        const cart = await __1.db.insert(schema_1.cartsTable).values({ user_id: user_id }).returning();
        return {
            isSuccess: true,
            data: cart[0],
            msg: "Cart inserted successfully",
            error: ""
        };
    }
    catch (e) {
        console.log(e);
        return {
            isSuccess: false,
            data: null,
            msg: "Couldn't insert cart to the database",
            error: e
        };
    }
}
exports.insertNewCart = insertNewCart;
