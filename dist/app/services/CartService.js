"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = void 0;
const cartDAO_1 = require("../db/dao/cartDAO");
const InventoryService_1 = require("./InventoryService");
const ProductService_1 = require("./ProductService");
async function addToCart(user_id, variant_id, quantity) {
    let cart = await (0, cartDAO_1.getCartByUserId)(user_id);
    let cart_id = -1;
    if (cart.isSuccess && cart.data != undefined)
        cart_id = cart.data.cart_id;
    else {
        cart = await (0, cartDAO_1.insertNewCart)(user_id);
        if (cart.isSuccess && cart.data != undefined)
            cart_id = cart.data.cart_id;
        else
            return cart;
    }
    const cartResult = await (0, cartDAO_1.insertNewCartItem)({
        cart_id: cart_id,
        variant_id: variant_id,
        quantity: quantity
    });
    if (cartResult.isSuccess) {
        const variatRes = await (0, ProductService_1.getVariantById)(variant_id);
        if (variatRes.isSuccess && variatRes.data != undefined)
            return await (0, InventoryService_1.updateIncart)(variatRes.data.product_id, quantity);
        return variatRes;
    }
    else
        return cartResult;
}
exports.addToCart = addToCart;
