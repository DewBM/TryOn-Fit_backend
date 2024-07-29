import { getCartByUserId, insertNewCart, insertNewCartItem } from "../db/dao/cartDAO";
import { updateIncart } from "./InventoryService";
import { getVariantById } from "./ProductService";

export async function addToCart(user_id: number, variant_id: string, quantity: number) {
   let cart = await getCartByUserId(user_id);
   let cart_id = -1;
   if (cart.isSuccess && cart.data!=undefined)
      cart_id = cart.data.cart_id;
   else {
      cart = await insertNewCart(user_id);
      if (cart.isSuccess && cart.data!=undefined)
         cart_id = cart.data.cart_id;
      else
         return cart;
   }

   const cartResult = await insertNewCartItem({
      cart_id: cart_id,
      variant_id: variant_id,
      quantity: quantity
   });

   if (cartResult.isSuccess) {
      const variatRes = await getVariantById(variant_id);
      if (variatRes.isSuccess && variatRes.data!=undefined)
         return await updateIncart(variatRes.data.product_id, quantity);

      return variatRes;
   }
   else
      return cartResult;
}