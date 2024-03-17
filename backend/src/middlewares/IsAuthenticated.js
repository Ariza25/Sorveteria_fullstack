"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authToken = req.headers.authorization;
        if (!authToken) {
            return res.status(401).json({ error: "Token missing" });
        }
        const parts = authToken.split(" ");
        if (parts.length !== 2) {
            return res.status(401).json({ error: "Token error" });
        }
        const [scheme, token] = parts;
        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ error: "Token malformatted" });
        }
        try {
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error("JWT_SECRET is not defined");
            }
            const { sub } = (0, jsonwebtoken_1.verify)(token, secret);
            req.user = sub;
            next();
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            else if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                return res.status(401).json({ error: 'Token expired' });
            }
            else {
                return res.status(401).json({ error: 'Token invalid' });
            }
        }
    });
}
exports.isAuthenticated = isAuthenticated;
