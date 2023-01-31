import client from '../../database';

export class DashboardQueries {
  async productsInOrders(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.product_id';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable to get orders and products. Error: ${err}`);
    }
  }
  async mostPopularProducts(): Promise<
    { product_id: number; count: number }[]
  > {
    // get popuar products ranked by how often they are ordered and number of orders
    try {
      const conn = await client.connect();
      const sql =
        'SELECT product_id, COUNT(product_id) FROM order_products GROUP BY product_id ORDER BY COUNT(*) DESC LIMIT 5';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable to get popular products. Error: ${err}`);
    }
  }
}
