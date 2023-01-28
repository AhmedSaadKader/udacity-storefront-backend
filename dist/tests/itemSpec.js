"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = require("../models/Item");
const User_1 = require("../models/User");
const store = new Item_1.ItemStore();
const user = new User_1.UserModel();
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
    it('delete method should delete specific item', async () => {
        const result = await store.delete(1);
        expect(result).toEqual(undefined);
    });
});
