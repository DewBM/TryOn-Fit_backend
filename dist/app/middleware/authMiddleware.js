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
exports.authenticate = exports.passporthMiddleware = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = __importDefault(require("passport"));
const jwtUtils_1 = require("../utils/jwtUtils");
const UserService = __importStar(require("../services/UserService"));
const options = {
    // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    jwtFromRequest: jwtUtils_1.cookieExtracotr,
    secretOrKey: jwtUtils_1.secretKey,
    algorithms: ['HS256']
};
passport_1.default.use(new passport_jwt_1.Strategy(options, async (jwtPayload, done) => {
    try {
        const user = await UserService.getUser(jwtPayload.sub);
        if (user)
            return done(null, user);
        else
            return done(null, false);
    }
    catch (error) {
        return done(error, false);
    }
}));
exports.passporthMiddleware = passport_1.default.authenticate('jwt', { session: false });
const authenticate = (roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (user && roles.includes(user.role))
            return next();
        else
            return res.status(401).json({ isSuccess: false, msg: 'Access forbidden: insufficient rights' });
    };
};
exports.authenticate = authenticate;
