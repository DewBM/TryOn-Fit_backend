import FastAPIClient from '../external/fastapiClient'
import { getImageById } from '../utils/imgHandler';
import * as ProductService from './ProductService'

export async function processUserImage(user_id: number, fileBuffer: Buffer, filename: string) {
    return await FastAPIClient.uploadUserImage(user_id, fileBuffer, filename);
}


export async function fitonGarment(user_id: string, variant_id: number) {
    const result = await ProductService.getVariantById(String(variant_id));

    if (!result.isSuccess)
        return result;

    const variant = result.data;
    if (variant==null) 
        return {
            isSuccess: false,
            msg: "Couldn't get variant by id",
            error: "Couldn't get variant by id"
        }

    const img_id = variant.img_front;
    if (img_id==null) 
        return {
            isSuccess: false,
            msg: "Couldn't find image for given variant",
            error: "Image is null for variant."
        }

    const publicUrl = await getImageById(img_id);
    if (publicUrl!=null) {
        return await FastAPIClient.generateFiton(user_id, publicUrl);
    }
}