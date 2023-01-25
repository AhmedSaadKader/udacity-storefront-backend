"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getUser = exports.createUser = exports.getAllUsers = void 0;
const user_1 = require("../models/user");
const user = new user_1.UserModel();
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
const createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = await user.create({ username, password });
        res.json(newUser);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
exports.createUser = createUser;
const getUser = async (req, res) => {
    try {
        const createdUser = await user.show(req.params.id);
        res.json(createdUser);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
exports.getUser = getUser;
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
