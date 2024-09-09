import { eq } from "drizzle-orm";
import { db } from "..";
import { addressesTable } from "../schema/Address";

export async function getAddressById(address_id: number) {
  try {
    const address = await db
      .select()
      .from(addressesTable)
      .where(eq(addressesTable.address_id, address_id));

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

// Update address by ID
interface AddressData {
  address_id: number;
  address_line_1: string;
  address_line_2: string;
  city: string;
  district: string;
  postal_code: string;
}

export async function updateAddress(addressData: AddressData) {
  try {
    const updatedAddress = await db
      .update(addressesTable)
      .set({
        address_line_1: addressData.address_line_1,
        address_line_2: addressData.address_line_2,
        city: addressData.city,
        district: addressData.district,
        postal_code: addressData.postal_code,
      })
      .where(eq(addressesTable.address_id, addressData.address_id));

    return {
      isSuccess: true,
      data: updatedAddress,
      msg: "Address updated successfully",
      error: "",
    };
  } catch (error) {
    console.error("Error updating address", error);
    return {
      isSuccess: false,
      data: null,
      msg: "Couldn't update address",
      error,
    };
  }
}
