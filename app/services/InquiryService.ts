import { getAllInquiryList } from "../db/dao/InquiryDAO";


export const getinquirylist = () => {
    return getAllInquiryList();
  }