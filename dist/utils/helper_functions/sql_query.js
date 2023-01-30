"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSQLResult = void 0;
const database_1 = __importDefault(require("../../database"));
const connectionSQLResult = async (sqlQuery, sqlParams) => {
    try {
        const conn = await database_1.default.connect();
        const result = await conn.query(sqlQuery, [...sqlParams]);
        conn.release();
        return result;
    }
    catch (err) {
        throw new Error(`Error in sql connection or query. Error: ${err}`);
    }
};
exports.connectionSQLResult = connectionSQLResult;
