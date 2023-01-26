"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.loginUser = exports.registerUser = exports.getAllUsers = void 0;
const User_1 = require("../models/User");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user = new User_1.UserModel();
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await user.index();
        res.json(allUsers);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
exports.getAllUsers = getAllUsers;
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = await user.create({ username, password });
        const token = user.createJWT(newUser.id, newUser.username);
        res.json({ token, username: newUser.username, id: newUser.id });
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new Error('Please provide all values');
    }
    try {
        const createdUser = await user.authenticateUser(username, password);
        const token = user.createJWT(createdUser.id, createdUser.username);
        res.json({
            token,
            username: createdUser.username,
            id: createdUser.id
        });
    }
    catch (error) {
        res.status(400);
        next(error);
    }
};
exports.loginUser = loginUser;
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await user.delete(req.params.id);
        res.json(deletedUser);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
exports.deleteUser = deleteUser;
const updateUser = async (req, res) => {
    try {
        res.send('update item');
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
exports.updateUser = updateUser;
