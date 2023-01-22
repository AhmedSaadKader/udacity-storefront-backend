"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const item_1 = require("../models/item");
const store = new item_1.ItemStore();
describe('ItemStore Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should return list of items when using index method', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
