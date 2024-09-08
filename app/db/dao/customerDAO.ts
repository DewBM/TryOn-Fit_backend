import { eq } from "drizzle-orm";
import { db } from "..";
import { customersTable } from "../schema";
import { BodyMeasurementTable } from "../schema/Customer";

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

// create bodymessurement
export async function inputBodyMeasurement(measureData: {
  // Emp_Id: number;
  chest: string;
  neck: string;
  west: string;
  hip: string;
  Arm_Length: string;
  Thigh_Circumference: string;
  torso: string;
  nseam: string;
  Calf_Circumference: string;
  sholder: string;
  bicep: string;
  wrist: string;
}) {
  console.log(6);
  console.log(measureData);
  const formattedData = {
    ...measureData, // Convert to string
  };

  // Insert new bodymessurement into the database
  try {
    const bodyMeasurement = await db.insert(BodyMeasurementTable).values({
      chest: formattedData.chest,
      neck: formattedData.neck,
      west: formattedData.west,
      hip: formattedData.hip,
      Arm_Length: formattedData.Arm_Length,
      Thigh_Circumference: formattedData.Thigh_Circumference,
      torso: formattedData.torso,
      nseam: formattedData.nseam,
      Calf_Circumference: formattedData.Calf_Circumference,
      sholder: formattedData.sholder,
      bicep: formattedData.bicep,
      wrist: formattedData.wrist,
    });
    return bodyMeasurement;
  } catch (error) {
    console.error("Error executing query", error);
  }
  console.log(6);
}
interface measureDataType {
  emp_id: number;
  chest: string;
  neck: string;
  west: string;
  hip: string;
  Arm_Length: string;
  Thigh_Circumference: string;
  torso: string;
  nseam: string;
  Calf_Circumference: string;
  sholder: string;
  bicep: string;
  wrist: string;
}
//update bodymeasurement updateExistMeasurement;

export async function updateExistMeasurement(measureData: measureDataType) {
  console.log(measureData);

  console.log(measureData.emp_id);
  try {
    const updatedMeasurement = await db
      .update(BodyMeasurementTable)
      .set({
        chest: measureData.chest,
        neck: measureData.neck,
        west: measureData.west,
        hip: measureData.hip,
        Arm_Length: measureData.Arm_Length,
        Thigh_Circumference: measureData.Thigh_Circumference,
        torso: measureData.torso,
        nseam: measureData.nseam,
        Calf_Circumference: measureData.Calf_Circumference,
        sholder: measureData.sholder,
        bicep: measureData.bicep,
        wrist: measureData.wrist,
      })
      .where(eq(BodyMeasurementTable.emp_id, measureData.emp_id));
    console.log(4);
    return updatedMeasurement;
  } catch (error) {
    console.error("Error executing query", error);
  }
}
