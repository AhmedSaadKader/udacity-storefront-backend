"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
const database_1 = __importDefault(require("../../database"));
class DashboardQueries {
    async productsInOrders() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.product_id';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`unable to get orders and products. Error: ${err}`);
        }
    }
    async mostPopularProducts() {
        // get popuar products ranked by how often they are ordered and number of orders
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT product_id, COUNT(product_id) FROM order_products GROUP BY product_id ORDER BY COUNT(*) DESC LIMIT 5';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`unable to get popular products. Error: ${err}`);
        }
    }
    async completedOrdersByUser(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
            const result = await conn.query(sql, [userId, 'completed']);
            return result.rows;
        }
        catch (err) {
            throw new Error(`unable to get completed orders by user. Error: ${err}`);
        }
    }
}
exports.DashboardQueries = DashboardQueries;
