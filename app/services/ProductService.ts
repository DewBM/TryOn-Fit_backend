import { getAllProducts } from "../db/dao/productDAO";

export const getProducts = () => {
   return getAllProducts();
}