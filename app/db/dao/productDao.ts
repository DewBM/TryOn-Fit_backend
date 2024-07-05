import { db } from "..";

// data access layer logic
export async function getAllProducts() {
   return db.query.product.findMany();
}