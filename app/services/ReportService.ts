import { getAllSupplier, getAllSuppliersCost, getAllSuppliersProfit, getmonthyCost, getmonthyProfit, getmonthyrevenue, getyearlyCost, getyearlyProfit, getyearlyrevenue } from "../db/dao/RepoertDAO";
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
    console.log("3year");
    return getyearlyrevenue(year);
}


export const getCostySupplier = (filterDate: filterDateType) =>{
    // console.log("2");
    return getAllSuppliersCost(filterDate)
}

export const getCostbyMonth = (month: string,year:string) =>{
    console.log("2month");
    return getmonthyCost(month,year);
}

export const getCostbyYear = (year:string) =>{
    console.log("3year");
    return getyearlyCost(year);
}

export const getProfitBySupplier = (filterDate: filterDateType) =>{
    // console.log("2");
    return getAllSuppliersProfit(filterDate)
}

export const getProfitbyMonth = (month: string,year:string) =>{
    console.log("2month");
    return getmonthyProfit(month,year);
}

export const getProfitbyYear = (year:string) =>{
    console.log("3year");
    return getyearlyProfit(year);
}