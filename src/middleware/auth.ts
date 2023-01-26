import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface RequestAuth extends Request {
  user: object;
}

const auth = async (req: RequestAuth, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new Error('Authentication invalid');
  }
  const token = authHeader.split('')[1];
  try {
    const tokenVerified = jwt.verify(token, process.env.TOKEN_SECRET as string);
    console.log(tokenVerified);
    req.user = { tokenVerified };
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
