import { NextFunction, Request, Response } from "express";
import { PhotosQuery, PhotosRequest } from "../model/photos-model";
import { PhotosService } from "../service/photos-service";

export class PhotosController {
  static async getAllByAlbumId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: PhotosQuery = req.query as PhotosQuery;
      const result = await PhotosService.getAllByAlbumId(request);
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    try {
      const request: PhotosRequest = req.body as PhotosRequest;
      const result = await PhotosService.store(request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findByPhotoId(req: Request, res: Response, next: NextFunction) {
    try {
      const photoId: number = parseInt(req.params.photoId);
      const result = await PhotosService.findByPhotoId(photoId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateByPhotoId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const photoId: number = parseInt(req.params.photoId);
      const request: PhotosRequest = req.body as PhotosRequest;
      const result = await PhotosService.updateByPhotoId(photoId, request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyByPhotoId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const photoId: number = parseInt(req.params.photoId);
      const result = await PhotosService.destroyByPhotoId(photoId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
