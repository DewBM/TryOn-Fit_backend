import {createNewInquiryForm} from "../db/dao/InquiryFormDAO"

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


export const createinquiryform = (inqData : inqDataType) => {
    return createNewInquiryForm(inqData);
}