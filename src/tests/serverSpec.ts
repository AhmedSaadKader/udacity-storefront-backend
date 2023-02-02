import request from 'supertest';
import { Product } from '../models/Product';
import { User } from '../models/User';
import app from '../server';

const test_user_2: User = {
  first_name: 'test_first_name_2',
  last_name: 'test_last_name_2',
  username: 'test_user_2',
  password: 'test_password_2'
};

describe("GET API '/'", () => {
  it('should return Hello, world!', async () => {
    const res = await request(app).get('/').send('Hello, world!');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Hello World!');
  });
});

describe('users API response for endpoints without auth', () => {
  const url = '/api/v1/users';
  it('should create new user and send token when sending credentials to create url', async () => {
    const res = await request(app)
      .post(url + '/')
      .send(test_user_2);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).not.toBeNull();
    expect(res.body.username).toEqual('test_user_2');
  });
  it('index method should return list of products', async () => {
    const res = await request(app).get(url);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
  it('should return proper user and send token when using login method ', async () => {
    const res = await request(app)
      .post(url + '/login')
      .send(test_user_2);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).not.toBeNull();
    expect(res.body.username).toEqual('test_user_2');
  });
});

describe('users API response with auth for deleting and updating users', () => {
  const url = '/api/v1/users';
  let token: string;
  const test_user_3: User = {
    first_name: 'test_user_first_name_3',
    last_name: 'test_user_last_name_3',
    username: 'test_user_3',
    password: 'test_password_3'
  };
  it('should return error at update endpoint if not authorized', async () => {
    const res = await request(app)
      .patch(url + '/3')
      .send({ username: 'updated_username' });
    expect(res.statusCode).toBe(401);
    expect(res.text).toBe('Authentication invalid');
    expect(res.body.token).toBeUndefined();
  });
  it('should return error at delete endpoint if not authorized', async () => {
    const res = await request(app).delete(url + '/3');
    expect(res.statusCode).toBe(401);
    expect(res.text).toBe('Authentication invalid');
    expect(res.body.token).toBeUndefined();
  });
  it('should update user at update endpoint', async () => {
    const register = await request(app).post(url).send(test_user_3);
    token = register.body.token;
    const res = await request(app)
      .patch(url + `/${register.body.id}`)
      .send({ username: 'updated_username' })
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toEqual('updated_username');
  });
  it('should delete user at delete endpoint', async () => {
    const login = await request(app)
      .post(url + '/login')
      .send({ username: 'updated_username', password: 'test_password_3' });
    token = login.body.token;
    const res = await request(app)
      .delete(url + '/updated_username')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toEqual(undefined);
  });
});

describe('products API response', () => {
  const url = '/api/v1/products';
  const test_product_2: Product = {
    name: 'test_product_2',
    price: 100,
    category: 'test_category_2',
    created_by: 'test_user_2'
  };
  let token: string;
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send(test_user_2);
    token = res.body.token;
  });
  it('should create new product at post endpoint', async () => {
    const res = await request(app)
      .post(url + '/')
      .send(test_product_2)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toEqual('test_product_2');
  });
  it('index method should return list of products', async () => {
    const res = await request(app).get(url);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
  it('should return proper product when requested by proper endpoint', async () => {
    const res = await request(app).get(url + '/4');
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toEqual('test_product_2');
  });
  it('should update product with name only on update endpoint', async () => {
    const res = await request(app)
      .patch(url + '/4')
      .send({ name: 'updated_product' })
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toEqual('updated_product');
    expect(res.body.price).toEqual(test_product_2.price);
  });
  it('should update product with price only on update endpoint', async () => {
    const res = await request(app)
      .patch(url + '/4')
      .send({ price: 200 })
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toEqual('updated_product');
    expect(res.body.price).toEqual(200);
  });
  it('should update product with name and price only on update endpoint', async () => {
    const res = await request(app)
      .patch(url + '/4')
      .send({ name: 'updated_product_3', price: 300 })
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toEqual('updated_product_3');
    expect(res.body.price).toEqual(300);
  });
  it('should return error at delete endpoint if not authorized', async () => {
    const res = await request(app).delete(url + '/4');
    expect(res.statusCode).toBe(401);
    expect(res.text).toBe('Authentication invalid');
    expect(res.body.token).toBeUndefined();
  });
  it('should return products by category when using dashboard endpoing', async () => {
    const res = await request(app)
      .post('/api/v1/dashboard/category_Products')
      .send({ category: test_product_2.category })
      .set('Authorization', `Bearer ${token}`);
    console.log(res.body);
    expect(res.statusCode).toBe(200);
  });
  it('should delete product at delete endpoint', async () => {
    const res = await request(app)
      .delete(url + '/4')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toEqual(undefined);
  });
});

describe('orders API response', () => {
  const url = '/api/v1/orders';
  let token: string;
  let user_logged_id: number;
  let order_created_id: number;
  it('should return authorization error if proper authorization is missing', async () => {
    const res = await request(app).get(url);
    expect(res.statusCode).toBe(401);
    expect(res.text).toBe('Authentication invalid');
    expect(res.body.token).toBeUndefined();
  });
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send(test_user_2);
    token = res.body.token;
    user_logged_id = res.body.id;
  });
  it('should return error if the status of the order created is anything other than pending and completed', async () => {
    const res = await request(app)
      .post(url)
      .send({ status: 'whatever', user_id: user_logged_id })
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(500);
  });
  it('should create new order at post endpoint', async () => {
    const res = await request(app)
      .post(url)
      .send({ status: 'pending', user_id: user_logged_id })
      .set('Authorization', `Bearer ${token}`);
    order_created_id = res.body.id;
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('pending');
  });
  it('should return error if user is trying to create an order while having an active order open', async () => {
    const res = await request(app)
      .post(url)
      .send({ status: 'pending', user_id: user_logged_id })
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(500);
  });
  it('should get all orders at get order endpoint', async () => {
    const res = await request(app)
      .get(url)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
  it('should get all orders from specific user at getOrders endpoint', async () => {
    const res = await request(app)
      .get(url + '/myorders')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
  it('should get specific order at get order endpoint', async () => {
    const res = await request(app)
      .get(url + `/${order_created_id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toEqual('pending');
  });
  it('should update order status with update endpoint', async () => {
    const res = await request(app)
      .patch(url + `/${order_created_id}`)
      .send({ status: 'completed' })
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toEqual('completed');
  });
  it('should return error if update order is not either pending or completed', async () => {
    const res = await request(app)
      .patch(url + `/${order_created_id}`)
      .send({ status: 'not a correct option' })
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(500);
  });
  it('should add product to order at add product endpoint', async () => {
    const res = await request(app)
      .post(url + `/${order_created_id}/products`)
      .send({ quantity: 10, productId: 2 })
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toEqual(10);
    expect(res.body.order_id).toEqual(order_created_id);
    expect(res.body.product_id).toEqual(2);
  });
  it('should return error if product id or quantity is missing from add product to order endpoint', async () => {
    const res = await request(app)
      .post(url + `/${order_created_id}/products`)
      .send({ quantity: 10 })
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(500);
  });
  it('should return list of products in orders with dashboard queries', async () => {
    const res = await request(app)
      .get('/api/v1/dashboard/products_in_orders')
      .set('Authorization', `Bearer ${token}`);
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
  it('should return order with its products with endpoint', async () => {
    const res = await request(app)
      .get(url + `/order_products/${order_created_id}`)
      .set('Authorization', `Bearer ${token}`);
    console.log(res.body);
    expect(res.status).toBe(200);
  });
});
