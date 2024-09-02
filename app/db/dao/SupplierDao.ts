import { eq } from "drizzle-orm";
import { db } from ".."
import { suppliersTable } from "../schema/Supplier"
import {selectSupllier} from "../schema/Supplier"

export async function getAllSupplier() {
    try{
        return db.query.suppliersTable.findMany();
    }catch(error){  
        console.error('Error executing query', error);
    }
}

export async function createNewSupplier(supData:selectSupllier) {
    console.log(supData);
    try{

        const newSupplier = await db.insert(suppliersTable).values(
            {
                supplier_id: supData.supplier_id,
                first_name: supData.first_name,
                last_name: supData.last_name,
                brand_name: supData.brand_name,
                contact_no: supData.contact_no,
                address: supData.address
            }
        )

    }catch(error){
        console.error('Error executing query', error);
    }
}

export async function updateSupplierData(supData:selectSupllier,id : string) {
    console.log(supData)
    try{
        const updatedEmp  = await db.update(suppliersTable)
        .set({ 
                first_name: supData.first_name,
                last_name: supData.last_name,
                brand_name: supData.brand_name,
                contact_no: supData.contact_no,
                address: supData.address
            
         })
        .where(eq(suppliersTable.supplier_id,id));
            console.log(id);
            return updatedEmp;
        }catch(error){
            console.error('Error executing query', error);
        
        }
}

export async function deleteExistSuplier(id:{supplier_id:string}) {
    try{
        const delsup = await db.delete(suppliersTable).where(eq(suppliersTable.supplier_id, id.supplier_id));
    }catch(error){
        console.error('Error executing query', error);
    }
    
}