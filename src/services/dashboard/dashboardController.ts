import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../../types';
import { DashboardQueries } from './dashboard';
import { ProductStore } from '../../models/Product';

const dashboard = new DashboardQueries();
const productStore = new ProductStore();

export const products_in_orders = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await dashboard.productsInOrders();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const popular_products = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await dashboard.mostPopularProducts();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const productsByCategory = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const productsList = await productStore.getProductsByCategory(
      req.body.category
    );
    res.json(productsList);
  } catch (err) {
    next(err);
  }
};
