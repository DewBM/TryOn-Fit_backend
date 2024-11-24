import { getCustomerByCustomerId as fetchCustomerById } from "../db/dao/customerDAO";
import { updateExistCustomer } from "../db/dao/customerDAO";
import { SelectCustomer } from "../db/schema/Customer";

export const getCustomerByCustomerId = (customer_id: number) => {
  return fetchCustomerById(customer_id);
};

export const updateCustomer = (CusData :SelectCustomer,customer_id:number) => {
  updateExistCustomer(CusData,customer_id);
}