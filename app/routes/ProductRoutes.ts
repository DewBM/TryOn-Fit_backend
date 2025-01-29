import multer from 'multer';
import { Router } from "express";
import * as ProductController from "../controllers/ProductController";
import { authenticate, passporthMiddleware } from "../middleware/authMiddleware";
import path from 'path';


const productRrouter = Router();

// const { getClothItems } = require('../controllers/ClothItemController');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, path.join(path.resolve(__dirname, '../../'), process.env.EXCEL_UPLOADS!));
   },
   filename: function (req, file, cb) {
     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
   //   const filename = uniqueSuffix + path.extname(file.originalname);
     cb(null, uniqueSuffix + path.extname(file.originalname));
   }
 });
 
 const upload = multer({
   storage: storage,
   fileFilter: function (req, file, cb) {
     if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
         file.mimetype === 'application/vnd.ms-excel') {
       cb(null, true);
     } else {
       cb(new Error('Only Excel files are allowed') as any, false);
     }
   }
 });

productRrouter.get('/', passporthMiddleware, authenticate(['SK']), ProductController.doGet);
productRrouter.post('/', passporthMiddleware, authenticate(['SK']), upload.single('file'), ProductController.doPost);
productRrouter.post('/excel_template', passporthMiddleware, authenticate(['SK']), ProductController.getProductTemplate);
// module.exports = () => {
//    router.get('/', getClothItems)
// }
productRrouter.get('getProductFrontImageByVariants', passporthMiddleware,  ProductController.getProductFrontImageByVariants);
export default productRrouter;