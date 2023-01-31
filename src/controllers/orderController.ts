import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../types';
import { OrderModel } from '../models/Order';

const order = new OrderModel();

export const getAllOrders = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const get_all_orders = await order.index();
    res.json(get_all_orders);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const order_created = await order.create(
      req.body.status,
      req.user?.id as number
    );
    res.json(order_created);
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const get_order = await order.show(req.params.orderId);
    res.json(get_order);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
): Promise<void> => {
  try {
    const updatedOrder = await order.update(
      req.params.orderId,
      req.body.status
    );
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

export const addProductToOrder = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orderId = req.params.orderId;
    const { quantity, productId } = req.body;
    if (!quantity || !productId) {
      throw new Error('Please provide product id and quantity');
    }
    const order_product = await order.addProduct(quantity, orderId, productId);
    res.json(order_product);
  } catch (error) {
    next(error);
  }
};
