
import { createNewInquiryForm } from "../db/dao/InquiryFormDAO";
import { InsertInquiryReport } from "../db/schema/InquiryForm";

// The service function now directly accepts the InsertInquiryReport type
export const createinquiryform = (inqData: InsertInquiryReport) => {

  return createNewInquiryForm(inqData);

};


