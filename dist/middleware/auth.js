"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(401).send('Authentication invalid');
        // throw new Error('Authentication invalid');
    }
    const token = authHeader?.split(' ')[1];
    try {
        const tokenVerified = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        req.user = { ...tokenVerified };
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = auth;
