import { db } from "..";
import { inquiry_reportTable, InsertInquiryReport } from "../schema/InquiryForm";

export async function createNewInquiryForm(inqData: InsertInquiryReport) {
  console.log(inqData);

  try {
    // Insert the inquiry data into the database
    const newInquiry = await db.insert(inquiry_reportTable).values(inqData).returning();

    console.log("Successfully added to database!");

    // Return success response
    return {
      isSuccess: true,
      data: newInquiry, // Assuming `newInquiry` contains the inserted data
      msg: "Successfully added to database!",
      error: null,
    };
  } catch (error) {
    console.error("Error executing query", error);

    // Return failure response
    return {
      isSuccess: false,
      data: null,
      msg: "Failed to add inquiry to the database",
      error: error,
    };
  }
}

