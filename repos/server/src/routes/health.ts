import { Request, Response } from 'express';

const handler = (req: Request, res: Response) => {
  res.sendStatus(200);
};

export default handler;
