"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItem = exports.deleteItem = exports.getItem = exports.createItem = exports.getAllItems = void 0;
const getAllItems = async (req, res) => {
    try {
        res.send('get all items');
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
exports.getAllItems = getAllItems;
const createItem = async (req, res) => {
    try {
        res.send('create new item');
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
exports.createItem = createItem;
const getItem = async (req, res) => {
    try {
        res.send('get one item');
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
exports.getItem = getItem;
const deleteItem = async (req, res) => {
    try {
        res.send('delete item');
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
exports.deleteItem = deleteItem;
const updateItem = async (req, res) => {
    try {
        res.send('update item');
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
exports.updateItem = updateItem;
