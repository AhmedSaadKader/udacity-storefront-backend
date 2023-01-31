"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
const database_1 = __importDefault(require("../../database"));
class DashboardQueries {
    async itemsInOrders() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT name, price, order_id FROM items INNER JOIN order_items ON items.id = order_items.item_id';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`unable to get orders and products. Error: ${err}`);
        }
    }
}
exports.DashboardQueries = DashboardQueries;
