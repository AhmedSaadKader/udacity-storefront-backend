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
describe('users API response', () => {
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
        console.log(token);
    });
    it('should create new item at post endpoint', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post(url + '/')
            .send(test_item_2)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.token).not.toBeNull();
        expect(res.body.name).toEqual('test_item_2');
    });
    it('index method should return list of items', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get(url);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
    it('should return proper item when requested by proper endpoint', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get(url + '/2');
        expect(res.statusCode).toBe(200);
        expect(res.body.token).not.toBeNull();
        expect(res.body.name).toEqual('test_item_2');
    });
});
