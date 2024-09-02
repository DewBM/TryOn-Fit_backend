"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRelations = exports.users = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
const Role_1 = require("./Role");
exports.users = (0, pg_core_1.pgTable)('User', {
    userId: (0, pg_core_1.serial)('userId').unique(),
    username: (0, pg_core_2.text)('username').primaryKey(),
    password: (0, pg_core_2.text)('password').notNull(),
    role: (0, pg_core_2.text)('role').references(() => Role_1.roles.role)
});
exports.userRelations = (0, drizzle_orm_1.relations)(exports.users, ({ one }) => ({
    role: one(Role_1.roles, {
        fields: [exports.users.role],
        references: [Role_1.roles.role]
    })
}));
