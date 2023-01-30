"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemStore = void 0;
const sql_query_1 = require("../utils/helper_functions/sql_query");
class ItemStore {
    async index() {
        try {
            const sql = 'SELECT * FROM items';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, []);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find items. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM items WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find item ${id}. Error: ${err}`);
        }
    }
    async create(name, price, username) {
        try {
            const sql = 'INSERT INTO items (name, price, created_by) VALUES ($1, $2, $3) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [name, price, username]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create item ${name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM items WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete item ${id}. Error: ${err}`);
        }
    }
    async update(id, name, price) {
        try {
            const sql = 'UPDATE items SET name=($1), price=($2) WHERE id=($3) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [name, price, id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update item ${id}. Error: ${err}`);
        }
    }
}
exports.ItemStore = ItemStore;
