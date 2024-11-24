import { getCustomerByCustomerId as fetchCustomerById ,addBodyMeasurements } from "../db/dao/customerDAO";

export const getCustomerByCustomerId = (customer_id: number) => {
  return fetchCustomerById(customer_id);
};


//bodymeasustement 
export const storeBodyMeasurements = (customer_id: number, measurements: Record<string, number>) => {
  return addBodyMeasurements(customer_id, measurements);
};
