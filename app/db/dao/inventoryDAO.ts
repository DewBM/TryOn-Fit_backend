import { eq } from "drizzle-orm";
import { db } from "..";
import { inventoriesTable, InventoryInsert } from "../schema/Inventory";

export async function insertNewInvItem(item: InventoryInsert) {
   try {
      await db.insert(inventoriesTable).values(item);
      return {
         isSuccess: true,
         msg: "New inventory item added successfully",
         error: ""
      };
   }
   catch (e) {
      console.log(e);
      return {
         isSuccess: false,
         msg: "Error inserting inventory item to database.",
         error: e
      }
   };
}


export async function updateStock(product_id: string, new_quantity: number) {
   try {
      await db.update(inventoriesTable)
         .set({stock_quantity: new_quantity})
         .where(eq(inventoriesTable.product_id, product_id));
      
         return {
            isSuccess: true,
            msg: "Inventory item quantity updated successfully",
            error: ""
         };
   }
   catch (e) {
      console.log(e);
      return {
         isSuccess: false,
         msg: "Couldn't update inventory item quantity.",
         error: e
      };
   } 
}


export async function getInvItemById(product_id: string) {
   try {
      let item = await db.select()
      .from(inventoriesTable)
      .where(eq(inventoriesTable.product_id, product_id));

      return item[0];
   }
   catch (e) {
      console.log(e);
      return null;
   }
}


/**
 * 
 * @param product_id 
 * @param status : -1 if Unavailable, 0 is Low Stock, 1 is Available
 * @returns 
 */
export async function updateStockStatus(product_id: string, status: number) {
   try {
      await db.update(inventoriesTable)
         .set({status: status==-1? 'Unavailable' : status==0? 'Low Stock' : 'Available'})
         .where(eq(inventoriesTable.product_id, product_id));

      return {
         isSuccess: true,
         msg: "Inventory status updated successfully.",
         error: ""
      }
   }
   catch(e) {
      console.log(e);
      return {
         isSuccess: false,
         msg: "Couldn't update inventory item status",
         error: e
      };
   }
}