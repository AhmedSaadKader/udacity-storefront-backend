"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const sql_query_1 = require("../utils/helper_functions/sql_query");
class ProductStore {
    async index() {
        try {
            const sql = 'SELECT * FROM products';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, []);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find products. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    async create(name, price, category, username) {
        try {
            const sql = 'INSERT INTO products (name, price, category, created_by) VALUES ($1, $2, $3, $4) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [
                name,
                price,
                category,
                username
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create product ${name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
    async update(id, name, price) {
        try {
            const sql = 'UPDATE products SET name=($1), price=($2) WHERE id=($3) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [name, price, id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update product ${id}. Error: ${err}`);
        }
    }
    async getProductsByCategory(category) {
        try {
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [category]);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get products by category. Error: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
