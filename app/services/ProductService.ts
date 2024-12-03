import path from "path";
import { getAllProducts, insertProduct, queryProducts, queryVariantById, getProductDetailsByVariantId, getProductIdByVariantDAO } from "../db/dao/productDAO";
import { readProductExcel } from "../utils/excel";
import { Product } from "../types/custom_types";
import { getImageById } from "../utils/imgHandler";

export const getProducts = () => {
   return getAllProducts();
}


export const searchProducts = async (prompt: string) => {
   const result = await queryProducts(prompt);
   
   if (result.isSuccess && result.data!=null) {
      const newData = await Promise.all(
         result.data.map(async item => {
            if (item.img_front != "" && item.img_front != null) {
               item.img_front = await getImageById(item.img_front);
            }
            if (item.img_back != "" && item.img_back != null) {
               item.img_back = await getImageById(item.img_back);
            }
            return item;
         })
      );

      result.data = newData;
   }
   return result;
}


export const createProduct = async (filename: string) => {
   const excelRes = await readProductExcel(path.join(process.env.EXCEL_UPLOADS!, filename));
   console.log(excelRes);

   if (excelRes && excelRes?.isSuccess) {
      const product = excelRes.data as Product;
      return await insertProduct(product);
   }
   else
      return {isSuccess: false, msg: "Couldn't get product form excel file.", error: ""};
   
}


export async function getVariantById(variant_id: string) {
   return await queryVariantById(variant_id);
}


export async function getProductsbyVariant(variant_id: string) {
  return await  getProductDetailsByVariantId(variant_id);
}

export async function getProductIdByVariant(variant_id: string) {
   return await  getProductIdByVariantDAO(variant_id);
   
}