"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("reflect-metadata");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
// require('./utils/generateSecretKey'); // Ensure secret key is generated
const app = (0, express_1.default)();
(0, dotenv_1.config)({ path: '.env' });
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({ credentials: true, origin: ['http://localhost:3000'] }));
const ProductRoutes_1 = __importDefault(require("./routes/ProductRoutes"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
app.use('/products', ProductRoutes_1.default);
app.use('/auth', AuthRoutes_1.default);
const EmployeeRoutes_1 = __importDefault(require("./routes/EmployeeRoutes"));
app.use('/employee', EmployeeRoutes_1.default);
const SupplierRoutes_1 = __importDefault(require("./routes/SupplierRoutes"));
app.use('/supplier', SupplierRoutes_1.default);
const InquiryFormRoutes_1 = __importDefault(require("./routes/InquiryFormRoutes"));
app.use('/inquiryform', InquiryFormRoutes_1.default);
exports.default = app;
