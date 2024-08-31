import { eq } from "drizzle-orm";
import { db } from ".."

import { inquiry_reportTable } from "../schema/InquiryForm"

interface inqDataType{
    order_id : string,
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
                order_id: Number(inqData.order_id),
                issue_type: inqData.issue_type,
                issue_description: inqData.issue_description,
                additional_comments: inqData.additional_comments
            }
        )

    }
    catch(error){
        console.error('Error executing query', error);
    }

}
