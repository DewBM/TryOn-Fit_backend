"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suppliersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.suppliersTable = (0, pg_core_1.pgTable)('supplier', {
    supplier_id: (0, pg_core_1.text)('supplier_id').primaryKey(),
    first_name: (0, pg_core_1.text)('first_name'),
    last_name: (0, pg_core_1.text)('last_name'),
    brand_name: (0, pg_core_1.text)('brand_name'),
    contact_no: (0, pg_core_1.text)('contact_no'),
    address: (0, pg_core_1.text)('address')
});
