import { DashboardQueries } from '../services/dashboard/dashboard';
import { Product, ProductStore } from '../models/Product';
import { Order, OrderModel } from '../models/Order';
import { User, UserModel } from '../models/User';

const user = new UserModel();
const product = new ProductStore();
const order = new OrderModel();
const dashboard = new DashboardQueries();

describe('dashboard queries methods', () => {
  let dashboard_product: Product;
  let dashboard_user: User;
  let dashboard_order: Order;
  beforeAll(async () => {
    dashboard_user = await user.create({
      first_name: 'dashboard_first_name',
      last_name: 'dashboard_last_name',
      username: 'dashboard_user',
      password: 'dashboard_password'
    });
    dashboard_product = await product.create(
      'dashboard_product',
      500,
      'dashboard_category',
      'dashboard_user'
    );
    dashboard_order = await order.create(
      'pending',
      dashboard_user.id as number
    );
    await order.addProduct(
      5,
      dashboard_order.id as number,
      dashboard_product.id as number
    );
  });
  it('should return list of products in orders when using dashboard query', async () => {
    const result = await dashboard.productsInOrders();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
  it('should return most popular products when using dashboard query', async () => {
    const result = await dashboard.mostPopularProducts();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});
