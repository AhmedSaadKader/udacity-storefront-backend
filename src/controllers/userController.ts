import { NextFunction, Request, Response } from 'express';
import { UserModel, User } from '../models/User';
import dotenv from 'dotenv';
import { RequestAuth } from '../../types';

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
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body;
  try {
    if (await user.usernameExists(username)) {
      throw new Error('username already exists. Please login instead');
    }
    const newUser = await user.create({ username, password });
    const token = user.createJWT(newUser.id as string, newUser.username);
    res.json({ token, username: newUser.username, id: newUser.id });
  } catch (error) {
    next(error);
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
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const username = req.user?.username as string;
    const getUser = await user.usernameExists(req.params.username);
    if (username !== getUser?.username) {
      throw new Error('Unauthorized to delete this user');
    }
    const deletedUser = await user.delete(req.params.username);
    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const username = req.user?.username as string;
    const userId = parseInt(req.params.id);
    const getUser = await user.usernameExists(username);
    if (userId !== getUser?.id) {
      throw new Error('Unauthorized to edit this user');
    }
    const newUsername = req.body.username;
    if (!newUsername || newUsername === getUser?.username) {
      throw new Error('Please provide a new username');
    }
    if (await user.usernameExists(newUsername)) {
      throw new Error('Username already in use. Please provide a new username');
    }
    const updateUser = await user.update(userId, newUsername);
    res.json(updateUser);
  } catch (error) {
    res.status(400);
    next(error);
  }
};
