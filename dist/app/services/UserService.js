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
exports.getUser = exports.verifyUser = exports.addUser = void 0;
const userDAO = __importStar(require("../db/dao/userDAO"));
const hash_1 = require("../utils/hash");
async function addUser({ username, password }) {
    const hash = await (0, hash_1.genPwdHash)(password);
    const result = await userDAO.insert({
        username: username,
        password: hash,
        role: "CUSTOMER"
    });
    if (result.length == 0)
        return false;
    else
        return true;
}
exports.addUser = addUser;
async function verifyUser({ username, password }) {
    const user = await userDAO.getUserByUsername(username);
    if (user == undefined) {
        console.log('incorrect username');
        return {
            isSuccess: false,
            user: null
        };
    }
    else {
        return {
            isSuccess: await (0, hash_1.verifyHash)(password, user.password),
            user: user
        };
    }
}
exports.verifyUser = verifyUser;
async function getUser(userId) {
    return await userDAO.getUserById(userId);
}
exports.getUser = getUser;
