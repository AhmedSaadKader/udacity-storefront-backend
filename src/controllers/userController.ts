import { create } from 'domain';
import { Request, Response } from 'express';
import { UserModel } from '../models/user';

const user = new UserModel();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await user.index();
    res.json(allUsers);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;
  try {
    const newUser = await user.create({ username, password });
    res.json(newUser);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const createdUser = await user.show(req.params.id);
    res.json(createdUser);
  } catch (error) {
    res.status(400);
    res.json(error);
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
