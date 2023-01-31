import client from '../../database';

export class DashboardQueries {
  async itemsInOrders(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT name, price, order_id FROM items INNER JOIN order_items ON items.id = order_items.item_id';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable to get orders and products. Error: ${err}`);
    }
  }
}
