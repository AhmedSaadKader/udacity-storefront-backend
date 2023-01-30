import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../types';
import { ItemStore } from '../models/Item';

const itemStore = new ItemStore();

export const getAllItems = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allItems = await itemStore.index();
    res.json(allItems);
  } catch (error) {
    next(error);
  }
};

export const createItem = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, price } = req.body;
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

export const getItem = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const item = await itemStore.show(req.params.id);
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const item = await itemStore.delete(req.params.id);
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const item = await itemStore.show(req.params.id);
    const newName = req.body.name || item.name;
    const newPrice = req.body.price || item.price;
    const newItem = await itemStore.update(req.params.id, newName, newPrice);
    res.json(newItem);
  } catch (error) {
    next(error);
  }
};
