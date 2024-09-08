import { getCustomerByCustomerId as fetchCustomerById } from "../db/dao/customerDAO";
import { SelectCustomer, SelectAddress } from "../db/schema/Customer";
import { inputBodyMeasurement } from "../db/dao/customerDAO";

import { updateExistMeasurement } from "../db/dao/customerDAO";

export const getCustomerByCustomerId = (customer_id: number) => {
  return fetchCustomerById(customer_id);
};

export const inputMeasurement = (measureData: {
  chest: string;
  neck: string;
  west: string;
  hip: string;
  Arm_Length: string;
  Thigh_Circumference: string;
  torso: string;
  nseam: string;
  Calf_Circumference: string;
  sholder: string;
  bicep: string;
  wrist: string;
}) => {
  console.log(5);
  return inputBodyMeasurement(measureData);
};

//updateMeasurement

export const updateMeasurement = (measureData: {
  emp_id: number;
  chest: string;
  neck: string;
  west: string;
  hip: string;
  Arm_Length: string;
  Thigh_Circumference: string;
  torso: string;
  nseam: string;
  Calf_Circumference: string;
  sholder: string;
  bicep: string;
  wrist: string;
}) => {
  console.log(2);
  return updateExistMeasurement(measureData);
};
