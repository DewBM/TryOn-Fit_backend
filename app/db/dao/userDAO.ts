import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";
import { Customer ,Address } from '../../types/custom_types'; // Adjust the path as needed
import { customers } from "../schema/User";
import {addressesTable} from '../schema/Address'

export type User = typeof users.$inferInsert;
export type TypeUser = typeof users.$inferSelect;




// export async function insert(user: User): Promise<User[]> {
   // return await db.insert(users).values(user).onConflictDoNothing({target: users.username}).returning();
// }

export async function insertUser(user: User): Promise<number | null> {
   const result = await db.insert(users)
      .values(user)
      .onConflictDoNothing({ target: users.username })
      .returning({ userId: users.userId }); // Retrieve userId after insertion

   return result.length > 0 ? result[0].userId : null; // Return the generated userId or null if conflict occurs
}
////////////////////////////

export async function insertCustomer(customer: Omit<Customer, 'customerId'>): Promise<number> {
   const result = await db.insert(customers)
      .values(customer as any)
      .returning({ customerId: customers.customerId });  // Retrieve customerId after insertion

   return result.length > 0 ? result[0].customerId : 0;  // Return the generated customerId or 0 if insert fails
}


//////////////////////////////////////////

export async function getUserById(userId: number) {
   const [user] = await db.select().from(users).where(eq(users.userId, userId));
   return user;
}


export async function getUserByUsername(username: string) {
   const [user] = await db.select().from(users).where(eq(users.username, username));
   return user;
}