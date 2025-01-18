import { Request, Response } from "express";
import * as CartService from "../services/CartService";
import { getProductsbyVariant } from "../services/ProductService";
import {
  updateCartItemQuantityService,
  deleteCartItemService,
  addToCartService,
} from "../services/CartService";
import { error } from "console";
import crypto from "crypto";
import { getCustomerId } from "../services/CustomerService";
import { getAddress } from "../services/AddressService";

// export async function doGet(req: Request, res: Response) {
//   const userId = req.user?.userId;

//    console.log(userId);
//   if (!userId || typeof userId !== "number") {
//     return res.status(400).json({
//       isSuccess: false,
//       msg: "Invalid or missing User ID.",
//     });
//   }


//   const cartResult = await CartService.getCart(userId);

//   if (!cartResult.isSuccess || !cartResult.data) {
//     return res.status(400).json({ isSuccess: false, msg: "Cart not found" });
//   }

//   const cartId = cartResult.data.cart_id;

//   const itemsResult = await CartService.getCartItemsByCartId(cartId);
//   console.log("result " ,itemsResult);

//   if (!itemsResult.isSuccess || !itemsResult.data) {
//     return res.status(400).json({ isSuccess: false, msg: "Cart items not found" });
//   }

//   const cartItems = itemsResult.data;

//   return res.status(200).json({
//     isSuccess: true,
//     data: cartItems,
//   });
// }

export async function doGet(req: Request, res: Response) {
  try {
    const userId = req.user?.userId;

    if (!userId || typeof userId !== "number") {
      return res.status(400).json({
        isSuccess: false,
        msg: "Invalid or missing User ID.",
      });
    }

    // Fetch customer ID using the userId
    const customerId = await getCustomerId(userId);

   
 

    if (!customerId) {
      return res.status(404).json({
        isSuccess: false,
        msg: "Customer not found for the given User ID.",
      });
    }
    const address = await getAddress(customerId);
    if (!address) {
      return res.status(404).json({
        isSuccess: false,
        msg: "Address not found for the given Customer ID.",
      });
    }
    // Fetch the cart based on userId
    const cartResult = await CartService.getCart(userId);

    if (!cartResult.isSuccess || !cartResult.data) {
      return res.status(400).json({ isSuccess: false, msg: "Cart not found" });
    }

    const cartId = cartResult.data.cart_id;

    // Fetch the cart items based on cartId
    const itemsResult = await CartService.getCartItemsByCartId(cartId);

    if (!itemsResult.isSuccess || !itemsResult.data) {
      return res
        .status(400)
        .json({ isSuccess: false, msg: "Cart items not found" });
    }

    const cartItems = itemsResult.data;

    // Return customer ID, cart items, and other relevant data
    return res.status(200).json({
      isSuccess: true,
      customerId,
      address,
      cartItems,
    });
  } catch (error) {
    console.error("Error in doGet:", error);
    return res.status(500).json({
      isSuccess: false,
      msg: "Internal server error.",
    });
  }
}

export async function doPut(req: Request, res: Response) {
  const { cart_item_id, quantity } = req.body;

  if (typeof cart_item_id !== "number" || typeof quantity !== "number") {
    return res.status(400).json({ isSuccess: false, msg: "Invalid input" });
  }

  // Call the service function to update the cart item quantity
  const result = await updateCartItemQuantityService(cart_item_id, quantity);

  if (result.isSuccess) {
    return res.status(200).json(result);
  } else {
    return res.status(500).json(result);
  }
}

export async function doDel(req: Request, res: Response) {
  const { cart_item_id } = req.body;

  // Validate that cart_item_id is a number
  if (typeof cart_item_id !== "number" || isNaN(cart_item_id)) {
    return res
      .status(400)
      .json({ isSuccess: false, msg: "Invalid cart item ID" });
  }

  // Call the service function to delete the cart item
  const result = await deleteCartItemService(cart_item_id);

  if (result.isSuccess) {
    return res.status(200).json(result);
  } else {
    return res.status(500).json(result);
  }
}

export async function doPost(req: Request, res: Response) {
  const { user_id, variant_id, quantity } = req.body;

  if (!user_id || !variant_id || !quantity) {
    return res.status(400).json({ isSuccess: false, msg: "Invalid input" });
  }

  const result = await addToCartService(user_id, variant_id, quantity);

  if (result.isSuccess) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
}


