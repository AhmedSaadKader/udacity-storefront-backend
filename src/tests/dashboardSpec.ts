import { DashboardQueries } from '../services/dashboard/dashboard';
import { Item, ItemStore } from '../models/Item';
import { Order, OrderModel, Order_items } from '../models/Order';
import { User, UserModel } from '../models/User';

const user = new UserModel();
const item = new ItemStore();
const order = new OrderModel();
const dashboard = new DashboardQueries();

describe('dashboard queries methods', () => {
  let dashboard_item: Item;
  let dashboard_user: User;
  let dashboard_order: Order;
  let dashboard_order_items: Order_items;
  beforeAll(async () => {
    dashboard_user = await user.create({
      username: 'dashboard_user',
      password: 'dashboard_password'
    });
    dashboard_item = await item.create('dashboard_item', 500, 'dashboard_user');
    dashboard_order = await order.create(
      'pending',
      dashboard_user.id as number
    );
    dashboard_order_items = await order.addItem(
      5,
      dashboard_order.id as number,
      dashboard_item.id as number
    );
  });
  it('should return list of items in orders when using dashboard query', async () => {
    const result = await dashboard.itemsInOrders();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});
