import client from '../database';

export type Item = {
  id?: number; //id is not provided when creating the item that is why it is optional
  name: string;
  price: number;
};

export class ItemStore {
  async index(): Promise<Item[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM items';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find items. Error: ${err}`);
    }
  }
  async show(id: number): Promise<Item> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM items WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find item ${id}. Error: ${err}`);
    }
  }
  async create(item: Item): Promise<Item> {
    const { name, price } = item;
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO items (name, price) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(sql, [name, price]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create item ${name}. Error: ${err}`);
    }
  }
  async delete(id: number): Promise<undefined> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM items WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      const item = result.rows[0];
      conn.release();
      return item;
    } catch (err) {
      throw new Error(`Could not delete item ${id}. Error: ${err}`);
    }
  }
}
