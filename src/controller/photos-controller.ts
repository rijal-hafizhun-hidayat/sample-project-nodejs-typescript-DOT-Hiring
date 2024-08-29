import { NextFunction, Request, Response } from "express";
import {
  PhotosQuery,
  PhotosRequest,
  PhotosResponse,
} from "../model/photos-model";
import { PhotosService } from "../service/photos-service";
import { AlbumsQuery } from "../model/album-model";
import { AxiosResponse } from "axios";

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

  static async patchByPhotoId(req: Request, res: Response, next: NextFunction) {
    try {
      const photoId: number = parseInt(req.params.photoId);
      const request: PhotosRequest = req.body as PhotosRequest;
      const result: PhotosResponse = await PhotosService.patchByPhotoId(
        photoId,
        request
      );

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllFromApi(req: Request, res: Response, next: NextFunction) {
    try {
      const query: PhotosQuery = req.query as PhotosQuery;
      const result: AxiosResponse = await PhotosService.getAllFromApi(query);
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeFromApi(req: Request, res: Response, next: NextFunction) {
    try {
      const request: PhotosRequest = req.body as PhotosRequest;
      const result: AxiosResponse = await PhotosService.storeFromApi(request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findByPhotoIdFromApi(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const photoId: number = parseInt(req.params.photoId);
      const result: AxiosResponse = await PhotosService.findByPhotoIdFromApi(
        photoId
      );

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateByPhotoIdFromApi(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const photoId: number = parseInt(req.params.photoId);
      const request: PhotosRequest = req.body as PhotosRequest;
      const result: AxiosResponse = await PhotosService.updateByPhotoIdFromApi(
        photoId,
        request
      );
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyByPhotoIdFromApi(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const photoId: number = parseInt(req.params.photoId);
      const result: AxiosResponse = await PhotosService.destroyByPhotoIdFromApi(
        photoId
      );

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async patchByPhotoIdFromApi(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const photoId: number = parseInt(req.params.photoId);
      const request: PhotosRequest = req.body as PhotosRequest;
      const result: AxiosResponse = await PhotosService.patchByPhotoIdFromApi(
        photoId,
        request
      );

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
