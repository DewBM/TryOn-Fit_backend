"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.customersTable = (0, pg_core_1.pgTable)('Customer', {
    customer_id: (0, pg_core_1.serial)('customer_id').primaryKey(),
    first_name: (0, pg_core_1.text)('first_name'),
    last_name: (0, pg_core_1.text)('last_name'),
    email: (0, pg_core_1.text)('email'),
    username: (0, pg_core_1.text)('username'),
    password: (0, pg_core_1.text)('password')
});
