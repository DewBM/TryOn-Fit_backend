import { eq } from "drizzle-orm";
import { db } from ".."

import { inquiry_reportTable } from "../schema/InquiryForm"

interface inqDataType{
    order_id : string,
    product_id: string,
    customer_id : string,
    customer_name : string,
    customer_tele : string,
    issue_type: string,
    issue_description: string,
    // image: string,
    additional_comments: string


}

export async function createNewInquiryForm(inqData : inqDataType){
    console.log(inqData);
    try{
        const newInquiry = await db.insert(inquiry_reportTable).values(
            {
                order_id: inqData.order_id,
                product_id: inqData.product_id,
                customer_id: inqData.customer_id,
                customer_name : inqData.customer_name,
                customer_tele:inqData.customer_tele,
                issue_type: inqData.issue_type,
                issue_description: inqData.issue_description,
                additional_comments: inqData.additional_comments
            }
        )
        console.log("Successfully added to database!");

    }
    
    catch(error){
        console.error('Error executing query', error);
    }

}
