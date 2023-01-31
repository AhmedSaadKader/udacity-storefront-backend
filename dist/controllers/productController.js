"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.getProduct = exports.createProduct = exports.getAllProducts = void 0;
const Product_1 = require("../models/Product");
const productStore = new Product_1.ProductStore();
const getAllProducts = async (req, res, next) => {
    try {
        const allProducts = await productStore.index();
        res.json(allProducts);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllProducts = getAllProducts;
const createProduct = async (req, res, next) => {
    const { name, price, category } = req.body;
    try {
        const newProduct = await productStore.create(name, price, category, req.user?.username);
        res.json(newProduct);
    }
    catch (error) {
        next(error);
    }
};
exports.createProduct = createProduct;
const getProduct = async (req, res, next) => {
    try {
        const product = await productStore.show(req.params.id);
        res.json(product);
    }
    catch (error) {
        next(error);
    }
};
exports.getProduct = getProduct;
const deleteProduct = async (req, res, next) => {
    try {
        const product = await productStore.delete(req.params.id);
        res.json(product);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProduct = deleteProduct;
const updateProduct = async (req, res, next) => {
    try {
        const product = await productStore.show(req.params.id);
        const newName = req.body.name || product.name;
        const newPrice = req.body.price || product.price;
        const newProduct = await productStore.update(req.params.id, newName, newPrice);
        res.json(newProduct);
    }
    catch (error) {
        next(error);
    }
};
exports.updateProduct = updateProduct;
