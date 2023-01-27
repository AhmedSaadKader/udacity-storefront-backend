"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
class UserModel {
    hashPassword(password) {
        const hash = bcrypt_1.default.hashSync(password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
        return hash;
    }
    createJWT(id, username) {
        return jsonwebtoken_1.default.sign({ id, username }, process.env.TOKEN_SECRET);
    }
    comparePassword(password, password_digest) {
        const isMatch = bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, password_digest);
        return isMatch;
    }
    async usernameExists(username) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM users WHERE username=($1)';
        const result = await conn.query(sql, [username]);
        conn.release();
        if (!result.rows.length) {
            return undefined;
        }
        const user = result.rows[0];
        return user;
    }
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find users. Error: ${err}`);
        }
    }
    async create(user) {
        const { username, password } = user;
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (username, password_digest) VALUES ($1, $2) RETURNING *';
            const password_digest = this.hashPassword(password);
            const result = await conn.query(sql, [username, password_digest]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create user ${username}. Error: ${err}`);
        }
    }
    async authenticateUser(username, password) {
        try {
            const user = await this.usernameExists(username);
            if (!user) {
                throw new Error('username unavailable');
            }
            if (!this.comparePassword(password, user.password_digest)) {
                throw new Error('password is incorrect');
            }
            return user;
        }
        catch (err) {
            throw new Error(`Could not find user ${username}. Error: ${err}`);
        }
    }
    async delete(username) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM users WHERE username=($1)';
            const result = await conn.query(sql, [username]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not delete user ${username}. Error: ${err}`);
        }
    }
    async update(id, newUsername) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'UPDATE users SET username=($1) WHERE id=($2)';
            const result = await conn.query(sql, [newUsername, id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not update user with id:${id}. Error: ${err}`);
        }
    }
}
exports.UserModel = UserModel;
