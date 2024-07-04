import { getAllProducts } from "../db/dao/productDao";

export const getProducts = () => {
   return getAllProducts();
}