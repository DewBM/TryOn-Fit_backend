// import { getURL } from "next/dist/shared/lib/utils";
import {createNewSupplier,getAllSupplier, updateSupplierData,deleteExistSuplier} from "../db/dao/SupplierDao"
import { SelectSupllier } from "../db/schema/Supplier";

interface supDataType {
   supplier_id: string;
   first_name: string;
   last_name: string;
   brand_name: string;
   contact_no: string;
   address: string;
   email: string;
   status: string;
   register_date: string;
 }

export const createSupplier = (supData :SelectSupllier) => {
   return createNewSupplier(supData);
}

export const getSupplier = () => {
   return getAllSupplier()
}

export const updateSupplier = (supData : supDataType) => {
   return updateSupplierData(supData);
}
export const deleteSupplier = (id : {supplier_id:string}) => {
   return deleteExistSuplier(id );
}