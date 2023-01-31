"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = require("../models/Item");
const User_1 = require("../models/User");
const store = new Item_1.ItemStore();
const user = new User_1.UserModel();
let createdUser;
describe('ItemStore Model', () => {
    beforeAll(async () => {
        createdUser = await user.create({
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
        expect(result.name).toEqual('test_item');
        expect(result.price).toEqual(100);
        expect(result.created_by).toEqual('item_test_user');
    });
    it('index method should return list of items', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
    it('show method should show specific item', async () => {
        const result = await store.show(createdUser.id);
        expect(result.name).toEqual('test_item');
        expect(result.price).toEqual(100);
        expect(result.created_by).toEqual('item_test_user');
    });
    it('update method should update specific item', async () => {
        const result = await store.update(createdUser.id, 'updated_item', 120);
        expect(result.name).toEqual('updated_item');
        expect(result.price).toEqual(120);
        expect(result.created_by).toEqual('item_test_user');
    });
    it('delete method should delete specific item', async () => {
        const result = await store.delete(createdUser.id);
        expect(result).toEqual(undefined);
    });
});
