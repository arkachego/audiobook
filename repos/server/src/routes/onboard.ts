import { Request, Response } from 'express';
import { onboardUser } from '../services/onboard';

const handler = async (req: Request, res: Response) => {
  const user = await onboardUser(req.body.name);
  res.status(201).json(user);
};

export default handler;
