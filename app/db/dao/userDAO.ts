import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";

export type User = typeof users.$inferInsert;
export type TypeUser = typeof users.$inferSelect;

export async function insert(user: User): Promise<User[]> {
   return await db.insert(users).values(user).onConflictDoNothing({target: users.username}).returning();
}


export async function getUserById(userId: number) {
   const [user] = await db.select().from(users).where(eq(users.userId, userId));
   return user;
}


export async function getUserByUsername(username: string) {
   const [user] = await db.select().from(users).where(eq(users.username, username));
   return user;
}