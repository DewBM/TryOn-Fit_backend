import { getCustomerByCustomerId as fetchCustomerById } from "../db/dao/customerDAO";
import { SelectCustomer, SelectAddress } from "../db/schema/Customer";

export const getCustomerByCustomerId = (customer_id: number) => {
  return fetchCustomerById(customer_id);
};
