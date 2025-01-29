import { eq } from "drizzle-orm";
import { db } from "..";
import { SelectCustomer } from "../schema/Customer";
import { customers ,bodyMeasurementsTable } from "../schema/Customer";

// export async function getCustomerByCustomerId(customer_id: number) {
//   try {
//     const customer = await db
//       .select()
//       .from(customersTable)
//       .where(eq(customersTable.customer_id, customer_id));

//     return {
//       isSuccess: true,
//       data: customer[0], 
//       msg: "",
//       error: "",
//     };
//   } catch (e) {
//     console.log(e);
//     return {
//       isSuccess: false,
//       data: null,
//       msg: "Couldnt get customer data here..",
//       error: e,
//     };
//   }
// }

//update customer 


export async function getCustomerByCustomerId(user_id: number) {
   try {
     const customer = await db.select()
       .from(customers)
       .where(eq(customers.userId, user_id));
 
     if (customer.length === 0) {
       return {
         isSuccess: false,
         data: null,
         msg: "No customer found for the given user ID.",
         error: null
       };
     }
 
     return {
       isSuccess: true,
       data: customer[0],
       msg: "Customer fetched successfully.",
       error: null
     };
   } catch (e) {
     console.error("Error fetching customer: ", e);
     return {
       isSuccess: false,
       data: null,
       msg: "Database error occurred.",
       error: e
     };
   }
 }
 

// export async function updateCustomerByCustomerId(
//   customer_id: number,
//   updatedData: Partial<SelectCustomer>
// ) {
//   try {
//     const updatedCustomer = await db
//       .update(customersTable)
//       .set(updatedData) 
//       .where(eq(customersTable.customer_id, customer_id))
//       .returning();

//     if (updatedCustomer.length === 0) {
//       return {
//         isSuccess: false,
//         data: null,
//         msg: "Customer not found.",
//         error: "",
//       };
//     }

//     return {
//       isSuccess: true,
//       data: updatedCustomer[0],
//       msg: "Customer updated successfully.",
//       error: "",
//     };
//   } catch (e) {
//     console.log(e);
//     return {
//       isSuccess: false,
//       data: null,
//       msg: "Couldn't update customer data.",
//       error: e,
//     };
//   }
// }

export async function addBodyMeasurements(customer_id: number, measurements: Record<string, number>) {
  try {
    await db.insert(bodyMeasurementsTable).values({
      customer_id,
      ...measurements,
    });
    return { isSuccess: true, msg: "Measurements added ...successfully...", error: "" };
  } catch (e) {
    console.error(e);
    return { isSuccess: false, msg: "Failed.... to add measurements...", error: e };
  }
}


export const getCustomerIdByUserId = async (userId: number): Promise<number | null> => {
  try {
    const result = await db
      .select({
        customer_id: customersTable.customer_id,
      })
      .from(customersTable)
      .where(eq(customersTable.user_id, userId));

    if (result.length > 0) {
      return result[0].customer_id; // Return the customer_id
    } else {
      return null; // No matching record found
    }
    console.log("userId",userId);
  } catch (error) {
    console.error("Error fetching customer_id by user_id:", error);
    throw error; // Handle or propagate the error
  }
};