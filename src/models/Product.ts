import { connectionSQLResult } from '../utils/helper_functions/sql_query';

export type Product = {
  id?: number | string; //id is not provided when creating the item that is why it is optional
  name: string;
  price: number;
  category: string;
  created_by: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products';
      const result = await connectionSQLResult(sql, []);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find products. Error: ${err}`);
    }
  }
  async show(id: number | string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await connectionSQLResult(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }
  async create(
    name: string,
    price: number,
    category: string,
    username: string
  ): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price, category, created_by) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await connectionSQLResult(sql, [
        name,
        price,
        category,
        username
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create product ${name}. Error: ${err}`);
    }
  }
  async delete(id: number | string): Promise<undefined> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
      const result = await connectionSQLResult(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
  async update(
    id: number | string,
    name: string,
    price: number
  ): Promise<Product> {
    try {
      const sql =
        'UPDATE products SET name=($1), price=($2) WHERE id=($3) RETURNING *';
      const result = await connectionSQLResult(sql, [name, price, id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update product ${id}. Error: ${err}`);
    }
  }
  async getProductsByCategory(
    category: string
  ): Promise<{ category: string; product_id: number }[]> {
    try {
      const sql = 'SELECT * FROM products WHERE category=($1)';
      const result = await connectionSQLResult(sql, [category]);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products by category. Error: ${err}`);
    }
  }
}
