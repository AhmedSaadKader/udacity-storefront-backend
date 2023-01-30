import { connectionSQLResult } from '../utils/helper_functions/sql_query';

export type Order = {
  id?: string | number;
  status: string;
  user_id: string | number;
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
  async create(status: string, userId: string | number) {
    try {
      const sql = 'INSERT INTO orders (status, userId) VALUES ($1, $2)';
      const result = await connectionSQLResult(sql, [status, userId]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err}`);
    }
  }
  async delete(id: string | number) {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const result = await connectionSQLResult(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order. Error: ${err}`);
    }
  }
  async update(id: string | number, newStatus: string) {
    try {
      const sql = 'UPDATE orders SET status=($1) WHERE id=($2)';
      const result = await connectionSQLResult(sql, [newStatus]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order. Error: ${err}`);
    }
  }
  async addProduct(
    quantity: number,
    orderId: string | number,
    itemId: string | number
  ) {
    try {
      const sql =
        'INSERT INTO order_items (quantity, order_id, product_id) VALUES ($1, $2, $3)';
      const result = await connectionSQLResult(sql, [
        quantity,
        orderId,
        itemId
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add item ${itemId} to order ${orderId}. Error: ${err}`
      );
    }
  }
}
