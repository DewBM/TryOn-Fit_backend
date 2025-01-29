import path from "path";
import { getAllProducts, insertProduct, queryProducts, queryVariantById, getProductDetailsByVariantId, getProductIdByVariantDAO , getTotalNumberOfProducts , getTotalNumberOfCategories ,getLowStockVariantCount } from "../db/dao/productDAO";
import { createProductTemplate, readProductExcel } from "../utils/excel";
import { Product } from "../types/custom_types";
import { getImageById } from "../utils/imgHandler";
import { getLowStockVariants } from "../db/dao/productDAO";

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


export async function generateProductTemplate(supplier_id: string, category: string) {
   return await createProductTemplate(supplier_id, category);
}


// Total no of products

export async function fetchTotalNumberOfProducts() {
   try {
     const result = await getTotalNumberOfProducts();
     return result;
   } catch (error) {
     console.error("Error in getTotalNumberOfProductsService:", error);
     return {
       isSuccess: false,
       data: null,
       msg: "Service layer error while fetching total number of products",
       error,
     };
   }
 }


 //Total catergories

 export async function fetchTotalNumberOfCategories() {
   try {
     const result = await getTotalNumberOfCategories();
     return result;
   } catch (error) {
     console.error("Error in fetchTotalNumberOfCategoriesService:", error);
     return {
       isSuccess: false,
       data: null,
       msg: "Service layer error while fetching total number of categories",
       error,
     };
   }
 }



 //low stock products 

 
export async function fetchLowStockProducts() {
  try { 
    const result = await getLowStockVariants();

    if (result.isSuccess) { 
      return {
        isSuccess: true,
        data: result.data,
        msg: result.msg,
      };
    } else {
      
      return {
        isSuccess: false,
        data: null,
        msg: "Failed to retrieve low stock products.",
        error: result.error,
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      data: null,
      msg: "An unexpected error occurred while retrieving low stock products.",
      error,
    };
  }
}


// low quantity product count

export async function fetchLowStockVariantCount() {
   try {
     const result = await getLowStockVariantCount(); // Call DAO function
 
     if (result.isSuccess) {
       return {
         isSuccess: true,
         data: result.totalLowStock, // Return the count of low-stock variants
         msg: result.msg,
       };
     } else {
       return {
         isSuccess: false,
         data: null,
         msg: result.msg,
         error: result.error,
       };
     }
   } catch (e) {
     console.error("Error in fetchLowStockVariantCount:", e);
     return {
       isSuccess: false,
       data: null,
       msg: "Error processing request.",
       error: e,
     };
   }
 }