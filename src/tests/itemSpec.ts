import { ItemStore } from '../models/Item';
import { User, UserModel } from '../models/User';

const store = new ItemStore();
const user = new UserModel();

describe('ItemStore Model', () => {
  beforeAll(async () => {
    await user.create({
      username: 'item_test_user',
      password: 'test_password_100'
    });
  });
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });
  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });
  it('should have a update method', () => {
    expect(store.update).toBeDefined();
  });
  it('create method should create a new item', async () => {
    const result = await store.create('test_item', 100, 'item_test_user');
    expect(result).toEqual({
      id: 1,
      name: 'test_item',
      price: 100,
      created_by: 'item_test_user'
    });
  });
  it('index method should return list of items', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
  it('show method should show specific item', async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      name: 'test_item',
      price: 100,
      created_by: 'item_test_user'
    });
  });
  it('update method should update specific item', async () => {
    const result = await store.update(1, 'updated_item', 120);
    expect(result).toEqual({
      id: 1,
      name: 'updated_item',
      price: 120,
      created_by: 'item_test_user'
    });
  });
  it('delete method should delete specific item', async () => {
    const result = await store.delete(1);
    expect(result).toEqual(undefined);
  });
});
