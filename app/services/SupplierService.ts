import { getURL } from "next/dist/shared/lib/utils";
import {createNewSupplier,getAllSupplier, updateSupplierData,deleteExistSuplier} from "../db/dao/SupplierDao"

interface supDataType {
    supplier_id: string,
   first_name: string,
   last_name: string,
   brand_name: string,
   contact_no: string,
   address: string
}

export const createSupplier = (supData :supDataType) => {
   return createNewSupplier(supData);
}

export const getSupplier = () => {
   return getAllSupplier()
}

export const updateSupplier = (supData : supDataType, id : string) => {
   return updateSupplierData(supData, id);
}
export const deleteSupplier = (id : {supplier_id:string}) => {
   return deleteExistSuplier(id );
}