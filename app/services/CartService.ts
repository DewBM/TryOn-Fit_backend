import { getCartByUserId, insertNewCart, insertNewCartItem, getAllitems, updateCartItemQuantity, deleteCartItem } from "../db/dao/cartDAO";
import { getCartItemsByCartIdA, addToCartDAO } from "../db/dao/cartDAO";
import { getProductsbyVariant } from "./ProductService";
import { updateIncart } from "./InventoryService";

export const getCartitems = () => {
   return getAllitems();
};

export async function getCartItemsByCartId(cartId: number) {
   return await getCartItemsByCartIdA(cartId);
}

export async function getCart(userId: number) {
   return await getCartByUserId(userId);
}

export async function updateCartItemQuantityService(cart_item_id: number, newQuantity: number) {
   return await updateCartItemQuantity(cart_item_id, newQuantity);
}

export async function deleteCartItemService(cart_item_id: number) {
   return await deleteCartItem(cart_item_id);
}


export async function addToCartService(user_id: number, variant_id: string, quantity: number) {
    return await addToCartDAO(user_id, variant_id, quantity);
}
