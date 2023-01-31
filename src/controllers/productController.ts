import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../types';
import { ProductStore } from '../models/Product';
const productStore = new ProductStore();

export const getAllProducts = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allProducts = await productStore.index();
    res.json(allProducts);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, price, category } = req.body;
  try {
    const newProduct = await productStore.create(
      name,
      price,
      category,
      req.user?.username as string
    );
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productStore.show(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productStore.delete(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productStore.show(req.params.id);
    const newName = req.body.name || product.name;
    const newPrice = req.body.price || product.price;
    const newProduct = await productStore.update(
      req.params.id,
      newName,
      newPrice
    );
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
};
