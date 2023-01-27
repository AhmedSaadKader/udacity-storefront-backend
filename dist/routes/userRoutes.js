"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.get('/', userController_1.getAllUsers);
router.post('/', userController_1.registerUser);
router.post('/login', userController_1.loginUser);
router.use(auth_1.default);
router.delete('/:username', userController_1.deleteUser);
router.patch('/:id', userController_1.updateUser);
exports.default = router;
