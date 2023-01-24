import { User, UserModel } from '../models/user';

const user = new UserModel();

describe('UserModel', () => {
  it('should have an index method', () => {
    expect(user.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(user.show).toBeDefined();
  });
  it('should have a create method', () => {
    expect(user.create).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(user.delete).toBeDefined();
  });
  it('index method should return list of items', async () => {
    const result = await user.index();
    expect(result).toEqual([]);
  });
  it('create method should create a new item', async () => {
    const result = await user.create({
      username: 'test_user',
      password: 'test_password_100'
    });
    expect(result.username).toEqual('test_user');
  });
  it('authenticate method should return error if user does not exist', async () => {
    const result = await user.authenticate('no_user', 'test_password_100');
    expect(result).toBe('username unavailable');
  });
  it('authenticate method should return error if password is wrong', async () => {
    const result = await user.authenticate('test_user', 'wrong_password');
    expect(result).toBe('password is incorrect');
  });
  it('authenticate method should return user if credentials are right', async () => {
    const result = await user.authenticate('test_user', 'test_password_100');
    console.log(result);
    expect((result as User).username).toEqual('test_user');
  });
  it('show method should show specific item', async () => {
    const result = await user.show(1);
    expect(result.username).toEqual('test_user');
  });
  it('delete method should delete specific item', async () => {
    const result = await user.delete(1);
    expect(result).toEqual(undefined);
  });
});
