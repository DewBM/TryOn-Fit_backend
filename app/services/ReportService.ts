import { getAllSupplier } from "../db/dao/RepoertDAO";

interface revenueBySupplierType{
    sup_id : Text;
    revenue : number;
}

export const getRevenueBySupplier = () =>{
    console.log("2");
    return getAllSupplier()
}