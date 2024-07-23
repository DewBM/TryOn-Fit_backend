import { getAllProducts, insertProduct } from "../db/dao/productDAO";
import { Product } from "../db/schema/Product";

export const getProducts = () => {
   return getAllProducts();
}


export const createProduct = async (product: Product) => {
   return await insertProduct(product);
}