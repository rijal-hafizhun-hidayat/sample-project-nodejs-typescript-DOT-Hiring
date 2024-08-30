import { NextFunction, Request, Response } from "express";
import { MigrationService } from "../service/migration-service";

export class MigrationController {
  static async migrationUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await MigrationService.migrationUsers();
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async migrationPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await MigrationService.migrationPosts();
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
