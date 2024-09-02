"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStockStatus = exports.getInvItemById = exports.updateStockCart = exports.updateStock = exports.insertNewInvItem = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const __1 = require("..");
const Inventory_1 = require("../schema/Inventory");
async function insertNewInvItem(item) {
    try {
        await __1.db.insert(Inventory_1.inventoriesTable).values(item);
        return {
            isSuccess: true,
            msg: "New inventory item added successfully",
            error: ""
        };
    }
    catch (e) {
        console.log(e);
        return {
            isSuccess: false,
            msg: "Error inserting inventory item to database.",
            error: e
        };
    }
    ;
}
exports.insertNewInvItem = insertNewInvItem;
async function updateStock(product_id, new_quantity, type) {
    try {
        switch (type) {
            case "stock": await __1.db.update(Inventory_1.inventoriesTable).set({ stock_quantity: new_quantity }).where((0, drizzle_orm_1.eq)(Inventory_1.inventoriesTable.product_id, product_id));
            case "incart": await __1.db.update(Inventory_1.inventoriesTable).set({ incart_quantity: new_quantity }).where((0, drizzle_orm_1.eq)(Inventory_1.inventoriesTable.product_id, product_id));
            case "processing": await __1.db.update(Inventory_1.inventoriesTable).set({ processing_quantity: new_quantity }).where((0, drizzle_orm_1.eq)(Inventory_1.inventoriesTable.product_id, product_id));
            case "total": await __1.db.update(Inventory_1.inventoriesTable).set({ total_sold: new_quantity }).where((0, drizzle_orm_1.eq)(Inventory_1.inventoriesTable.product_id, product_id));
        }
        return {
            isSuccess: true,
            msg: "Inventory item quantity updated successfully",
            error: ""
        };
    }
    catch (e) {
        console.log(e);
        return {
            isSuccess: false,
            msg: "Couldn't update inventory item quantity.",
            error: e
        };
    }
}
exports.updateStock = updateStock;
async function updateStockCart(product_id, new_quantity) {
    try {
        await __1.db.update(Inventory_1.inventoriesTable)
            .set({ incart_quantity: new_quantity })
            .where((0, drizzle_orm_1.eq)(Inventory_1.inventoriesTable.product_id, product_id));
        return {
            isSuccess: true,
            msg: "Inventory item cart quantity updated successfully",
            error: ""
        };
    }
    catch (e) {
        console.log(e);
        return {
            isSuccess: false,
            msg: "Couldn't update inventory item quantity.",
            error: e
        };
    }
}
exports.updateStockCart = updateStockCart;
async function getInvItemById(product_id) {
    try {
        let item = await __1.db.select()
            .from(Inventory_1.inventoriesTable)
            .where((0, drizzle_orm_1.eq)(Inventory_1.inventoriesTable.product_id, product_id));
        return item[0];
    }
    catch (e) {
        console.log(e);
        return null;
    }
}
exports.getInvItemById = getInvItemById;
/**
 *
 * @param product_id
 * @param status : -1 if Unavailable, 0 is Low Stock, 1 is Available
 * @returns
 */
async function updateStockStatus(product_id, status) {
    try {
        await __1.db.update(Inventory_1.inventoriesTable)
            .set({ status: status == -1 ? 'Unavailable' : status == 0 ? 'Low Stock' : 'Available' })
            .where((0, drizzle_orm_1.eq)(Inventory_1.inventoriesTable.product_id, product_id));
        return {
            isSuccess: true,
            msg: "Inventory status updated successfully.",
            error: ""
        };
    }
    catch (e) {
        console.log(e);
        return {
            isSuccess: false,
            msg: "Couldn't update inventory item status",
            error: e
        };
    }
}
exports.updateStockStatus = updateStockStatus;
