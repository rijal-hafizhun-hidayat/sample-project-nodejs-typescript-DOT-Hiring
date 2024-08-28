import { NextFunction, Request, Response } from "express";

export class UsersController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        data: "hello world",
      });
    } catch (error) {
      next(error);
    }
  }
}
