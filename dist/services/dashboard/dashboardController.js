"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.items_in_orders = void 0;
const dashboard_1 = require("./dashboard");
const dashboard = new dashboard_1.DashboardQueries();
const items_in_orders = async (req, res, next) => {
    try {
        const result = await dashboard.itemsInOrders();
        res.json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.items_in_orders = items_in_orders;
