import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../../types';
import { DashboardQueries } from './dashboard';

const dashboard = new DashboardQueries();

export const items_in_orders = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await dashboard.itemsInOrders();
    res.json(result);
  } catch (err) {
    next(err);
  }
};
