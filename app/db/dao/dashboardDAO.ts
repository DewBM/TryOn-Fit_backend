import { sql } from "drizzle-orm";
import { db } from "..";
import { employeesTable, productsTable, suppliersTable , ordersTable} from "../schema";
import { storeManagerDashboardTypes } from "../../types/custom_types"; // Ensure this path is correct
export async function getEmployeeCount() {
    try {
        // Use raw SQL query to count rows if Drizzle doesn't support `count` directly
        const totalEmployee = await db.execute(
            sql`SELECT COUNT(*) AS count FROM ${employeesTable}`
        ) as { count: number }[];
        const totalSuppliers = await db.execute(
            sql`SELECT COUNT(*) AS count FROM ${suppliersTable}`
        ) as { count: number }[];
        const totalProducts = await db.execute(
            sql`SELECT COUNT(*) AS count FROM ${productsTable}`
        ) as { count: number }[];

        
const totalRevenue = await db.execute(
    sql`SELECT 
         SUM(sub_total) AS total_revenue
         FROM ${ordersTable};`
 ) as { total_revenue: number }[];

       
        const data: storeManagerDashboardTypes = {
            totalEmployees: totalEmployee[0].count,
            totalSuppliers: totalSuppliers[0].count,
            totalProducts: totalProducts[0].count,
            revenue: totalRevenue[0].total_revenue,
        };

        console.log(`Total number of employees: ${data}`);
        return data;
    } catch (error) {
        console.error("Error fetching employee count:", error);
        throw new Error("Failed to fetch employee count");
    }
}
