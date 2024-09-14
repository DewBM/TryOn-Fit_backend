import { eq } from "drizzle-orm";
import { db } from "..";
import { inquiry_reportTable, InsertInquiryReport } from "../schema/InquiryForm";

export async function createNewInquiryForm(inqData: InsertInquiryReport) {
  console.log(inqData);

  try {
    const newInquiry = await db.insert(inquiry_reportTable).values(inqData).returning();

    console.log("Successfully added to database!");

    return {
      isSuccess: true,
      data: newInquiry, 
      msg: "Successfully added to database!",
      error: null,
    };
  } catch (error) {
    console.error("Error executing query", error);

    return {
      isSuccess: false,
      data: null,
      msg: "Failed to add inquiry to the database",
      error: error,
    };
  }
}


export async function getAllInquiryForm() {
  try {

    const inquiryForms = await db.select().from(inquiry_reportTable).execute();

    console.log("Successfully fetched inquiry forms!");

  
    return {
      isSuccess: true,
      data: inquiryForms, 
      msg: "Successfully fetched inquiry forms!",
      error: null,
    };
  } catch (error) {
    console.error("Error executing query", error);

   
    return {
      isSuccess: false,
      data: null,
      msg: "Failed to fetch inquiry forms from the database",
      error: error,
    };
  }
}


export async function updateInquiryFormSolution(id: number, solution: string) {
  try {

    const updatedInquiry = await db.update(inquiry_reportTable)
      .set({ solution: solution })
      .where(eq(inquiry_reportTable.inquiry_id,id))
      .returning();

    console.log("Successfully updated inquiry form!");

    
    return {
      isSuccess: true,
      data: updatedInquiry, 
      msg: "Successfully updated inquiry form!",
      error: null,
    };
  } catch (error) {
    console.error("Error executing query", error);

    
    return {
      isSuccess: false,
      data: null,
      msg: "Failed to update inquiry form",
      error: error,
    };
  }
}


export async function deleteInquiryReport(id: number) {
  try {

    const deletedInquiry = await db
    
    .delete(inquiry_reportTable)
    .where(eq(inquiry_reportTable.inquiry_id,id))
    .returning();

    console.log("Successfully deleted inquiry form!");

    
    return {
      isSuccess: true,
      data: deletedInquiry, 
      msg: "Successfully deleted inquiry form!",
      error: null,
    };
    
  } catch (error) {
    console.error("Error executing query", error);

    
    return {
      isSuccess: false,
      data: null,
      msg: "Failed to delete inquiry form",
      error: error,
    };
  }
}