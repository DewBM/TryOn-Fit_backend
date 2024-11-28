import { eq } from "drizzle-orm";
import { db } from "..";
import { addressesTable, InsertAddressType } from "../schema/Address";
import { customersTable } from "../schema";

export async function getAddressByCustomerId(customer_id: number) {
  try {
    const address = await db
      .select()
      .from(addressesTable)
      .where(eq(addressesTable.customer_id, customer_id));

    return {
      isSuccess: true,
      data: address[0],
      msg: "",
      error: "",
    };
  } catch (e) {
    console.log(e);
    return {
      isSuccess: false,
      data: null,
      msg: "Couldn't get address data.",
      error: e,
    };
  }
}


export async function updateAddressByCustomerId(customer_id: number, updatedData: Partial<InsertAddressType>) {
  try {
    // Perform the update query
    const updatedAddress = await db
      .update(addressesTable)
      .set(updatedData) // Specify fields to update
      .where(eq(addressesTable.customer_id, customer_id)) // Match by customer_id
      .returning(); // Return the updated row

    if (updatedAddress.length === 0) {
      return {
        isSuccess: false,
        data: null,
        msg: "Address not found.",
        error: "",
      };
    }

    return {
      isSuccess: true,
      data: updatedAddress[0],
      msg: "Address updated successfully.",
      error: "",
    };
  } catch (e) {
    console.log(e);
    return {
      isSuccess: false,
      data: null,
      msg: "Couldn't update address.",
      error: e,
    };
  }
}








