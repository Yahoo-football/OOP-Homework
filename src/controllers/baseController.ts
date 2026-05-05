import { Response } from "express";

export abstract class BaseController {
  protected sendSuccess<T>(
    res: Response,
    data: T,
    statusCode = 200
  ): void {
    res.status(statusCode).json(data);
  }

  protected sendError(
    res: Response,
    statusCode: number,
    message: string,
    details?: unknown
  ): void {
    res.status(statusCode).json({
      message,
      ...(details !== undefined ? { details } : {}),
    });
  }
}
