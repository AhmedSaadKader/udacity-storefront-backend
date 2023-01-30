"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const test_user_2 = { username: 'test_user_2', password: 'test_password_2' };
describe("GET API '/'", () => {
    it('should return Hello, world!', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/').send('Hello, world!');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Hello World!');
    });
});
describe('users API response for endpoints without auth', () => {
    const url = '/api/v1/users';
    it('should create new user and send token when sending credentials to create url', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post(url + '/')
            .send(test_user_2);
        expect(res.statusCode).toBe(200);
        expect(res.body.token).not.toBeNull();
        expect(res.body.username).toEqual('test_user_2');
    });
    it('index method should return list of items', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get(url);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
    it('should return proper user and send token when using login method ', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post(url + '/login')
            .send(test_user_2);
        expect(res.statusCode).toBe(200);
        expect(res.body.token).not.toBeNull();
        expect(res.body.username).toEqual('test_user_2');
    });
});
describe('users API response with auth for deleting and updating users', () => {
    const url = '/api/v1/users';
    let token;
    const test_user_3 = {
        username: 'test_user_3',
        password: 'test_password_3'
    };
    it('should return error at update endpoint if not authorized', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .patch(url + '/3')
            .send({ username: 'updated_username' });
        expect(res.statusCode).toBe(401);
        expect(res.text).toBe('Authentication invalid');
        expect(res.body.token).toBeUndefined();
    });
    it('should return error at delete endpoint if not authorized', async () => {
        const res = await (0, supertest_1.default)(server_1.default).delete(url + '/3');
        expect(res.statusCode).toBe(401);
        expect(res.text).toBe('Authentication invalid');
        expect(res.body.token).toBeUndefined();
    });
    it('should update user at update endpoint', async () => {
        const register = await (0, supertest_1.default)(server_1.default).post(url).send(test_user_3);
        token = register.body.token;
        const res = await (0, supertest_1.default)(server_1.default)
            .patch(url + `/${register.body.id}`)
            .send({ username: 'updated_username' })
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.username).toEqual('updated_username');
    });
    it('should delete user at delete endpoint', async () => {
        const login = await (0, supertest_1.default)(server_1.default)
            .post(url + '/login')
            .send({ username: 'updated_username', password: 'test_password_3' });
        token = login.body.token;
        const res = await (0, supertest_1.default)(server_1.default)
            .delete(url + '/updated_username')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.username).toEqual(undefined);
    });
});
describe('items API response', () => {
    const url = '/api/v1/items';
    const test_item_2 = {
        name: 'test_item_2',
        price: 100,
        created_by: 'test_user_2'
    };
    let token;
    beforeAll(async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post('/api/v1/users/login')
            .send(test_user_2);
        token = res.body.token;
    });
    it('should create new item at post endpoint', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post(url + '/')
            .send(test_item_2)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toEqual('test_item_2');
    });
    it('index method should return list of items', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get(url);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
    it('should return proper item when requested by proper endpoint', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get(url + '/3');
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toEqual('test_item_2');
    });
    it('should update item with name only on update endpoint', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .patch(url + '/3')
            .send({ name: 'updated_item' })
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toEqual('updated_item');
        expect(res.body.price).toEqual(test_item_2.price);
    });
    it('should update item with price only on update endpoint', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .patch(url + '/3')
            .send({ price: 200 })
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toEqual('updated_item');
        expect(res.body.price).toEqual(200);
    });
    it('should update item with name and price only on update endpoint', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .patch(url + '/3')
            .send({ name: 'updated_item_3', price: 300 })
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toEqual('updated_item_3');
        expect(res.body.price).toEqual(300);
    });
    it('should return error at delete endpoint if not authorized', async () => {
        const res = await (0, supertest_1.default)(server_1.default).delete(url + '/4');
        expect(res.statusCode).toBe(401);
        expect(res.text).toBe('Authentication invalid');
        expect(res.body.token).toBeUndefined();
    });
    it('should delete item at delete endpoint', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .delete(url + '/3')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toEqual(undefined);
    });
});
describe('orders API response', () => {
    const url = '/api/v1/orders';
    let token;
    let user_logged_id;
    let order_created_id;
    it('should return authorization error if proper authorization is missing', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get(url);
        expect(res.statusCode).toBe(401);
        expect(res.text).toBe('Authentication invalid');
        expect(res.body.token).toBeUndefined();
    });
    beforeAll(async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post('/api/v1/users/login')
            .send(test_user_2);
        token = res.body.token;
        user_logged_id = res.body.id;
    });
    it('should create new order at post endpoint', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post(url)
            .send({ status: 'pending', user_id: user_logged_id })
            .set('Authorization', `Bearer ${token}`);
        order_created_id = res.body.id;
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('pending');
    });
    it('should get all orders at get order endpoint', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .get(url)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
    it('should get specific order at get order endpoint', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .get(url + `/${order_created_id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toEqual('pending');
    });
    it('should update order status with update endpoint', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .patch(url + `/${order_created_id}`)
            .send({ status: 'completed' })
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toEqual('completed');
    });
    it('should add item to order at add item endpoint', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post(url + `/${order_created_id}/products`)
            .send({ quantity: 10, itemId: 2 })
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.quantity).toEqual(10);
        expect(res.body.order_id).toEqual(order_created_id);
        expect(res.body.item_id).toEqual(2);
    });
});
