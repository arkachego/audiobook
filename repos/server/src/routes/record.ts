import { Request, Response } from 'express';
import { fetchRecords } from '../services/record';

const handler = async (req: Request, res: Response) => {
  const records = await fetchRecords(req.params.id);
  res.status(200).json(records);
};

export default handler;
