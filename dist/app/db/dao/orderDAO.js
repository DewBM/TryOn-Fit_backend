"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.insertNewOrder = exports.queryOrdersByCustomer = exports.queryItemsByOrderId = exports.queryOrders = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const __1 = require("..");
const schema_1 = require("../schema");
async function queryOrders() {
    try {
        const orders = await __1.db.select().from(schema_1.ordersTable);
        return {
            isSuccess: true,
            data: orders,
            msg: "",
            error: ""
        };
    }
    catch (e) {
        console.log(e);
        return {
            isSuccess: false,
            data: null,
            msg: "Couldn't get orders from database.",
            error: e
        };
    }
}
exports.queryOrders = queryOrders;
async function queryItemsByOrderId(order_id) {
    try {
        const order_items = await __1.db.select().from(schema_1.orderItemsTable).where((0, drizzle_orm_1.eq)(schema_1.orderItemsTable.order_id, order_id));
        return {
            isSuccess: true,
            data: order_items,
            msg: "",
            error: ""
        };
    }
    catch (e) {
        console.log(e);
        return {
            isSuccess: false,
            data: null,
            msg: "Couldn't get order items by order_id form database.",
            error: e
        };
    }
}
exports.queryItemsByOrderId = queryItemsByOrderId;
async function queryOrdersByCustomer(customer_id) {
    try {
        const order_items = await __1.db.select().from(schema_1.ordersTable).where((0, drizzle_orm_1.eq)(schema_1.ordersTable.customer_id, customer_id));
        return {
            isSuccess: true,
            data: order_items,
            msg: "",
            error: ""
        };
    }
    catch (e) {
        console.log(e);
        return {
            isSuccess: false,
            data: null,
            msg: "Couldn't get orders by customer_id form database.",
            error: e
        };
    }
}
exports.queryOrdersByCustomer = queryOrdersByCustomer;
async function insertNewOrder(order) {
    try {
        __1.db.transaction(async (tx) => {
            await tx.insert(schema_1.ordersTable).values(order).onConflictDoNothing();
            await tx.insert(schema_1.orderItemsTable).values(order.order_items);
        });
        return {
            isSuccess: true,
            msg: "Order Inserted to database successfully!",
            error: ""
        };
    }
    catch (e) {
        console.log(e);
        return {
            isSuccess: false,
            msg: "Couldn't insert order to database.",
            error: e
        };
    }
}
exports.insertNewOrder = insertNewOrder;
async function updateOrderStatus(order_id, status) {
    try {
        if (status === 'Delivered')
            await __1.db.update(schema_1.ordersTable).set({ order_status: status, delivery_date: new Date() }).where((0, drizzle_orm_1.eq)(schema_1.ordersTable.order_id, order_id));
        else
            await __1.db.update(schema_1.ordersTable).set({ order_status: status }).where((0, drizzle_orm_1.eq)(schema_1.ordersTable.order_id, order_id));
        return {
            isSuccess: true,
            msg: "Order status updated successfully.",
            error: ""
        };
    }
    catch (e) {
        console.log(e);
        return {
            isSuccess: false,
            msg: "Couldn't update order status.",
            error: e
        };
    }
}
exports.updateOrderStatus = updateOrderStatus;
