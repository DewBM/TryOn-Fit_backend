import { varbinary } from "drizzle-orm/mysql-core";
import { supabase } from "../db";
import { Product } from "../types/custom_types";

const PRODUCT_BUCKET = "product_images";

export async function uploadProductImgs(product: Product) {

  const uploaded = [];

  for (const variant of product.variants) {
    if (variant.img_front.file) {
      const { data, error } = await supabase.storage
        .from(PRODUCT_BUCKET)
        .upload(variant.img_front.name, variant.img_front.file, {
          contentType: "image/png",
        });
    
      if (error) {
        rollBackUploaded(uploaded);
        throw error;
      }
      else if (data)
        uploaded.push(data.path);
    }

    if (variant.img_rear && variant.img_rear.file) {
      const { data, error } = await supabase.storage
        .from(PRODUCT_BUCKET)
        .upload(variant.img_rear.name, variant.img_rear.file, {
          contentType: "image/png",
        });
    
      if (error) {
        rollBackUploaded(uploaded);
        throw error;
      }
      else if (data)
        uploaded.push(data.path);
    }
  }
}



export async function getImageById(image_id: string) {
  const { data } = supabase.storage.from(PRODUCT_BUCKET).getPublicUrl(image_id)
  if (!data.publicUrl)
    return null;
  else
    return data.publicUrl
}



async function rollBackUploaded(uploaded: string[]) {
  if (uploaded.length==0)
    return;
  const { data, error } = await supabase
    .storage
    .from(PRODUCT_BUCKET)
    .remove(uploaded);

  if (error) 
    console.log("Error deleteing images on rollback: ", error);
}