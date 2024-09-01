import ExcelJS from "exceljs";

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
   img_front: ExcelJS.Buffer | null,
   img_rear: ExcelJS.Buffer | null
}

export type AgeGroupType = "adult" | "kids";
export type GenderType = "Male" | "Female" | "Unisex";