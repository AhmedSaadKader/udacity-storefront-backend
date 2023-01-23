import { ItemStore } from '../models/item';

const store = new ItemStore();

describe('ItemStore Model', () => {
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
  it('index method should return list of items', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
  it('create method should create a new item', async () => {
    const result = await store.create({ name: 'test_item', price: 100 });
    expect(result).toEqual({ id: 1, name: 'test_item', price: 100 });
  });
  it('show method should show specific item', async () => {
    const result = await store.show(1);
    expect(result).toEqual({ id: 1, name: 'test_item', price: 100 });
  });
  it('delete method should delete specific item', async () => {
    const result = await store.delete(1);
    expect(result).toEqual(undefined);
  });
});
