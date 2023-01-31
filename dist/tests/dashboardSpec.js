"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../services/dashboard/dashboard");
const Product_1 = require("../models/Product");
const Order_1 = require("../models/Order");
const User_1 = require("../models/User");
const user = new User_1.UserModel();
const product = new Product_1.ProductStore();
const order = new Order_1.OrderModel();
const dashboard = new dashboard_1.DashboardQueries();
describe('dashboard queries methods', () => {
    let dashboard_product;
    let dashboard_user;
    let dashboard_order;
    beforeAll(async () => {
        dashboard_user = await user.create({
            first_name: 'dashboard_first_name',
            last_name: 'dashboard_last_name',
            username: 'dashboard_user',
            password: 'dashboard_password'
        });
        dashboard_product = await product.create('dashboard_product', 500, 'dashboard_category', 'dashboard_user');
        dashboard_order = await order.create('pending', dashboard_user.id);
        await order.addProduct(5, dashboard_order.id, dashboard_product.id);
    });
    it('should return list of products in orders when using dashboard query', async () => {
        const result = await dashboard.productsInOrders();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
});
