import { getInvItemById, insertNewInvItem, updateStock } from "../db/dao/inventoryDAO";
import { InventoryInsert } from "../db/schema/Inventory";

export async function reStock(product_id: string, update_amount: number) {
   const item = await getInvItemById(product_id);
   if (item) {
      const new_quantity = item.stock_quantity + update_amount;
      return await updateStock(product_id, new_quantity);
   }
   else {
      return {
         isSuccess: false,
         msg: "",
         error: "Inventory item or stock quantity is null."
      };
   }
}


export async function createStock(item: InventoryInsert) {
   return await insertNewInvItem(item);
}