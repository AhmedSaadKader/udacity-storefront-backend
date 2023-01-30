"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const sql_query_1 = require("../utils/helper_functions/sql_query");
class OrderModel {
    async index() {
        try {
            const sql = 'SELECT * FROM orders';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, []);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find orders. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find order ${id}. Error ${err}`);
        }
    }
    async create(status, userId) {
        try {
            const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [userId, status]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create order. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete order. Error: ${err}`);
        }
    }
    async update(id, newStatus) {
        try {
            const sql = 'UPDATE orders SET status=($1) WHERE id=($2) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [newStatus, id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update order. Error: ${err}`);
        }
    }
    async addItem(quantity, orderId, itemId) {
        try {
            const sql = 'INSERT INTO order_items (quantity, order_id, item_id) VALUES ($1, $2, $3) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [
                quantity,
                orderId,
                itemId
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not add item ${itemId} to order ${orderId}. Error: ${err}`);
        }
    }
}
exports.OrderModel = OrderModel;
