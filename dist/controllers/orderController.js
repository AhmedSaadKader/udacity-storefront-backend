"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductToOrder = exports.updateOrder = exports.deleteOrder = exports.getOrder = exports.createOrder = exports.getAllOrders = void 0;
const Order_1 = require("../models/Order");
const order = new Order_1.OrderModel();
const getAllOrders = async (req, res, next) => {
    try {
        const get_all_orders = await order.index();
        res.json(get_all_orders);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllOrders = getAllOrders;
const createOrder = async (req, res, next) => {
    try {
        const order_created = await order.create(req.body.status, req.user?.id);
        res.json(order_created);
    }
    catch (error) {
        next(error);
    }
};
exports.createOrder = createOrder;
const getOrder = async (req, res, next) => {
    try {
        const get_order = await order.show(req.params.orderId);
        res.json(get_order);
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
        const updatedOrder = await order.update(req.params.orderId, req.body.status);
        res.json(updatedOrder);
    }
    catch (error) {
        next(error);
    }
};
exports.updateOrder = updateOrder;
const addProductToOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const { quantity, productId } = req.body;
        if (!quantity || !productId) {
            throw new Error('Please provide product id and quantity');
        }
        const order_product = await order.addProduct(quantity, orderId, productId);
        res.json(order_product);
    }
    catch (error) {
        next(error);
    }
};
exports.addProductToOrder = addProductToOrder;
