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
      msg: "Couldn't get customer data.",
      error: e,
    };
  }
}


