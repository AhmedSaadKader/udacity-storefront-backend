import { NextFunction, Request, Response } from 'express';
import { UserModel, User } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const user = new UserModel();

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<UserModel | void> => {
  try {
    const allUsers = await user.index();
    res.json(allUsers);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;
  try {
    const newUser = await user.create({ username, password });
    const token = user.createJWT(newUser.id as string, newUser.username);
    res.json({ token, username: newUser.username, id: newUser.id });
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new Error('Please provide all values');
  }
  try {
    const createdUser = await user.authenticateUser(username, password);
    const token = user.createJWT(
      (createdUser as User).id as string,
      (createdUser as User).username
    );
    res.json({
      token,
      username: (createdUser as User).username,
      id: (createdUser as User).id
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedUser = await user.delete(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.send('update item');
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
