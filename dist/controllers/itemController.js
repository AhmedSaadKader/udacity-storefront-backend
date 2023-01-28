"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItem = exports.deleteItem = exports.getItem = exports.createItem = exports.getAllItems = void 0;
const Item_1 = require("../models/Item");
const itemStore = new Item_1.ItemStore();
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
const createItem = async (req, res, next) => {
    const { name, price } = req.body;
    console.log(req.user?.username);
    try {
        const newItem = await itemStore.create(name, price, req.user?.username);
        res.json(newItem);
    }
    catch (error) {
        next(error);
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
