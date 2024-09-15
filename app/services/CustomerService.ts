import { getCustomerByCustomerId as fetchCustomerById } from "../db/dao/customerDAO";

export const getCustomerByCustomerId = (customer_id: number) => {
  return fetchCustomerById(customer_id);
};
