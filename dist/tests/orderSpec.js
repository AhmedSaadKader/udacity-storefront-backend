"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../models/Product");
const Order_1 = require("../models/Order");
const User_1 = require("../models/User");
const order = new Order_1.OrderModel();
const user = new User_1.UserModel();
const product = new Product_1.ProductStore();
let newOrder;
describe('', () => {
    let order_user;
    let newProduct;
    beforeAll(async () => {
        order_user = await user.create({
            first_name: 'order_test_first_name',
            last_name: 'order_test_last_name',
            username: 'order_test_user',
            password: 'order_test_password'
        });
        newProduct = await product.create('order_test_product', 400, 'order_test_category', order_user.username);
    });
    it('should have an index method', () => {
        expect(order.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(order.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(order.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(order.delete).toBeDefined();
    });
    it('should have a update method', () => {
        expect(order.update).toBeDefined();
    });
    it('should create a new order with create method', async () => {
        newOrder = await order.create('pending', order_user.id);
        expect(newOrder.status).toEqual('pending');
        expect(newOrder.user_id).toEqual(order_user.id);
    });
    it('should return list of all products with index method', async () => {
        const result = await order.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
    it('should return all orders by specific user', async () => {
        const result = await order.getAllOrdersByUser(order_user.id);
        console.log(result);
        expect(result.length).toBeGreaterThan(0);
    });
    it('should return specific order with show method', async () => {
        const result = await order.show(newOrder.id);
        expect(result.status).toEqual('pending');
        expect(result.user_id).toEqual(order_user.id);
    });
    it('should update order with update method', async () => {
        const result = await order.update(newOrder.id, 'completed');
        expect(result).toEqual({
            id: newOrder.id,
            status: 'completed',
            user_id: order_user.id
        });
    });
    it('should add product to order_product table with addProduct method', async () => {
        const result = await order.addProduct(15, 1, newProduct.id);
        expect(result.quantity).toEqual(15);
        expect(result.order_id).toEqual(1);
        expect(result.product_id).toEqual(newProduct.id);
    });
    it('should get order with its products and quantity with orderWithProduct method', async () => {
        const result = await order.orderWithProduct(1);
        expect(result.length).toBeGreaterThan(0);
        expect(result[1].product_id).toBe(newProduct.id);
    });
});
