import { Request, Response } from "express";
import * as CartService from "../services/CartService";
import { getProductsbyVariant } from "../services/ProductService";
import {
  updateCartItemQuantityService,
  deleteCartItemService,
  addToCartService,
} from "../services/CartService";
import { error } from "console";

export async function doGet(req: Request, res: Response) {
  const userId = req.user?.userId;

  if (!userId || typeof userId !== "number") {
    return res
      .status(400)
      .json({
        isSuccess: false,
        msg: "Invalid or missing User ID.",
        error: null,
      });
  }

  // Fetch the cart by userId
  const cartResult = await CartService.getCart(userId);
  console.log("Cart Result:", cartResult); // Log cart result

  if (!cartResult.isSuccess) {
    return res
      .status(400)
      .json({ isSuccess: false, msg: "Cart not found", error: null });
  }

  const cartId = cartResult.data?.cart_id;
  if (!cartId) {
    return res
      .status(400)
      .json({ isSuccess: false, msg: "Cart ID not found", error: null });
  }

  // Fetch cart items using cartId
  const itemsResult = await CartService.getCartItemsByCartId(cartId);
  console.log("Cart Items Result:", itemsResult); // Log cart items result

  if (!itemsResult.isSuccess || !itemsResult.data) {
    return res
      .status(400)
      .json({ isSuccess: false, msg: "Cart items not found", error: null });
  }

  const cartItems = itemsResult.data;
  const variantIds = cartItems.map((item: any) => item.variant_id);

  // Fetch variant details for each variant_id
  const variantDetailsPromises = variantIds.map((variant_id: string) =>
    getProductsbyVariant(variant_id)
  );
  const variantDetailsResults = await Promise.all(variantDetailsPromises);

  console.log("Variant Details Results:", variantDetailsResults); // Log variant details results

  // Create a map of variant details indexed by variant_id
  const variantDetailsMap = new Map<string, any>(
    variantDetailsResults
      .filter((result: any) => result.isSuccess && result.data)
      .map((result: any) => [result.data.variant_id, result.data])
  );

  console.log("Variant Details Map:", variantDetailsMap);
  // Combine cart items with their corresponding variant details
  const itemsWithDetails = cartItems.map((item: any) => {
    const variantDetail = variantDetailsMap.get(item.variant_id) || {};
    return {
      ...item,
      ...variantDetail,
    };
  });

  console.log("Items with Details:", itemsWithDetails); // Log final items with details
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
