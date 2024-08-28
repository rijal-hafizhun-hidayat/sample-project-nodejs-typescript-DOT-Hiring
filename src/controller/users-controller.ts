import { NextFunction, Request, Response } from "express";
import { UsersService } from "../service/users-service";

export class UsersController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UsersService.getAll();
      return res.status(200).json({
        data: result.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeFromApi(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UsersService.storeFromApi();
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
