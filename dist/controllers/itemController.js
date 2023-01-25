"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItem = exports.deleteItem = exports.getItem = exports.createItem = exports.getAllItems = void 0;
const item_1 = require("../models/item");
const itemStore = new item_1.ItemStore();
const getAllItems = async (req, res) => {
    try {
        const allItems = await itemStore.index();
        res.json(allItems);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
exports.getAllItems = getAllItems;
const createItem = async (req, res) => {
    const { name, price } = req.body;
    try {
        const newItem = await itemStore.create({ name, price });
        res.json(newItem);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
exports.createItem = createItem;
const getItem = async (req, res) => {
    try {
        const item = await itemStore.show(req.params.id);
        console.log(item);
        res.json(item);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
exports.getItem = getItem;
const deleteItem = async (req, res) => {
    try {
        const item = await itemStore.delete(req.params.id);
        res.json(item);
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
