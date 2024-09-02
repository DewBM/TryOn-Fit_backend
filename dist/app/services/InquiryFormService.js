"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createinquiryform = void 0;
const InquiryFormDAO_1 = require("../db/dao/InquiryFormDAO");
// The service function now directly accepts the InsertInquiryReport type
const createinquiryform = (inqData) => {
    return (0, InquiryFormDAO_1.createNewInquiryForm)(inqData);
};
exports.createinquiryform = createinquiryform;
// import {createNewInquiryForm} from "../db/dao/InquiryFormDAO"
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
// export const createinquiryform = (inqData : inqDataType) => {
//     return createNewInquiryForm(inqData);
// }
