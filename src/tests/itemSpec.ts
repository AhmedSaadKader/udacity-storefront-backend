import { ItemStore } from '../models/item';

const store = new ItemStore();

describe('ItemStore Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('should return list of items when using index method', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
