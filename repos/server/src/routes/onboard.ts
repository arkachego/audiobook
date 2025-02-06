import { NextFunction, Request, Response } from 'express';
import { onboardUser } from '../services/user';
import onboardValidator from "../validators/onboard";

const handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await onboardValidator.validateAsync(req.body);
    const user = await onboardUser(req.body.name);
    res.status(201).send(user);
  }
  catch (error) {
    next(error);
  }
};

export default handler;
