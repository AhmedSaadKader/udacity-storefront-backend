"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const item_1 = require("../item");
const store = new item_1.ItemStore();
describe('ItemStore Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
});
