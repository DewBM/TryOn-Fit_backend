import { getAllSupplier } from "../db/dao/RepoertDAO";
import { filterDateType } from "../types/custom_types";


export const getRevenueBySupplier = (filterDate: filterDateType) =>{
    console.log("2");
    return getAllSupplier(filterDate)
}