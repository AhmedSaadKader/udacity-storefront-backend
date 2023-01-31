import { connectionSQLResult } from '../utils/helper_functions/sql_query';

export type Order = {
  id?: string | number;
  status: string;
  user_id: string | number;
};

export type Order_Products = {
  id?: string | number;
  quantity: number;
  order_id: string | number;
  product_id: string | number;
};

export class OrderModel {
  async index(): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders';
      const result = await connectionSQLResult(sql, []);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find orders. Error: ${err}`);
    }
  }
  async show(id: string | number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await connectionSQLResult(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error ${err}`);
    }
  }
  async create(status: string, userId: string | number): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
      const result = await connectionSQLResult(sql, [userId, status]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err}`);
    }
  }
  async delete(id: string | number): Promise<undefined> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const result = await connectionSQLResult(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order. Error: ${err}`);
    }
  }
  async update(id: string | number, newStatus: string): Promise<Order> {
    try {
      const sql = 'UPDATE orders SET status=($1) WHERE id=($2) RETURNING *';
      const result = await connectionSQLResult(sql, [newStatus, id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order. Error: ${err}`);
    }
  }
  async addProduct(
    quantity: number,
    orderId: string | number,
    productId: string | number
  ): Promise<Order_Products> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await connectionSQLResult(sql, [
        quantity,
        orderId,
        productId
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}. Error: ${err}`
      );
    }
  }
}
