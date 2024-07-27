import { eq } from "drizzle-orm";
import { db } from "..";
import { cartsTable } from "../schema";
import { CartItemInsert, cartItemsTable } from "../schema/Cart";


export async function insertNewCartItem(cartItem: CartItemInsert) {
   try {
      await db.insert(cartItemsTable).values(cartItem);
      return {
         isSuccess: true,
         msg: "Cart item inserted successfully",
         error: ""
      };
   }
   catch (e) {
      console.log(e);
      return {
         isSuccess: false,
         msg: "Couldn't insert cart item to database",
         error: e
      };
   }
}


export async function getCartByUserId(user_id: number) {
   try {
      let cart = await db.select()
         .from(cartsTable)
         .where(eq(cartsTable.user_id, user_id));

      return {
         isSuccess: true,
         data: cart[0],
         msg: "",
         error: ""
      };
   }
   catch (e) {
      console.log(e);
      return {
         isSuccess: false,
         data: null,
         msg: "Couldn't get cart for user id",
         error: e
      };
   }
}


export async function insertNewCart(user_id: number) {
   try {
      const cart = await db.insert(cartsTable).values({user_id: user_id}).returning();
      return {
         isSuccess: true,
         data: cart[0],
         msg: "Cart inserted successfully",
         error: ""
      };
   }
   catch (e) {
      console.log(e);
      return {
         isSuccess: false,
         data: null,
         msg: "Couldn't insert cart to the database",
         error: e
      };
   }
}