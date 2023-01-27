import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { RequestAuth } from '../../types/index';

const auth = async (req: RequestAuth, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new Error('Authentication invalid');
  }
  const token = authHeader.split(' ')[1];
  try {
    const tokenVerified: object = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as JwtPayload;
    req.user = { ...tokenVerified };
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
