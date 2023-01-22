"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
describe("GET API '/'", () => {
    it('should return Hello, world!', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/').send('Hello, world!');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Hello World!');
    });
});
