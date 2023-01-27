import request from 'supertest';
import app from '../server';

describe("GET API '/'", () => {
  it('should return Hello, world!', async () => {
    const res = await request(app).get('/').send('Hello, world!');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Hello World!');
  });
});

describe('users API response', () => {
  const url = '/api/v1/users';
  const test_user_2 = { username: 'test_user_2', password: 'test_password_2' };
  it('should create new user and send token when sending credentials to create url', async () => {
    const res = await request(app)
      .post(url + '/')
      .send(test_user_2);
    console.log(res.headers);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).not.toBeNull();
    expect(res.body.username).toEqual('test_user_2');
  });
  it('index method should return list of items', async () => {
    const res = await request(app).get(url);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
  it('should return proper user and send token when using login method ', async () => {
    const res = await request(app)
      .post(url + '/login')
      .send(test_user_2);
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).not.toBeNull();
    expect(res.body.username).toEqual('test_user_2');
  });
});

describe('items API response', () => {
  const url = '/api/v1/items';
  const test_item_2 = { name: 'test_item_2', price: 100 };
  it('should create new item at post endpoint', async () => {
    const res = await request(app)
      .post(url + '/')
      .send(test_item_2);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).not.toBeNull();
    expect(res.body.name).toEqual('test_item_2');
  });
  it('index method should return list of items', async () => {
    const res = await request(app).get(url);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
  it('should return proper item when requested by proper endpoint', async () => {
    const res = await request(app).get(url + '/2');
    expect(res.statusCode).toBe(200);
    expect(res.body.token).not.toBeNull();
    expect(res.body.name).toEqual('test_item_2');
  });
});
