"use strict";
// import { eq } from "drizzle-orm";
// import { db } from ".."
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewInquiryForm = void 0;
// import { inquiry_reportTable, InsertInquiryReport } from "../schema/InquiryForm"
// export async function createNewInquiryForm(inqData: InsertInquiryReport) {
//   console.log(inqData);
//   try {
//     // Insert the inquiry data into the database
//     const newInquiry = await db.insert(inquiry_reportTable).values(inqData);
//     console.log("Successfully added to database!");
//   } 
//   catch (error) {
//     console.error('Error executing query', error);
//   }
// }
const __1 = require("..");
const InquiryForm_1 = require("../schema/InquiryForm");
async function createNewInquiryForm(inqData) {
    console.log(inqData);
    try {
        // Insert the inquiry data into the database
        const newInquiry = await __1.db.insert(InquiryForm_1.inquiry_reportTable).values(inqData).returning();
        console.log("Successfully added to database!");
        // Return success response
        return {
            isSuccess: true,
            data: newInquiry,
            msg: "Successfully added to database!",
            error: null,
        };
    }
    catch (error) {
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
exports.createNewInquiryForm = createNewInquiryForm;
// interface inqDataType{
//     order_id : string,
//     product_id: string,
//     customer_id : string,
//     customer_name : string,
//     customer_tele : string,
//     issue_type: string,
//     issue_description: string,
//     // image: string,
//     additional_comments: string
// }
// export async function createNewInquiryForm(inqData : inqDataType){
//     console.log(inqData);
//     try{
//         const newInquiry = await db.insert(inquiry_reportTable).values(
//             {
//                 order_id: inqData.order_id,
//                 product_id: inqData.product_id,
//                 customer_id: inqData.customer_id,
//                 customer_name : inqData.customer_name,
//                 customer_tele:inqData.customer_tele,
//                 issue_type: inqData.issue_type,
//                 issue_description: inqData.issue_description,
//                 additional_comments: inqData.additional_comments
//             }
//         )
//         console.log("Successfully added to database!");
//     }
//     catch(error){
//         console.error('Error executing query', error);
//     }
// }
