import { Request, Response } from 'express';
import { onboardUser } from '../services/user';

const handler = async (req: Request, res: Response) => {
  const user = await onboardUser(req.body.name);
  res.status(201).send(user);
};

export default handler;
