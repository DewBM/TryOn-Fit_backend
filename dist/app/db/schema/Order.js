"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderItemsTable = exports.ordersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const Customer_1 = require("./Customer");
const Product_1 = require("./Product");
const orderStatusEnum = (0, pg_core_1.pgEnum)('order_status', ['Confirmed', 'Processing', 'Shipped', 'Delivered']);
exports.ordersTable = (0, pg_core_1.pgTable)('order', {
    order_id: (0, pg_core_1.serial)('order_id').primaryKey(),
    customer_id: (0, pg_core_1.integer)('customer_id').references(() => Customer_1.customersTable.customer_id),
    order_status: orderStatusEnum('order_status'),
    order_date: (0, pg_core_1.timestamp)('order_date'),
    delivery_date: (0, pg_core_1.timestamp)('delivery_date'),
    delivery_address: (0, pg_core_1.text)('delivery_address'),
    sub_total: (0, pg_core_1.numeric)('sub_total'),
    discount: (0, pg_core_1.numeric)('discount'),
});
exports.orderItemsTable = (0, pg_core_1.pgTable)('order_item', {
    order_id: (0, pg_core_1.integer)('order_id').references(() => exports.ordersTable.order_id),
    item_id: (0, pg_core_1.text)('item_id').references(() => Product_1.productVariantsTable.variant_id),
    quantity: (0, pg_core_1.integer)('quantity'),
    price: (0, pg_core_1.numeric)('price'),
    disount: (0, pg_core_1.numeric)('discount'),
}, (table) => ({
    pk: (0, pg_core_1.primaryKey)({ columns: [table.order_id, table.item_id] })
}));
