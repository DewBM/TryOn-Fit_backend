import { getAllProducts,  queryProducts, queryVariantById, getProductDetailsByVariantId,  } from "../db/dao/productDAO";
import { getProductIdByVariantDAO } from "../db/dao/productDAO";
import { Product } from "../db/schema/Product";

export const getProducts = () => {
   return getAllProducts();
}


export const searchProducts = async (prompt: string) => {
   const result = await queryProducts(prompt);
   console.log(result);
   return result;
}


// export const createProduct = async (product: Product) => {
//    return await insertProduct(product);
// }


export async function getVariantById(variant_id: string) {
   return await queryVariantById(variant_id);
}


export async function getProductsbyVariant(variant_id: string) {
  return await  getProductDetailsByVariantId(variant_id);
}

export async function getProductIdByVariant(variant_id: string) {
   return await  getProductIdByVariantDAO(variant_id);
   
}