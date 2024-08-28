import { NextFunction, Request, Response } from "express";
import { AlbumsService } from "../service/albums-service";
import { AlbumsRequest } from "../model/album-model";

export class AlbumsController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AlbumsService.getAll();
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    try {
      const request: AlbumsRequest = req.body as AlbumsRequest;
      const result = await AlbumsService.store(request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findByAlbumId(req: Request, res: Response, next: NextFunction) {
    try {
      const albumId: number = parseInt(req.params.albumId);
      const result = await AlbumsService.findByAlbumId(albumId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyByAlbumId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const albumId: number = parseInt(req.params.albumId);
      const result = await AlbumsService.destoryByAlbumId(albumId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateByAlbumId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const albumId: number = parseInt(req.params.albumId);
      const request: AlbumsRequest = req.body as AlbumsRequest;
      const result = await AlbumsService.updateByAlbumId(albumId, request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
