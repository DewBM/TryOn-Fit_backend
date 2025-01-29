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
export type storeManagerDashboardTypes = {
   totalEmployees: number,
   totalProducts: number,
   totalSuppliers: number,
   revenue: number,
}


// types/custom_types.ts

export type Payment = {
   payment_id: string;  // Unique identifier for the payment
   user_id: number;     // ID of the user making the payment
   order_id: string;    // ID of the order being paid for
   amount: number;      // Payment amount (in the appropriate currency)
   payment_method: string;  // Method of payment (e.g., 'credit_card', 'paypal')
   payment_status: string;  // Status of the payment (e.g., 'completed', 'pending')
   createdAt: Date;         // Timestamp when the payment was created
   updatedAt: Date;         // Timestamp when the payment was last updated
 }
 


export type filterDateType = {
   startDate : Date;
   endDate : Date;
};


export type AgeGroupType = "adult" | "kids";
export type GenderType = "Male" | "Female" | "Unisex";


//order distribution(update status)
export type StatusType = "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Completed";

