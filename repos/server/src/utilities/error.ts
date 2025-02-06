import { Request, Response, NextFunction } from "express";

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  let status = 500;
  if (error.name === 'ValidationError') {
    status = 400;
  }
  res.sendStatus(status);
};

export default errorHandler;
