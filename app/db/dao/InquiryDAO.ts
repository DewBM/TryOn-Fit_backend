import { eq } from "drizzle-orm";
import { db } from "..";
import { inquiry_reportTable, InsertInquiryReport } from "../schema/InquiryForm";



 export async function getAllInquiryList() {
        try {
      
          const inquiryLists = await db.select().from(inquiry_reportTable).execute();
      
          console.log("Successfully fetched inquiry forms!");
      
        
          return {
            isSuccess: true,
            data: inquiryLists, 
            msg: "Successfully fetched inquiry forms!",
            error: null,
          };
        } catch (error) {
          console.error("Error executing query", error);
      
         
          return {
            isSuccess: false,
            data: null,
            msg: "Failed to fetch inquiry list from the database",
            error: error,
          };
        }
      }
      
