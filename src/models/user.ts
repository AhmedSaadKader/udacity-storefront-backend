import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectionSQLResult } from '../utils/helper_functions/sql_query';

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id?: number | string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  password_digest?: string;
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
  async usernameExists(username: string): Promise<User | undefined> {
    const sql = 'SELECT * FROM users WHERE username=($1)';
    const result = await connectionSQLResult(sql, [username]);
    if (!result.rows.length) {
      return undefined;
    }
    const user = result.rows[0];
    return user;
  }
  async index(): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users';
      const result = await connectionSQLResult(sql, []);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find users. Error: ${err}`);
    }
  }
  async create(user: User): Promise<User> {
    const { first_name, last_name, username, password } = user;
    try {
      const sql =
        'INSERT INTO users (first_name, last_name, username, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
      const password_digest = this.hashPassword(password);
      const result = await connectionSQLResult(sql, [
        first_name,
        last_name,
        username,
        password_digest
      ]);
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
      const user = await this.usernameExists(username);
      if (!user) {
        throw new Error('username unavailable');
      }
      if (!this.comparePassword(password, user.password_digest as string)) {
        throw new Error('password is incorrect');
      }
      return user;
    } catch (err) {
      throw new Error(`Could not find user ${username}. Error: ${err}`);
    }
  }
  async delete(username: string): Promise<undefined> {
    try {
      const sql = 'DELETE FROM users WHERE username=($1)';
      const result = await connectionSQLResult(sql, [username]);
      const user = result.rows[0];
      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${username}. Error: ${err}`);
    }
  }
  async update(id: string | number, newUsername?: string): Promise<User> {
    try {
      const sql = 'UPDATE users SET username=($1) WHERE id=($2) RETURNING *';
      const result = await connectionSQLResult(sql, [
        newUsername as string,
        id
      ]);
      const user = result.rows[0];
      return user;
    } catch (err) {
      throw new Error(`Could not update user with id:${id}. Error: ${err}`);
    }
  }
}
