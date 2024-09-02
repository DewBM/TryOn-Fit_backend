"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
console.log('generating key');
console.log(__dirname);
const generateSecretKey = () => {
    return crypto_1.default.randomBytes(64).toString('hex');
};
const envFilePath = path_1.default.join(__dirname, '/.env');
// const envFilePath = '/.env';
if (!fs_1.default.existsSync(envFilePath)) {
    const secretKey = generateSecretKey();
    fs_1.default.writeFileSync(envFilePath, `SECRET_KEY=${secretKey}\n`);
}
else {
    const envFileContent = fs_1.default.readFileSync(envFilePath, 'utf-8');
    const secretKey = generateSecretKey();
    fs_1.default.appendFileSync(envFilePath, `SECRET_KEY=${secretKey}\n`);
}
