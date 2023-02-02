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
  async checkIfThereIsActiveOrderForUser(
    userId: string | number
  ): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE status=$1 AND user_id=$2';
      const result = await connectionSQLResult(sql, ['pending', userId]);
      console.log(result.rows);
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not get pending orders for user ${userId}.Error: ${err}`
      );
    }
  }
  async index(): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders';
      const result = await connectionSQLResult(sql, []);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find orders. Error: ${err}`);
    }
  }
  async getAllOrdersByUser(userId: string | number): Promise<Order[]> {
    try {
      const sql = 'SELECT * from orders WHERE user_id=($1)';
      const result = await connectionSQLResult(sql, [userId]);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders by user: ${userId}. Error: ${err}`);
    }
  }
  async show(orderId: string | number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await connectionSQLResult(sql, [orderId]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${orderId}. Error ${err}`);
    }
  }
  async create(status: string, userId: string | number): Promise<Order> {
    try {
      const hasActiveOrder = await this.checkIfThereIsActiveOrderForUser(
        userId
      );
      console.log(hasActiveOrder);
      if (hasActiveOrder) {
        throw new Error(`User: ${userId} has an active order.`);
      }
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
  async orderWithProduct(orderId: string | number): Promise<Order_Products[]> {
    try {
      const sql =
        'SELECT product_id, quantity FROM order_products WHERE order_id=$1';
      const result = await connectionSQLResult(sql, [orderId]);
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get order:${orderId} with its products. Error: ${err}`
      );
    }
  }
}
