import { Router } from "express";
import * as ProductController from "../controllers/ProductController";

const productRrouter = Router();

// const { getClothItems } = require('../controllers/ClothItemController');

productRrouter.get('/', ProductController.doGet);

// module.exports = () => {
//    router.get('/', getClothItems)
// }

export default productRrouter;