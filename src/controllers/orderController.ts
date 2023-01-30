import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../types';
import { OrderModel } from '../models/Order';

const order = new OrderModel();

export const getAllOrders = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send('getAllOrders');
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send('create Order');
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send('get Order');
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send('delete Order');
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send('update Order');
  } catch (error) {
    next(error);
  }
};

export const addProductToOrder = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.orderId;
    const { quantity, itemId } = req.body;
    const order_product = order.addProduct(quantity, orderId, itemId);
    res.json(order_product);
  } catch (error) {
    next(error);
  }
};
