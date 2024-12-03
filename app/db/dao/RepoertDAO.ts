import { and, between, desc, eq, sql } from "drizzle-orm"; // Import required helpers from Drizzle ORM
import { db } from ".."; // Import your database instance
import { orderItemsTable, ordersTable, productsTable, suppliersTable } from "../schema"; // Import table schemas
import { productVariantsTable } from "../schema/Product";
import { filterDateType } from "../../types/custom_types";

export async function getAllSupplier(filterDate : filterDateType) {
  const startDate = new Date(filterDate.startDate); // Start date for filtering
  const endDate = new Date(filterDate.endDate); // End date for filtering
  // console.log(startDate,endDate);

  try {
    console.log("3")
    return await db
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
      
     
    } catch (error) {
    console.error("Error fetching revenue by supplier:", error); // Log the error for debugging
    throw error; // Rethrow the error to the caller
  }
}


export async function getmonthyrevenue(month: string, year: string,) {
  // const month = filterDate;
console.log("3month")
  try {
    return await db
  .select({
    supplierId: productsTable.supplier, // Fetch supplier ID
    totalRevenue: sql<number>`SUM((${orderItemsTable.price} - COALESCE(${orderItemsTable.disount}, 0)) * ${orderItemsTable.quantity})`, // Calculate total revenue
  })
  .from(ordersTable)
  .innerJoin(orderItemsTable, eq(ordersTable.order_id, orderItemsTable.order_id)) // Join order items table
  .innerJoin(productVariantsTable, eq(orderItemsTable.item_id, productVariantsTable.variant_id)) // Join product variants table
  .innerJoin(productsTable, eq(productVariantsTable.product_id, productsTable.product_id)) // Join products table
  .where(
    and(
      eq(ordersTable.order_status, "Delivered"), // Filter by order status
      eq(sql<number>`EXTRACT(MONTH FROM ${ordersTable.order_date})`, month), // Filter by month
      eq(sql<number>`EXTRACT(YEAR FROM ${ordersTable.order_date})`, year) // Filter by year
    )
  )
  .groupBy(productsTable.supplier); // Group by supplier ID

    
  } catch (error) {
    console.error("Error fetching revenue by supplier:", error); // Log the error for debugging
    throw error; // Rethrow the error to the caller
    
  }
}

export async function getyealyrevenue(year: string,) {
  // const month = filterDate;
console.log("3year")
  try {
    return await db
  .select({
    supplierId: productsTable.supplier, // Fetch supplier ID
    totalRevenue: sql<number>`SUM((${orderItemsTable.price} - COALESCE(${orderItemsTable.disount}, 0)) * ${orderItemsTable.quantity})`, // Calculate total revenue
  })
  .from(ordersTable)
  .innerJoin(orderItemsTable, eq(ordersTable.order_id, orderItemsTable.order_id)) // Join order items table
  .innerJoin(productVariantsTable, eq(orderItemsTable.item_id, productVariantsTable.variant_id)) // Join product variants table
  .innerJoin(productsTable, eq(productVariantsTable.product_id, productsTable.product_id)) // Join products table
  .where(
    and(
      eq(ordersTable.order_status, "Delivered"), // Filter by order status
      eq(sql<number>`EXTRACT(YEAR FROM ${ordersTable.order_date})`, year) // Filter by year
    )
  )
  .groupBy(productsTable.supplier); // Group by supplier ID

    
  } catch (error) {
    console.error("Error fetching revenue by supplier:", error); // Log the error for debugging
    throw error; // Rethrow the error to the caller
    
  }
}