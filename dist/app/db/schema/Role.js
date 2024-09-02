"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleRelations = exports.roles = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const User_1 = require("./User");
exports.roles = (0, pg_core_1.pgTable)('Role', {
    role: (0, pg_core_1.text)('role').primaryKey()
});
exports.roleRelations = (0, drizzle_orm_1.relations)(exports.roles, ({ many }) => ({
    users: many(User_1.users)
}));
