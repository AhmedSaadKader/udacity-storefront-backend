import { connectionSQLResult } from '../utils/helper_functions/sql_query';

export type Item = {
  id?: number | string; //id is not provided when creating the item that is why it is optional
  name: string;
  price: number;
  created_by: string;
};

export class ItemStore {
  async index(): Promise<Item[]> {
    try {
      const sql = 'SELECT * FROM items';
      const result = await connectionSQLResult(sql, []);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find items. Error: ${err}`);
    }
  }
  async show(id: number | string): Promise<Item> {
    try {
      const sql = 'SELECT * FROM items WHERE id=($1)';
      const result = await connectionSQLResult(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find item ${id}. Error: ${err}`);
    }
  }
  async create(name: string, price: number, username: string): Promise<Item> {
    try {
      const sql =
        'INSERT INTO items (name, price, created_by) VALUES ($1, $2, $3) RETURNING *';
      const result = await connectionSQLResult(sql, [name, price, username]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create item ${name}. Error: ${err}`);
    }
  }
  async delete(id: number | string): Promise<undefined> {
    try {
      const sql = 'DELETE FROM items WHERE id=($1)';
      const result = await connectionSQLResult(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete item ${id}. Error: ${err}`);
    }
  }
  async update(
    id: number | string,
    name: string,
    price: number
  ): Promise<Item> {
    try {
      const sql =
        'UPDATE items SET name=($1), price=($2) WHERE id=($3) RETURNING *';
      const result = await connectionSQLResult(sql, [name, price, id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update item ${id}. Error: ${err}`);
    }
  }
}
