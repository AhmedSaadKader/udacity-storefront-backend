"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../services/dashboard/dashboard");
const Item_1 = require("../models/Item");
const Order_1 = require("../models/Order");
const User_1 = require("../models/User");
const user = new User_1.UserModel();
const item = new Item_1.ItemStore();
const order = new Order_1.OrderModel();
const dashboard = new dashboard_1.DashboardQueries();
describe('dashboard queries methods', () => {
    let dashboard_item;
    let dashboard_user;
    let dashboard_order;
    let dashboard_order_items;
    beforeAll(async () => {
        dashboard_user = await user.create({
            username: 'dashboard_user',
            password: 'dashboard_password'
        });
        dashboard_item = await item.create('dashboard_item', 500, 'dashboard_user');
        dashboard_order = await order.create('pending', dashboard_user.id);
        dashboard_order_items = await order.addItem(5, dashboard_order.id, dashboard_item.id);
    });
    it('should return list of items in orders when using dashboard query', async () => {
        const result = await dashboard.itemsInOrders();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
});
