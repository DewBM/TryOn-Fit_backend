import {createNewSupplier,getAllSupplier} from "../db/dao/SupplierDao"

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

export const updateSupplier = (supData : supDataType) => {

}