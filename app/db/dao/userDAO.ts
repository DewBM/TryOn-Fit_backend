import { db } from "..";
import { users } from "../schema";

export type User = typeof users.$inferInsert;

export async function insert(user: User) {
   await db.insert(users).values(user);
}