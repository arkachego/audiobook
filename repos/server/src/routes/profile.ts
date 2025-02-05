import { Request, Response } from 'express';
import { fetchUser } from '../services/user';

const handler = async (req: Request, res: Response) => {
  const user = await fetchUser(req.params.id);
  res.status(200).send(user);
};

export default handler;
