import { getCartByUserId, insertNewCart, insertNewCartItem } from "../db/dao/cartDAO";

export async function addToCart(user_id: number, variant_id: string, quantity: number) {
   let cart = await getCartByUserId(user_id);
   let cart_id = -1;
   if (cart.isSuccess && cart.data!=undefined)
      cart_id = cart.data.cart_id;
   else {
      cart = await insertNewCart(user_id);
      if (cart.isSuccess && cart.data!=undefined)
         cart_id = cart.data.cart_id;

      return await insertNewCartItem({
         cart_id: cart_id,
         variant_id: variant_id,
         quantity: quantity
      });
   }
}