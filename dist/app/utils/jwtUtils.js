"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieExtracotr = exports.generateJWT = exports.secretKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
exports.secretKey = crypto_1.default.randomBytes(64).toString('hex');
const generateJWT = (user) => {
    const payload = {
        iat: Date.now(),
        sub: user.userId,
        username: user.username,
        // email: user.email,
        // role: user.role
    };
    return jsonwebtoken_1.default.sign(payload, exports.secretKey, { expiresIn: '1h', algorithm: 'HS256' });
};
exports.generateJWT = generateJWT;
function cookieExtracotr(req) {
    if (req && req.cookies) {
        return req.cookies['access-token'];
    }
    else
        return null;
}
exports.cookieExtracotr = cookieExtracotr;
