import { eq } from "drizzle-orm";
import { db } from "..";
import { cartsTable } from "../schema";
import { CartItemInsert, cartItemsTable } from "../schema/Cart";
import { getProductIdByVariantDAO } from "./productDAO";

// Fetch all cart items
export async function getAllitems() {
   try {
      const items = await db.select().from(cartItemsTable);
      return {
         isSuccess: true,
         data: items,
         msg: "Cart items fetched successfully",
         error: ""
      };
   } catch (e) {
      console.log("Error fetching all cart items:", e);
      return {
         isSuccess: false,
         data: null,
         msg: "Couldn't fetch cart items",
         error: e
      };
   }
}

// Insert a new cart item
export async function insertNewCartItem(cartItem: CartItemInsert) {
   try {
      await db.insert(cartItemsTable).values(cartItem);
      return {
         isSuccess: true,
         data: null,
         msg: "Cart item inserted successfully",
         error: ""
      };
   } catch (e) {
      console.log("Error inserting new cart item:", e);
      return {
         isSuccess: false,
         data: null,
         msg: "Couldn't insert cart item to database",
         error: e
      };
   }
}

// Get a cart by user ID
export async function getCartByUserId(user_id: number) {
   try {
      const cart = await db.select()
         .from(cartsTable)
         .where(eq(cartsTable.user_id, user_id));
      
      if (cart.length === 0) {
         return {
            isSuccess: false,
            data: null,
            msg: "No cart found for the user",
            error: null
         };
      }

      return {
         isSuccess: true,
         data: cart[0],
         msg: "Cart fetched successfully",
         error: ""
      };
   } catch (e) {
      console.log("Error fetching cart by user ID:", e);
      return {
         isSuccess: false,
         data: null,
         msg: "Couldn't get cart for user ID",
         error: e
      };
   }
}

// Insert a new cart
export async function insertNewCart(user_id: number) {
   try {
      const cart = await db.insert(cartsTable).values({ user_id }).returning();
      return {
         isSuccess: true,
         data: cart[0],
         msg: "Cart inserted successfully",
         error: ""
      };
   } catch (e) {
      console.log("Error inserting new cart:", e);
      return {
         isSuccess: false,
         data: null,
         msg: "Couldn't insert cart to the database",
         error: e
      };
   }
}

// Get cart items by cart ID
export async function getCartItemsByCartIdA(cartId: number) {
   try {
      const items = await db.select()
         .from(cartItemsTable)
         .where(eq(cartItemsTable.cart_id, cartId));
      
      if (items.length === 0) {
         return {
            isSuccess: false,
            data: null,
            msg: "No items found for the cart",
            error: null
         };
      }

      return {
         isSuccess: true,
         data: items,
         msg: "Cart items fetched successfully",
         error: ""
      };
   } catch (e) {
      console.log("Error fetching cart items by cart ID:", e);
      return {
         isSuccess: false,
         data: null,
         msg: "Couldn't get cart items",
         error: e
      };
   }
}

// Update cart item quantity
export async function updateCartItemQuantity(cart_item_id: number, newQuantity: number) {
   try {
     const result = await db
       .update(cartItemsTable)
       .set({ quantity: newQuantity })
       .where(eq(cartItemsTable.cart_item_id, cart_item_id))
       .returning();
     
     return {
       isSuccess: true,
       data: result[0] || null,
       msg: "Quantity updated successfully",
       error: ""
     };
   } catch (error) {
     console.error("Error updating cart item quantity:", error);
     return {
       isSuccess: false,
       data: null,
       msg: "Error updating cart item quantity",
       error: error
     };
   }
}

// Delete a cart item by its cart_item_id
export async function deleteCartItem(cart_item_id: number) {
   try {
     const result = await db
       .delete(cartItemsTable)
       .where(eq(cartItemsTable.cart_item_id, cart_item_id))
       .returning();
     
     return {
       isSuccess: true,
       data: result.length > 0 ? result[0] : null,
       msg: "Cart item deleted successfully",
       error: ""
     };
   } catch (error) {
     console.error("Error deleting cart item:", error);
     return {
       isSuccess: false,
       data: null,
       msg: "Error deleting cart item",
       error: error
     };
   }
}
export async function addToCartDAO(user_id: number, variant_id: string, quantity: number) {
   try {
       // Get the cart by user ID or create a new one if it doesn't exist
       let cart = await db.select().from(cartsTable).where(eq(cartsTable.user_id, user_id));
       let cart_id = -1;

       if (cart.length > 0) {
           cart_id = cart[0].cart_id;
       } else {
           const newCart = await db.insert(cartsTable).values({ user_id }).returning();
           if (newCart.length > 0) {
               cart_id = newCart[0].cart_id;
           } else {
               return {
                   isSuccess: false,
                   data: null,
                   msg: "Couldn't create a new cart",
                   error: ""
               };
           }
       }

       // Get the product ID by variant ID
       const productIdResult = await getProductIdByVariantDAO(variant_id);
       if (!productIdResult.isSuccess || !productIdResult.data) {
           return productIdResult;
       }

       const product_id = productIdResult.data;

       // Insert the cart item
       const cartResult = await db.insert(cartItemsTable).values({
           cart_id,
           variant_id,
           quantity
       });

       if (cartResult) {
           return {
               isSuccess: true,
               data: null,
               msg: "Cart item added successfully",
               error: ""
           };
       } else {
           return {
               isSuccess: false,
               data: null,
               msg: "Couldn't add cart item",
               error: ""
           };
       }
   } catch (error) {
       console.error("Error in addToCartDAO:", error);
       return {
           isSuccess: false,
           data: null,
           msg: "err to add cart item",
           error: ""
        
       };
   }
}