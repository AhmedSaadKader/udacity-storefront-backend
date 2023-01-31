import { ItemStore } from '../models/Item';
import { Order, OrderModel } from '../models/Order';
import { User, UserModel } from '../models/User';

const order = new OrderModel();
const user = new UserModel();
const item = new ItemStore();
let newOrder: Order;

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
    newOrder = await order.create('pending', order_user.id as number);
    expect(newOrder.status).toEqual('pending');
    expect(newOrder.user_id).toEqual(order_user.id as number);
  });
  it('should return list of all items with index method', async () => {
    const result = await order.index();
    console.log(result);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
  it('should return specific order with show method', async () => {
    const result = await order.show(newOrder.id as number);
    expect(result.status).toEqual('pending');
    expect(result.user_id).toEqual(order_user.id as number);
  });
  it('should update order with update method', async () => {
    const result = await order.update(newOrder.id as number, 'completed');
    expect(result).toEqual({
      id: newOrder.id as number,
      status: 'completed',
      user_id: order_user.id
    });
  });
  it('should add item to order_item table with addProduct method', async () => {
    const newItem = await item.create(
      'order_test_item',
      400,
      order_user.username
    );
    const result = await order.addItem(5, 1, newItem.id as number);
    console.log(result);
    expect(result.quantity).toEqual(5);
    expect(result.order_id).toEqual(1);
    expect(result.item_id).toEqual(newItem.id as number);
  });
  //   it('should delete order with order method', async () => {
  //     const result = await order.delete(1);
  //     expect(result).toBeUndefined();
  //   });
});
