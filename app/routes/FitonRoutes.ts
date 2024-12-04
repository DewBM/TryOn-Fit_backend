import { Router } from "express";
import { passporthMiddleware } from "../middleware/authMiddleware";
import * as FitonController from '../controllers/FitonController';
import { upload } from "../middleware/multerMiddleware";

const FitonRouter = Router();

FitonRouter.post('/user', passporthMiddleware, upload.single('image'), FitonController.userImageUpload);
FitonRouter.post('/', passporthMiddleware, FitonController.fiton);

export default FitonRouter;