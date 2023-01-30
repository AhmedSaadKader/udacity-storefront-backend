import { ItemStore } from '../models/Item';
import { OrderModel } from '../models/Order';
import { User, UserModel } from '../models/User';

const order = new OrderModel();
const user = new UserModel();
const item = new ItemStore();

describe('', () => {
  let order_user: User;
  beforeAll(async () => {
    order_user = await user.create({
      username: 'order_test_user',
      password: 'order_test_password'
    });
  });
  it('should have an index method', () => {
    expect(order.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(order.show).toBeDefined();
  });
  it('should have a create method', () => {
    expect(order.create).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(order.delete).toBeDefined();
  });
  it('should have a update method', () => {
    expect(order.update).toBeDefined();
  });
  it('should create a new order with create method', async () => {
    const newOrder = await order.create('pending', order_user.id as number);
    expect(newOrder).toEqual({
      id: 1,
      status: 'pending',
      user_id: 2
    });
  });
  it('should return list of all items with index method', async () => {
    const result = await order.index();
    console.log(result);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
  it('should return specific order with show method', async () => {
    const result = await order.show(1);
    expect(result).toEqual({
      id: 1,
      status: 'pending',
      user_id: 2
    });
  });
  it('should update order with update method', async () => {
    const result = await order.update(1, 'completed');
    expect(result).toEqual({
      id: 1,
      status: 'completed',
      user_id: 2
    });
  });
  it('should add item to order_item table with addProduct method', async () => {
    const newItem = await item.create(
      'order_test_item',
      400,
      order_user.username
    );
    console.log(newItem);
    const result = await order.addItem(5, 1, newItem.id as number);
    console.log(result);
    expect(result).toEqual({ id: 1, quantity: 5, order_id: 1, item_id: 2 });
  });
  //   it('should delete order with order method', async () => {
  //     const result = await order.delete(1);
  //     expect(result).toBeUndefined();
  //   });
});
