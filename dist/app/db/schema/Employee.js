"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeesTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.employeesTable = (0, pg_core_1.pgTable)('employee', {
    emp_id: (0, pg_core_1.serial)('emp_id').primaryKey(),
    first_name: (0, pg_core_1.text)('first_name'),
    last_name: (0, pg_core_1.text)('last_name'),
    email: (0, pg_core_1.text)('email').unique(),
    enrolled_date: (0, pg_core_1.text)('enrolled_date'),
    role: (0, pg_core_1.text)('role'),
    contact_number: (0, pg_core_1.text)('contact_number')
});
