"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVariantById = exports.createProduct = exports.searchProducts = exports.getProducts = void 0;
const productDAO_1 = require("../db/dao/productDAO");
const getProducts = () => {
    return (0, productDAO_1.getAllProducts)();
};
exports.getProducts = getProducts;
const searchProducts = async (prompt) => {
    const result = await (0, productDAO_1.queryProducts)(prompt);
    console.log(result);
    return result;
};
exports.searchProducts = searchProducts;
const createProduct = async (product) => {
    return await (0, productDAO_1.insertProduct)(product);
};
exports.createProduct = createProduct;
async function getVariantById(variant_id) {
    return await (0, productDAO_1.queryVariantById)(variant_id);
}
exports.getVariantById = getVariantById;
