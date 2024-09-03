import { eq } from "drizzle-orm";
import { db } from ".."
import { suppliersTable } from "../schema/Supplier"
import {SelectSupllier} from "../schema/Supplier"

export async function getAllSupplier() {
    try{
        return db.query.suppliersTable.findMany();
    }catch(error){  
        console.error('Error executing query', error);
    }
}

export async function createNewSupplier(supData:SelectSupllier) {
    console.log(supData);
    try{

        const newSupplier = await db.insert(suppliersTable).values(
            {
                supplier_id: supData.supplier_id,
                first_name: supData.first_name,
                last_name: supData.last_name,
                brand_name: supData.brand_name,
                contact_no: supData.contact_no,
                address: supData.address,
                email: supData.email,
                register_date : supData.register_date,
                status: supData.status
                
            }
        )

    }catch(error){
        console.error('Error executing query', error);
    }
}

export async function updateSupplierData(supData:SelectSupllier,id : string) {
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