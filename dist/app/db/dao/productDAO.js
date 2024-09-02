"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryVariantById = exports.insertProduct = exports.queryProducts = exports.getAllProducts = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const __1 = require("..");
const Product_1 = require("../schema/Product");
async function getAllProducts() {
    return __1.db.query.productsTable.findMany();
}
exports.getAllProducts = getAllProducts;
async function queryProducts(prompt) {
    return await __1.db
        .select({ ...(0, drizzle_orm_1.getTableColumns)(Product_1.productVariantsTable),
        rank: (0, drizzle_orm_1.sql) `ts_rank(searchable_text, websearch_to_tsquery('english', ${prompt}))`
    })
        .from(Product_1.productVariantsTable)
        .where((0, drizzle_orm_1.sql) `searchable_text @@ websearch_to_tsquery('english', ${prompt})`)
        // .orderBy(sql`ts_rank(searchable_text, websearch_to_tsquery('english', ${prompt}))`);
        .orderBy(t => (0, drizzle_orm_1.desc)(t.rank));
}
exports.queryProducts = queryProducts;
async function insertProduct(product) {
    try {
        await __1.db.transaction(async (tx) => {
            await tx.insert(Product_1.categoriesTable).values({ category_type: product.category }).onConflictDoNothing();
            await tx.insert(Product_1.productsTable).values({
                product_id: product.product_id,
                supplier: product.supplier,
                category: product.category,
                gender: product.gender,
                age_group: product.ageGroup,
                createdAt: new Date(),
                updatedAt: new Date()
            })
                .onConflictDoNothing();
            const sizes = product.variant.sizes;
            for (const sizeObj of sizes) {
                for (const measurement of sizeObj.measurements) {
                    await tx.insert(Product_1.measurementTypesTable).values({
                        measurement_type: measurement.measurement_type
                    })
                        .onConflictDoNothing();
                    await tx.insert(Product_1.sizeChartsTable).values({
                        supplier: product.supplier,
                        size: sizeObj.size,
                        category: product.category,
                        measurement: measurement.measurement_type,
                        value_min: measurement.value_min,
                        value_max: measurement.value_max
                    })
                        .onConflictDoUpdate({
                        target: [Product_1.sizeChartsTable.supplier, Product_1.sizeChartsTable.size, Product_1.sizeChartsTable.measurement, Product_1.sizeChartsTable.category],
                        set: { value_min: measurement.value_min, value_max: measurement.value_max }
                    });
                }
                await tx.insert(Product_1.productVariantsTable).values({
                    variant_id: product.variant.variant_id,
                    product_id: product.product_id,
                    size: sizeObj.size,
                    name: product.name,
                    color: product.variant.color,
                    design: product.variant.design,
                    description: product.variant.description,
                    price: sizeObj.price,
                    stock_quantity: sizeObj.stock_quantity,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                    .onConflictDoNothing();
            }
        });
        return {
            isSuccess: true,
            msg: "Product added successfully.",
            error: ""
        };
    }
    catch (e) {
        return {
            isSuccess: false,
            msg: "Error inserting product to databse.",
            error: e
        };
    }
}
exports.insertProduct = insertProduct;
async function queryVariantById(variant_id) {
    try {
        const variant = await __1.db
            .select()
            .from(Product_1.productVariantsTable)
            .where((0, drizzle_orm_1.eq)(Product_1.productVariantsTable.variant_id, variant_id));
        return {
            isSuccess: true,
            data: variant[0],
            msg: "",
            error: ""
        };
    }
    catch (e) {
        return {
            isSuccess: false,
            data: null,
            msg: "Couldn't get variant from database.",
            error: e
        };
    }
}
exports.queryVariantById = queryVariantById;
