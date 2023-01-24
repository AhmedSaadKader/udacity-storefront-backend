import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id?: number;
  username: string;
  password: string;
};

export class UserModel {
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
  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }
  async create(user: User): Promise<User> {
    const { username, password } = user;
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (username, password_digest) VALUES ($1, $2) RETURNING *';
      const hash = bcrypt.hashSync(
        password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );

      const result = await conn.query(sql, [username, hash]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create user ${username}. Error: ${err}`);
    }
  }
  async authenticate(
    username: string,
    password: string
  ): Promise<User | string> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE username=($1)';
      const result = await conn.query(sql, [username]);
      if (result.rows.length) {
        const user = result.rows[0];
        if (
          bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password_digest)
        ) {
          console.log(user);
          return user;
        } else {
          return 'password is incorrect';
        }
      } else {
        return 'username unavailable';
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async delete(id: number): Promise<undefined> {
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
