import { and, between, desc, eq, sql } from "drizzle-orm"; // Import required helpers from Drizzle ORM
import { db } from ".."; // Import your database instance
import { orderItemsTable, ordersTable, productsTable, suppliersTable } from "../schema"; // Import table schemas
import { productVariantsTable } from "../schema/Product";

export async function getAllSupplier() {
  const startDate = new Date("2024-01-01"); // Start date for filtering
  const endDate = new Date("2024-12-31"); // End date for filtering

  try {
    console.log("3")
    const revenueBySupplier = await db
      .select({
        supplier: productsTable.supplier,
        totalRevenue: sql<number>`SUM((${orderItemsTable.price} - COALESCE(${orderItemsTable.disount}, 0)) * ${orderItemsTable.quantity})`,
        
      })
      .from(ordersTable) // Start with orderItemsTable
      .innerJoin(orderItemsTable, eq(ordersTable.order_id, orderItemsTable.order_id)) // Join orders table
      .innerJoin(productVariantsTable, eq(orderItemsTable.item_id, productVariantsTable.variant_id)) // Join products table
      .innerJoin(productsTable,eq(productVariantsTable.product_id,productsTable.product_id))
      .where(
        and(
          eq(ordersTable.order_status, "Delivered"), // Filter by status
          between(ordersTable.order_date, startDate, endDate) // Filter by date
        )
      )
      .groupBy(productsTable.supplier) // Group by supplier
      
    return revenueBySupplier; 
    } catch (error) {
    console.error("Error fetching revenue by supplier:", error); // Log the error for debugging
    throw error; // Rethrow the error to the caller
  }
}
