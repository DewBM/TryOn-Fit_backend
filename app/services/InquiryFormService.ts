
import { createNewInquiryForm } from "../db/dao/InquiryFormDAO";
import { InsertInquiryReport } from "../db/schema/InquiryForm";
import { getAllInquiryForm } from "../db/dao/InquiryFormDAO";
import { updateInquiryFormSolution } from "../db/dao/InquiryFormDAO";
import { deleteInquiryReport } from "../db/dao/InquiryFormDAO";


export const createinquiryform = (inqData: InsertInquiryReport) => {
  return createNewInquiryForm(inqData);
};


export const getinquiryform = () => {
  return getAllInquiryForm();
}


export const updateInquiryForm = (id: number, solution: string, status: any) =>{
  return updateInquiryFormSolution(id,solution);
}

export const deleteInquiryForm = (id:number) =>{
  return deleteInquiryReport(id);
}