"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.get('/', productController_1.getAllProducts);
router.get('/:id', productController_1.getProduct);
router.use(auth_1.default);
router.post('/', productController_1.createProduct);
router.delete('/:id', productController_1.deleteProduct);
router.patch('/:id', productController_1.updateProduct);
exports.default = router;
