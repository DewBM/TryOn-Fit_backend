import { eq } from "drizzle-orm";
import { db } from ".."
import { suppliersTable } from "../schema/Supplier"
interface supDataType {
    supplier_id: string,
   first_name: string,
   last_name: string,
   brand_name: string,
   contact_no: string,
   address: string
}
export async function getAllSupplier() {
    try{
        return db.query.suppliersTable.findMany();
    }catch(error){  
        console.error('Error executing query', error);
    }
}

export async function createNewSupplier(supData:supDataType) {
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

export async function updateSupplierData(supData:supDataType,id : string) {
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

export async function deleteExistSuplier(id:string) {
    try{
        const delsup = await db.delete(suppliersTable).where(eq(suppliersTable.supplier_id, id));
    }catch(error){
        console.error('Error executing query', error);
    }
    
}