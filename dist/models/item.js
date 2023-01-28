"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemStore = void 0;
const database_1 = __importDefault(require("../database"));
class ItemStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM items';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find items. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM items WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find item ${id}. Error: ${err}`);
        }
    }
    async create(name, price, username) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO items (name, price, created_by) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [name, price, username]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create item ${name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM items WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const item = result.rows[0];
            conn.release();
            return item;
        }
        catch (err) {
            throw new Error(`Could not delete item ${id}. Error: ${err}`);
        }
    }
}
exports.ItemStore = ItemStore;
