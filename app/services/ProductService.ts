import { getAllProducts, insertProduct, queryProducts, queryVariantById } from "../db/dao/productDAO";
import { Product } from "../db/schema/Product";

export const getProducts = () => {
   return getAllProducts();
}


export const searchProducts = async (prompt: string) => {
   const result = await queryProducts(prompt);
   console.log(result);
   return result;
}


export const createProduct = async (product: Product) => {
   return await insertProduct(product);
}


export async function getVariantById(variant_id: string) {
   return await queryVariantById(variant_id);
}