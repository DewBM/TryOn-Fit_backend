import { getAddressByCustomerId } from "../db/dao/addressDAO";

export async function getAddress(customer_id:number){
  return getAddressByCustomerId(customer_id);
}