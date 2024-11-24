import { eq } from "drizzle-orm";
import { db } from "..";
import { customersTable } from "../schema";
import { SelectCustomer } from "../schema/Customer";

export async function getCustomerByCustomerId(customer_id: number) {
  try {
    const customer = await db
      .select()
      .from(customersTable)
      .where(eq(customersTable.customer_id, customer_id));

    return {
      isSuccess: true,
      data: customer[0], 
      msg: "",
      error: "",
    };
  } catch (e) {
    console.log(e);
    return {
      isSuccess: false,
      data: null,
      msg: "Couldn't get customer data.",
      error: e,
    };
  }
}



export async function updateExistCustomer(CusData: SelectCustomer,customer_id : number ) {
  console.log(CusData);
 
  console.log(CusData.customer_id);
  try{
  const updatedCustomer  = await db.update(customersTable)
  .set({ first_name: CusData.first_name,last_name :CusData.last_name,
      email : CusData.email
      
   })
  .where(eq(customersTable.customer_id,CusData.customer_id));
      console.log(4);
      return updatedCustomer;
  }catch(error){
      console.error('Error executing query', error);
  }
}