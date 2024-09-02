"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUsername = exports.getUserById = exports.insert = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const __1 = require("..");
const schema_1 = require("../schema");
async function insert(user) {
    return await __1.db.insert(schema_1.users).values(user).onConflictDoNothing({ target: schema_1.users.username }).returning();
}
exports.insert = insert;
async function getUserById(userId) {
    const [user] = await __1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.userId, userId));
    return user;
}
exports.getUserById = getUserById;
async function getUserByUsername(username) {
    const [user] = await __1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.username, username));
    return user;
}
exports.getUserByUsername = getUserByUsername;
