"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../models/Product");
const User_1 = require("../models/User");
const store = new Product_1.ProductStore();
const user = new User_1.UserModel();
let createdUser;
describe('ProductStore Model', () => {
    beforeAll(async () => {
        createdUser = await user.create({
            first_name: 'product_test_first_name',
            last_name: 'product_test_last_name',
            username: 'product_test_user',
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
    it('create method should create a new product', async () => {
        const result = await store.create('test_product', 100, 'test_category', 'product_test_user');
        expect(result.name).toEqual('test_product');
        expect(result.price).toEqual(100);
        expect(result.category).toEqual('test_category');
        expect(result.created_by).toEqual('product_test_user');
    });
    it('index method should return list of products', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
    it('show method should show specific product', async () => {
        const result = await store.show(createdUser.id);
        expect(result.name).toEqual('test_product');
        expect(result.price).toEqual(100);
        expect(result.created_by).toEqual('product_test_user');
    });
    it('update method should update specific product', async () => {
        const result = await store.update(createdUser.id, 'updated_product', 120);
        expect(result.name).toEqual('updated_product');
        expect(result.price).toEqual(120);
        expect(result.created_by).toEqual('product_test_user');
    });
    it('delete method should delete specific product', async () => {
        const result = await store.delete(createdUser.id);
        expect(result).toEqual(undefined);
    });
});
