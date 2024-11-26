import { eq } from "drizzle-orm";
import { db } from "..";
import { customersTable ,bodyMeasurementsTable } from "../schema/Customer";

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
      msg: "Couldnt get customer data here",
      error: e,
    };
  }
}



export async function addBodyMeasurements(customer_id: number, measurements: Record<string, number>) {
  try {
    await db.insert(bodyMeasurementsTable).values({
      customer_id,
      ...measurements,
    });
    return { isSuccess: true, msg: "Measurement added successfully.", error: "" };
  } catch (e) {
    console.error(e);
    return { isSuccess: false, msg: "Failed to add measurements.", error: e };
  }
}