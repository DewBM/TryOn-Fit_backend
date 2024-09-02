"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inquiry_reportTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const Order_1 = require("./Order");
const Product_1 = require("./Product");
exports.inquiry_reportTable = (0, pg_core_1.pgTable)('InquiryReport', {
    inquiry_id: (0, pg_core_1.serial)('inquiry_id').primaryKey(),
    order_id: (0, pg_core_1.integer)('order_id').references(() => Order_1.ordersTable.order_id),
    product_id: (0, pg_core_1.integer)('product_id').references(() => Product_1.productsTable.product_id),
    issue_type: (0, pg_core_1.text)('issue_type').notNull(),
    image: (0, pg_core_1.text)('image'),
    issue_description: (0, pg_core_1.text)('issue_description').notNull(),
    additional_comments: (0, pg_core_1.text)('additional_comments'),
    solution: (0, pg_core_1.text)('solution'),
});
