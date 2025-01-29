import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "..";
import {
  categoriesTable,
  measurementTypesTable,
  productsTable,
  productVariantsTable,
  sizeChartsTable,
  sizesTable,
  sizeStocksTable,
} from "../schema/Product";
import { error } from "console";
import { Product } from "../../types/custom_types";
import { uploadProductImgs } from "../../utils/imgHandler";
import { inventoriesTable } from "../schema";

export async function getAllProducts() {
  try {
    // const result = await db.query.productsTable.findMany();
    const result = await db.select({
      product_id: productsTable.product_id,
      name: productVariantsTable.name,
      price: productVariantsTable.price,
      stock_quantity: inventoriesTable.stock_quantity,
      status: inventoriesTable.status
    })
    .from(productsTable)
    .innerJoin(productVariantsTable, eq(productsTable.product_id, productVariantsTable.product_id))
    .innerJoin(inventoriesTable, eq(productsTable.product_id, inventoriesTable.product_id));
    
    return {
      isSuccess: true,
      data: result,
      msg: "Products retrieved successfully",
      error: null
    }
  }
  catch(e) {
    return {
      isSuccess: false,
      data: null,
      msg: "Couldn't get products from database.",
      error: e
    }
  }
}

export async function queryProducts(prompt: string) {
  try {
    let products;

    if (prompt.trim() === "") {
      // Fetch all products if the prompt is empty
      products = await db
        .select({
          ...getTableColumns(productVariantsTable),
        })
        .from(productVariantsTable)
    } else {
      // Fetch filtered products based on the prompt
      products = await db
        .select({
          ...getTableColumns(productVariantsTable),
          rank: sql`ts_rank(searchable_text, websearch_to_tsquery('english', ${prompt}))`,
        })
        .from(productVariantsTable)
        .where(sql`searchable_text @@ websearch_to_tsquery('english', ${prompt})`)
        .orderBy((t) => desc(t.rank));
    }

    return {
      isSuccess: true,
      data: products,
      msg: "Products queried successfully from database.",
      error: null,
    };
  } catch (e) {
    return {
      isSuccess: false,
      data: null,
      msg: "Error executing query to get products from database.",
      error: e,
    };
  }
}


export async function insertProduct(product: Product) {
  try {
    await db.transaction(async (tx) => {
      await tx
        .insert(categoriesTable)
        .values({category_type: product.category})
        .onConflictDoNothing();

      await tx
        .insert(productsTable)
        .values({
          product_id: product.product_id,
          supplier: product.supplier,
          category: product.category,
          gender: product.gender,
          age_group: product.ageGroup,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .onConflictDoNothing();

      for (const variant of product.variants) {
        await tx
          .insert(productVariantsTable)
          .values({
            variant_id: variant.variant_id,
            product_id: product.product_id,
            name: product.name,
            color: variant.color,
            design: variant.design,
            description: variant.description,
            img_front: variant.variant_id,
            price: product.price,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .onConflictDoNothing();

        for (const sizeObj of variant.sizes) {
          await tx
            .insert(sizeStocksTable)
            .values({
              variant_id: variant.variant_id,
              size: sizeObj.size,
              quantity: sizeObj.stock_quantity,
            })
            .onConflictDoNothing();
        }
      }

      // for (const variant of product.variants) {
      //   await tx
      //     .update(productVariantsTable)
      //     .set({
      //       img_front: variant.variant_id,
      //       img_back: variant.img_rear ? variant.img_rear.name : "",
      //     })
      //     .where(eq(productVariantsTable.variant_id, variant.variant_id));
      // }

      // await uploadProductImgs(product);
    });

    return {
      isSuccess: true,
      msg: "Product added successfully.",
      error: "",
    };
  } catch (e) {
    return {
      isSuccess: false,
      msg: "Error inserting product to databse.",
      error: e,
    };
  }
}


export async function queryVariantById(variant_id: string) {
  try {
    const variant = await db
      .select()
      .from(productVariantsTable)
      .where(eq(productVariantsTable.variant_id, variant_id));

    return {
      isSuccess: true,
      data: variant[0],
      msg: "",
      error: "",
    };
  } catch (e) {
    return {
      isSuccess: false,
      data: null,
      msg: "Couldn't get variant from database.",
      error: e,
    };
  }
}
export async function getProductDetailsByVariantId(variant_id: string) {
  try {
    // Select specific columns from the productVariantsTable
    const variant = await db
      .select({
        name: productVariantsTable.name,
        color: productVariantsTable.color,
        price: productVariantsTable.price,
        description: productVariantsTable.description,
      })
      .from(productVariantsTable)
      .where(eq(productVariantsTable.variant_id, variant_id));

    // Return the result
    return {
      isSuccess: true,
      data: variant[0] || null, // Ensure to handle the case where no data is returned
      msg: "",
      error: "",
    };
  } catch (e) {
    return {
      isSuccess: false,
      data: null,
      msg: "Couldn't get variant from database.",
      error: e,
    };
  }
}

export async function getProductIdByVariantDAO(variant_id: string) {
  try {
    const variant = await db
      .select({
        product_id: productVariantsTable.product_id,
      })
      .from(productVariantsTable)
      .where(eq(productVariantsTable.variant_id, variant_id))
      .limit(1);

    if (variant.length > 0) {
      return {
        isSuccess: true,
        data: variant[0].product_id,
        msg: "Product ID fetched successfully",
        error: "",
      };
    } else {
      return {
        isSuccess: false,
        data: null,
        msg: "Product ID not found for the given variant ID",
        error: "",
      };
    }
  } catch (error) {
    console.log("Error fetching product ID by variant ID:", error);
    return {
      isSuccess: false,
      data: null,
      msg: "Couldn't fetch product ID",
      error: error,
    };
  }
}

export async function selectCategories() {
  try {
    const result = await db.query.categoriesTable.findMany();
    
    return {
      isSuccess: true,
      data: result,
      msg: "Products retrieved successfully",
      error: null
    }
  }
  catch(e) {
    return {
      isSuccess: false,
      data: null,
      msg: "Couldn't get products from database.",
      error: e
    }
  }
}
