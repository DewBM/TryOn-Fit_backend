"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIncart = exports.createStock = exports.reStock = void 0;
const inventoryDAO_1 = require("../db/dao/inventoryDAO");
async function reStock(product_id, update_amount) {
    const item = await (0, inventoryDAO_1.getInvItemById)(product_id);
    if (item) {
        const new_quantity = item.stock_quantity + update_amount;
        return await (0, inventoryDAO_1.updateStock)(product_id, new_quantity, "stock");
    }
    else {
        return {
            isSuccess: false,
            msg: "",
            error: "Inventory item is null."
        };
    }
}
exports.reStock = reStock;
async function createStock(item) {
    return await (0, inventoryDAO_1.insertNewInvItem)(item);
}
exports.createStock = createStock;
async function updateIncart(product_id, used_amount) {
    const item = await (0, inventoryDAO_1.getInvItemById)(product_id);
    if (item) {
        const new_cart_quantity = item.incart_quantity + used_amount;
        return await (0, inventoryDAO_1.updateStock)(product_id, new_cart_quantity, "incart");
    }
    else {
        return {
            isSuccess: false,
            msg: "",
            error: "Inventory item null."
        };
    }
}
exports.updateIncart = updateIncart;
