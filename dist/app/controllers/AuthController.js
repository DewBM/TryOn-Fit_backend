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
Object.defineProperty(exports, "__esModule", { value: true });
exports.doSignin = exports.doSignup = void 0;
const UserService = __importStar(require("../services/UserService"));
const jwtUtils = __importStar(require("../utils/jwtUtils"));
async function doSignup(req, res) {
    const body = await req.body;
    console.log(body);
    const result = await UserService.addUser(body);
    if (result)
        res.status(200).send({ isSuccess: true, msg: 'signup successful' });
    else
        res.status(409).send({ isSuccess: false, msg: 'username already exists.' });
}
exports.doSignup = doSignup;
async function doSignin(req, res) {
    const body = req.body;
    const { isSuccess, user } = await UserService.verifyUser(body);
    if (isSuccess && user) {
        const token = jwtUtils.generateJWT(user);
        res.cookie('access-token', token, { httpOnly: true, sameSite: 'lax', secure: true, maxAge: 1000 * 60 * 60 });
        res.status(200).json({ isSuccess: true, msg: 'login successfull', role: user.role });
    }
    else
        res.status(401).send({ isSuccess: false, msg: 'incorrect username or password' });
}
exports.doSignin = doSignin;
