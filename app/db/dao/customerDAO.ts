import { eq } from "drizzle-orm";
import { db } from "..";
import { customersTable } from "../schema";
import { SelectCustomer } from "../schema/Customer";

export async function getCustomerByCustomerId(customer_id: number) {
  try {
    const customer = await db
      .select()
      .from(customersTable)
      .where(eq(customersTable.customer_id, customer_id));

    return {
      isSuccess: true,
      data: customer[0], 
      msg: "",
      error: "",
    };
  } catch (e) {
    console.log(e);
    return {
      isSuccess: false,
      data: null,
      msg: "Couldnt get customer data here..",
      error: e,
    };
  }
}

//update customer 


export async function updateCustomerByCustomerId(
  customer_id: number,
  updatedData: Partial<SelectCustomer>
) {
  try {
    const updatedCustomer = await db
      .update(customersTable)
      .set(updatedData) 
      .where(eq(customersTable.customer_id, customer_id))
      .returning();

    if (updatedCustomer.length === 0) {
      return {
        isSuccess: false,
        data: null,
        msg: "Customer not found.",
        error: "",
      };
    }

    return {
      isSuccess: true,
      data: updatedCustomer[0],
      msg: "Customer updated successfully.",
      error: "",
    };
  } catch (e) {
    console.log(e);
    return {
      isSuccess: false,
      data: null,
      msg: "Couldn't update customer data.",
      error: e,
    };
  }
}

