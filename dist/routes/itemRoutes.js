"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemController_1 = require("../controllers/itemController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.get('/', itemController_1.getAllItems);
router.get('/:id', itemController_1.getItem);
router.use(auth_1.default);
router.post('/', itemController_1.createItem);
router.delete('/:id', itemController_1.deleteItem);
router.patch('/:id', itemController_1.updateItem);
exports.default = router;
