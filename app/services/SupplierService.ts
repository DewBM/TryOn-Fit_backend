// import { getURL } from "next/dist/shared/lib/utils";
import {createNewSupplier,getAllSupplier, updateSupplierData,deleteExistSuplier , getTotalNumberOfSuppliers} from "../db/dao/SupplierDao"
import { SelectSupllier } from "../db/schema/Supplier";

// interface supDataType {
//     supplier_id: string,
//    first_name: string,
//    last_name: string,
//    brand_name: string,
//    contact_no: string,
//    address: string
// }

export const createSupplier = (supData :SelectSupllier) => {
   return createNewSupplier(supData);
}

export const getSupplier = () => {
   return getAllSupplier()
}

export const updateSupplier = (supData : SelectSupllier) => {
   return updateSupplierData(supData);
}
export const deleteSupplier = (id : {supplier_id:string}) => {
   return deleteExistSuplier(id );
}

//Total suppliers

export async function fetchTotalNumberOfSuppliers() {
   try {
     const result = await getTotalNumberOfSuppliers();
     return result;
   } catch (error) {
     console.error("Error in fetchTotalNumberOfSuppliersService:", error);
     return {
       isSuccess: false,
       data: null,
       msg: "Service layer error while fetching total number of suppliers",
       error,
     };
   }
 }