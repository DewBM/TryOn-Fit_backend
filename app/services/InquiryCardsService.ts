import {
    getTotalPendingInquiries,
    getTotalSolvedInquiries,
    getTotalInquiriesToday,
  } from '../db/dao/InquiryCardsDAO';
  
  // Service function to fetch inquiry stats
  export const getInquiryCards = async () => {
    try {
      const totalPending = await getTotalPendingInquiries();
      const totalSolved = await getTotalSolvedInquiries();
      const totalToday = await getTotalInquiriesToday();
  
      return {
        isSuccess: true,
        data: {
          totalPending,
          totalSolved,
          totalToday,
        },
        msg: "Inquiry stats fetched successfully",
      };
    } catch (error) {
      console.error("Error fetching inquiry stats:", error);
      return {
        isSuccess: false,
        data: null,
        msg: "Error fetching inquiry stats",
        error: "Data Missing",
      };
    }
  };
  