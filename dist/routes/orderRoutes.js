"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.use(auth_1.default);
router.get('/', orderController_1.getAllOrders);
router.post('/', orderController_1.createOrder);
router.get('/:orderId', orderController_1.getOrder);
router.delete('/:orderId', orderController_1.deleteOrder);
router.patch('/:orderId', orderController_1.updateOrder);
router.post('/:orderId/products', orderController_1.addItemToOrder);
exports.default = router;
