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
const registerUser = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        if (await user.usernameExists(username)) {
            throw new Error('username already exists. Please login instead');
        }
        const newUser = await user.create({ username, password });
        const token = user.createJWT(newUser.id, newUser.username);
        res.json({ token, username: newUser.username, id: newUser.id });
    }
    catch (error) {
        next(error);
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
const deleteUser = async (req, res, next) => {
    try {
        const username = req.user?.username;
        const getUser = await user.usernameExists(req.params.username);
        if (username !== getUser?.username) {
            throw new Error('Unauthorized to delete this user');
        }
        const deletedUser = await user.delete(req.params.username);
        res.json(deletedUser);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
const updateUser = async (req, res, next) => {
    try {
        const username = req.user?.username;
        const userId = parseInt(req.params.id);
        const getUser = await user.usernameExists(username);
        if (userId !== getUser?.id) {
            throw new Error('Unauthorized to edit this user');
        }
        const newUsername = req.body.username;
        if (!newUsername || newUsername === getUser?.username) {
            throw new Error('Please provide a new username');
        }
        if (await user.usernameExists(newUsername)) {
            throw new Error('Username already in use. Please provide a new username');
        }
        const updateUser = await user.update(userId, newUsername);
        console.log(updateUser);
        res.json(updateUser);
    }
    catch (error) {
        res.status(400);
        next(error);
    }
};
exports.updateUser = updateUser;
