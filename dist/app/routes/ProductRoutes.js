"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const express_1 = require("express");
const ProductController = __importStar(require("../controllers/ProductController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const path_1 = __importDefault(require("path"));
const productRrouter = (0, express_1.Router)();
// const { getClothItems } = require('../controllers/ClothItemController');
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(path_1.default.resolve(__dirname, '../../'), process.env.EXCEL_UPLOADS));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        //   const filename = uniqueSuffix + path.extname(file.originalname);
        cb(null, uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.mimetype === 'application/vnd.ms-excel') {
            cb(null, true);
        }
        else {
            cb(new Error('Only Excel files are allowed'), false);
        }
    }
});
productRrouter.get('/', authMiddleware_1.passporthMiddleware, (0, authMiddleware_1.authenticate)(['ADMIN']), ProductController.doGet);
productRrouter.post('/', authMiddleware_1.passporthMiddleware, (0, authMiddleware_1.authenticate)(['ADMIN']), upload.single('file'), ProductController.doPost);
// module.exports = () => {
//    router.get('/', getClothItems)
// }
exports.default = productRrouter;
