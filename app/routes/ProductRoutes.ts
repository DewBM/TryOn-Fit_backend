import { Router } from "express";
import * as ProductController from "../controllers/ProductController";
import { authenticate, passporthMiddleware } from "../middleware/authMiddleware";

const productRrouter = Router();

// const { getClothItems } = require('../controllers/ClothItemController');

productRrouter.get('/', passporthMiddleware, authenticate(['ADMIN']), ProductController.doGet);
productRrouter.post('/', passporthMiddleware, authenticate(['ADMIN']), ProductController.doPost);
// module.exports = () => {
//    router.get('/', getClothItems)
// }

export default productRrouter;