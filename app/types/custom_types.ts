import ExcelJS from "exceljs";
// import { Buffer } from "buffer";
export type SizeType = {
   size: string,
   stock_quantity: number,
}


export type VariantType = {
   variant_id: string,
   product_id: string,
   color: string,
   design: string,
   price: number,
   stock_quantity: number,
   description: string,
   createdAt: DataView,
   updatedAt: DataView,
   sizes: {
      size: string,
      stock_quantity: number,
   }[],
   img_front: {
      file: ExcelJS.Buffer | null
      name: string
   },
   img_rear: {
      file: ExcelJS.Buffer | null,
      name: string
   } | null
}


export type Product = {
   product_id: string,
   name: string,
   supplier: string,
   category: string,
   gender: "Male" | "Female" | "Unisex",
   ageGroup: "adult" | "kids",
   price: string,
   variants: VariantType[],
};


export type AgeGroupType = "adult" | "kids";
export type GenderType = "Male" | "Female" | "Unisex";


//order distribution(update status)
export type StatusType = "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Completed";

