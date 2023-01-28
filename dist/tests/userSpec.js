"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const user = new User_1.UserModel();
describe('UserModel', () => {
    it('should have an index method', () => {
        expect(user.index).toBeDefined();
    });
    it('should have a authenticateUser method', () => {
        expect(user.authenticateUser).toBeDefined();
    });
    it('should have a create method', () => {
        expect(user.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(user.delete).toBeDefined();
    });
    it('create method should create a new user', async () => {
        const result = await user.create({
            username: 'test_user',
            password: 'test_password_100'
        });
        expect(result.username).toEqual('test_user');
    });
    it('index method should return list of users', async () => {
        const result = await user.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
    it('authenticateUser method should return user if credentials are right', async () => {
        const result = await user.authenticateUser('test_user', 'test_password_100');
        expect(result.username).toEqual('test_user');
    });
    it('delete method should delete specific user', async () => {
        const result = await user.delete('test_user');
        expect(result).toEqual(undefined);
    });
});
