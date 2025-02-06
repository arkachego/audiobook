import { NextFunction, Request, Response } from 'express';
import { fetchUser } from '../services/user';
import userIdValidator from "../validators/user-id";

const handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userIdValidator.validateAsync(req.params);
    const user = await fetchUser(req.params.id);
    res.status(200).send(user);
  }
  catch (error) {
    next(error);
  }
};

export default handler;
