import { getAllSupplier, getmonthyrevenue, getyealyrevenue } from "../db/dao/RepoertDAO";
import { filterDateType } from "../types/custom_types";


export const getRevenueBySupplier = (filterDate: filterDateType) =>{
    // console.log("2");
    return getAllSupplier(filterDate)
}

export const getRevenuebyMonth = (month: string,year:string) =>{
    console.log("2month");
    return getmonthyrevenue(month,year);
}

export const getRevenuebyYear = (year:string) =>{
    console.log("2year");
    return getyealyrevenue(year);
}