"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItem = exports.deleteItem = exports.getItem = exports.createItem = exports.getAllItems = void 0;
const Item_1 = require("../models/Item");
const itemStore = new Item_1.ItemStore();
const getAllItems = async (req, res, next) => {
    try {
        const allItems = await itemStore.index();
        res.json(allItems);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllItems = getAllItems;
const createItem = async (req, res, next) => {
    const { name, price } = req.body;
    try {
        const newItem = await itemStore.create(name, price, req.user?.username);
        res.json(newItem);
    }
    catch (error) {
        next(error);
    }
};
exports.createItem = createItem;
const getItem = async (req, res, next) => {
    try {
        const item = await itemStore.show(req.params.id);
        res.json(item);
    }
    catch (error) {
        next(error);
    }
};
exports.getItem = getItem;
const deleteItem = async (req, res, next) => {
    try {
        const item = await itemStore.delete(req.params.id);
        res.json(item);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteItem = deleteItem;
const updateItem = async (req, res, next) => {
    try {
        const item = await itemStore.show(req.params.id);
        const newName = req.body.name || item.name;
        const newPrice = req.body.price || item.price;
        const newItem = await itemStore.update(req.params.id, newName, newPrice);
        res.json(newItem);
    }
    catch (error) {
        next(error);
    }
};
exports.updateItem = updateItem;
