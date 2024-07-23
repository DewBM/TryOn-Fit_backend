import { getAllProducts, insertProduct } from "../db/dao/productDAO";
import { Product } from "../db/schema/Product";

export const getProducts = () => {
   return getAllProducts();
}


export const createProduct = async (product: Product) => {
   try {
      const res = await insertProduct(product);
      console.log("Product response: ", res);
   }
   catch (e) {
      console.log('Product error: ', e);
   }
}