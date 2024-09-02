"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.createOrder = exports.getOrdersByCustomer = exports.getItemsByOrderId = exports.getAllOrders = void 0;
const orderDAO_1 = require("../db/dao/orderDAO");
async function getAllOrders() {
    return await (0, orderDAO_1.queryOrders)();
}
exports.getAllOrders = getAllOrders;
async function getItemsByOrderId(order_id) {
    return await (0, orderDAO_1.queryItemsByOrderId)(order_id);
}
exports.getItemsByOrderId = getItemsByOrderId;
async function getOrdersByCustomer(customer_id) {
    return await (0, orderDAO_1.queryOrdersByCustomer)(customer_id);
}
exports.getOrdersByCustomer = getOrdersByCustomer;
async function createOrder(order) {
    return await (0, orderDAO_1.insertNewOrder)(order);
}
exports.createOrder = createOrder;
async function updateStatus(order_id, status) {
    return await (0, orderDAO_1.updateOrderStatus)(order_id, status);
}
exports.updateStatus = updateStatus;
