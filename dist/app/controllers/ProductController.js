"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doPost = exports.doGet = void 0;
const excel_1 = require("../utils/excel");
const path_1 = __importDefault(require("path"));
// import * as ProductService from '../services/ProductService';
async function doGet(req, res) {
    const param = await req.query.search;
    if (param) {
        // const result = await ProductService.searchProducts(param);
        // res.status(200).json(result);
    }
    else {
        // const data = await ProductService.getProducts();
        // console.log(data);
        // res.status(200).send(data);
    }
}
exports.doGet = doGet;
async function doPost(req, res) {
    const { supplier, category } = req.body;
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    const product = await (0, excel_1.readProductExcel)(path_1.default.join(process.env.EXCEL_UPLOADS, req.file.filename));
    console.log(product);
    res.status(200).send();
    // const result = await ProductService.createProduct(data);
    // if (result.isSuccess)
    //    res.status(200).json(result);
    // else {
    //    console.log('Product insert error: ', result);
    //    res.status(400).json({isSuccess: result.isSuccess, msg: result.msg});
    // }
}
exports.doPost = doPost;
