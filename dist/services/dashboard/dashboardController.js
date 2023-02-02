"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompletedOrdersByUser = exports.productsByCategory = exports.popular_products = exports.products_in_orders = void 0;
const dashboard_1 = require("./dashboard");
const Product_1 = require("../../models/Product");
const dashboard = new dashboard_1.DashboardQueries();
const productStore = new Product_1.ProductStore();
const products_in_orders = async (req, res, next) => {
    try {
        const result = await dashboard.productsInOrders();
        res.json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.products_in_orders = products_in_orders;
const popular_products = async (req, res, next) => {
    try {
        const result = await dashboard.mostPopularProducts();
        res.json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.popular_products = popular_products;
const productsByCategory = async (req, res, next) => {
    try {
        const productsList = await productStore.getProductsByCategory(req.body.category);
        res.json(productsList);
    }
    catch (err) {
        next(err);
    }
};
exports.productsByCategory = productsByCategory;
const getCompletedOrdersByUser = async (req, res, next) => {
    try {
        const completedOrders = await dashboard.completedOrdersByUser(req.user?.id);
        res.json(completedOrders);
    }
    catch (err) {
        next(err);
    }
};
exports.getCompletedOrdersByUser = getCompletedOrdersByUser;
