"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductToOrder = exports.updateOrder = exports.deleteOrder = exports.getOrder = exports.createOrder = exports.getAllOrders = void 0;
const Order_1 = require("../models/Order");
const order = new Order_1.OrderModel();
const getAllOrders = async (req, res, next) => {
    try {
        res.send('getAllOrders');
    }
    catch (error) {
        next(error);
    }
};
exports.getAllOrders = getAllOrders;
const createOrder = async (req, res, next) => {
    try {
        res.send('create Order');
    }
    catch (error) {
        next(error);
    }
};
exports.createOrder = createOrder;
const getOrder = async (req, res, next) => {
    try {
        res.send('get Order');
    }
    catch (error) {
        next(error);
    }
};
exports.getOrder = getOrder;
const deleteOrder = async (req, res, next) => {
    try {
        res.send('delete Order');
    }
    catch (error) {
        next(error);
    }
};
exports.deleteOrder = deleteOrder;
const updateOrder = async (req, res, next) => {
    try {
        res.send('update Order');
    }
    catch (error) {
        next(error);
    }
};
exports.updateOrder = updateOrder;
const addProductToOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const { quantity, itemId } = req.body;
        const order_product = order.addProduct(quantity, orderId, itemId);
        res.json(order_product);
    }
    catch (error) {
        next(error);
    }
};
exports.addProductToOrder = addProductToOrder;
