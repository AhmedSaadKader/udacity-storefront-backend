import { NextFunction, Request, Response } from 'express';
import { RequestAuth } from '../../types';
import { ItemStore } from '../models/Item';

const itemStore = new ItemStore();

export const getAllItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allItems = await itemStore.index();
    res.json(allItems);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export const createItem = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, price } = req.body;
  console.log(req.user?.username as string);
  try {
    const newItem = await itemStore.create(
      name,
      price,
      req.user?.username as string
    );
    res.json(newItem);
  } catch (error) {
    next(error);
  }
};

export const getItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await itemStore.show(req.params.id);
    console.log(item);
    res.json(item);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export const deleteItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const item = await itemStore.delete(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export const updateItem = async (
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
