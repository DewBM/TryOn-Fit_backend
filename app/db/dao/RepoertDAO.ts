import { and, between, desc, eq, sql } from "drizzle-orm"; // Import required helpers from Drizzle ORM
import { db } from ".."; // Import your database instance
import { orderItemsTable, ordersTable, productsTable, suppliersTable } from "../schema"; // Import table schemas

export async function getAllSupplier() {
  const startDate = new Date("2024-01-01"); // Start date for filtering
  const endDate = new Date("2024-12-31"); // End date for filtering

  try {
    console.log("3")
    return db.query.suppliersTable.findMany();
      
    } catch (error) {
    console.error("Error fetching revenue by supplier:", error); // Log the error for debugging
    throw error; // Rethrow the error to the caller
  }
}
