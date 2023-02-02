"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const dashboardController_1 = require("./dashboardController");
const router = (0, express_1.Router)();
router.use(auth_1.default);
router.get('/products_in_orders', dashboardController_1.products_in_orders);
router.get('/popular_products', dashboardController_1.popular_products);
router.post('/category_Products', dashboardController_1.productsByCategory);
router.get('/completed_orders', dashboardController_1.getCompletedOrdersByUser);
exports.default = router;
