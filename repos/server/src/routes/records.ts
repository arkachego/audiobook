import { NextFunction, Request, Response } from 'express';
import { fetchRecords } from '../services/record';
import userIdValidator from "../validators/user-id";

const handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userIdValidator.validateAsync(req.params);
    const records = await fetchRecords(req.params.id);
    res.status(200).send(records);
  }
  catch (error) {
    next(error);
  }
};

export default handler;
