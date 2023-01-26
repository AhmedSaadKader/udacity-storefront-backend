import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id?: number | string;
  username: string;
  password: string;
};

export class UserModel {
  hashPassword(password: string) {
    const hash = bcrypt.hashSync(
      password + BCRYPT_PASSWORD,
      parseInt(SALT_ROUNDS as string)
    );
    return hash;
  }
  createJWT(id: number | string, username: string) {
    return jwt.sign({ id, username }, process.env.TOKEN_SECRET as string);
  }
  comparePassword(password: string, password_digest: string) {
    const isMatch = bcrypt.compareSync(
      password + BCRYPT_PASSWORD,
      password_digest
    );
    return isMatch;
  }
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find users. Error: ${err}`);
    }
  }
  async create(user: User): Promise<User> {
    const { username, password } = user;
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (username, password_digest) VALUES ($1, $2) RETURNING *';
      const password_digest = this.hashPassword(password);
      const result = await conn.query(sql, [username, password_digest]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create user ${username}. Error: ${err}`);
    }
  }
  async authenticateUser(
    username: string,
    password: string
  ): Promise<User | string> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE username=($1)';
      const result = await conn.query(sql, [username]);
      conn.release();
      if (!result.rows.length) {
        return 'username unavailable';
      }
      const user = result.rows[0];
      if (!this.comparePassword(password, user.password_digest)) {
        return 'password is incorrect';
      }
      return user;
    } catch (err) {
      throw new Error(`Could not find user ${username}. Error: ${err}`);
    }
  }
  async delete(id: number | string): Promise<undefined> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
