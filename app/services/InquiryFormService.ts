
import { createNewInquiryForm } from "../db/dao/InquiryFormDAO";
import { InsertInquiryReport } from "../db/schema/InquiryForm";
import { getAllInquiryForm } from "../db/dao/InquiryFormDAO";

// The service function now directly accepts the InsertInquiryReport type
export const createinquiryform = (inqData: InsertInquiryReport) => {

  return createNewInquiryForm(inqData);

};



export const getinquiryform = () => {
  return getAllInquiryForm();
}