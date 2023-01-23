import { Request, Response } from 'express';

export const getAllItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.send('get all items');
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export const createItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.send('create new item');
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export const getItem = async (req: Request, res: Response): Promise<void> => {
  try {
    res.send('get one item');
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
    res.send('delete item');
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
