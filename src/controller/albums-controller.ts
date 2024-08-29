import { NextFunction, Request, Response } from "express";
import { AlbumsService } from "../service/albums-service";
import {
  AlbumsQuery,
  AlbumsRequest,
  AlbumsResponse,
} from "../model/album-model";
import { AxiosResponse } from "axios";

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
      const result: AlbumsResponse = await AlbumsService.store(request);

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
      const result: AlbumsResponse = await AlbumsService.findByAlbumId(albumId);

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
      const result: AlbumsResponse = await AlbumsService.destoryByAlbumId(
        albumId
      );

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
      const result: AlbumsResponse = await AlbumsService.updateByAlbumId(
        albumId,
        request
      );

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async patchByAlbumId(req: Request, res: Response, next: NextFunction) {
    try {
      const albumId: number = parseInt(req.params.albumId);
      const request: AlbumsRequest = req.body as AlbumsRequest;
      const result: AlbumsResponse = await AlbumsService.patchByAlbumId(
        albumId,
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
      const query: AlbumsQuery = req.query as AlbumsQuery;
      const result: AxiosResponse = await AlbumsService.getAllFromApi(query);
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeFromApi(req: Request, res: Response, next: NextFunction) {
    try {
      const request: AlbumsRequest = req.body as AlbumsRequest;
      const result: AxiosResponse = await AlbumsService.storeFromApi(request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findByAlbumIdFromApi(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const albumId: number = parseInt(req.params.albumId);
      const result: AxiosResponse = await AlbumsService.findByAlbumIdFromApi(albumId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateByAlbumIdFromApi(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const albumId: number = parseInt(req.params.albumId);
      const request: AlbumsRequest = req.body as AlbumsRequest;
      const result: AxiosResponse = await AlbumsService.updateByAlbumIdFromApi(
        albumId,
        request
      );

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyByAlbumIdFromApi(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const albumId: number = parseInt(req.params.albumId);
      const result: AxiosResponse = await AlbumsService.destroyByAlbumIdFromApi(albumId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async patchByAlbumIdFromApi(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const albumId: number = parseInt(req.params.albumId);
      const request: AlbumsRequest = req.body as AlbumsRequest;
      const result: AxiosResponse = await AlbumsService.patchByAlbumIdFromApi(
        albumId,
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
