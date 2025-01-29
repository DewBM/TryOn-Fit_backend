import { SelectCustomer } from "../db/schema/Customer";
// import { updateCustomerByCustomerId as updateCustomerInDAO } from "../db/dao/customerDAO";
import { getCustomerByCustomerId as fetchCustomerById ,addBodyMeasurements, getCustomerIdByUserId } from "../db/dao/customerDAO";
import {Customer} from '../types/custom_types'


export async function getCustomerByCustomerId(userId: number): Promise<Customer | null> {
  return await getCustomerByCustomerId(userId);
}
export const getCustomerId =(user_id:number) =>{
  return getCustomerIdByUserId(user_id)
}

// export const updateCustomerByCustomerId = async (
//   customer_id: number,
//   updatedData: Partial<SelectCustomer>
// ) => {
//   try {
   
//     const result = await updateCustomerInDAO(customer_id, updatedData);

//     if (!result.isSuccess) {
//       return {
//         isSuccess: false,
//         data: null,
//         msg: result.msg,
//         error: result.error,
//       };
//     }

//     return {
//       isSuccess: true,
//       data: result.data,
//       msg: result.msg,
//       error: "",
//     };
//   } catch (error) {
//     console.error("Error:", error);
//     return {
//       isSuccess: false,
//       data: null,
//       msg: "Error occurred while updating customer data.",
//       error,
//     };
//   }
// };

//bodymeasustement 
export const storeBodyMeasurements = (customer_id: number, measurements: Record<string, number>) => {
  return addBodyMeasurements(customer_id, measurements);
};
