import { eq } from "drizzle-orm";
import { db } from ".."
import { suppliersTable } from "../schema/Supplier"
import {SelectSupllier} from "../schema/Supplier"
import { sql } from "drizzle-orm";

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

export async function updateSupplierData(supData:supDataType) {
    console.log(supData)
    const id = supData.supplier_id
    try{
        const updatedEmp  = await db.update(suppliersTable)
        .set({ 
                first_name: supData.first_name,
                last_name: supData.last_name,
                brand_name: supData.brand_name,
                contact_no: supData.contact_no,
                address: supData.address,
                email: supData.email,
                register_date : supData.register_date,
                // status: supData.status
            
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


//Total suppliers 

export async function getTotalNumberOfSuppliers() {
    try {
      const result = await db
        .select({ count: sql<number>`COUNT(*)` }) // Correct usage of sql for COUNT
        .from(suppliersTable);
  
      return {
        isSuccess: true,
        data: result[0]?.count || 0, // Return the count or 0 if undefined
        msg: "Total number of suppliers fetched successfully",
        error: "",
      };
    } catch (error) {
      console.error("Error fetching total number of suppliers:", error);
      return {
        isSuccess: false,
        data: null,
        msg: "Couldn't fetch total number of suppliers",
        error,
      };
    }
  }