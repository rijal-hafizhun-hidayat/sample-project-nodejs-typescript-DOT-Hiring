import { NextFunction, Request, Response } from "express";
import { PostsService } from "../service/posts-service";
import { PostRequest } from "../model/posts-model";

export class PostsController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PostsService.getAll();
      return res.status(200).json({
        data: result.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    try {
      const request: PostRequest = req.body as PostRequest;
      const result = await PostsService.store(request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findByPostId(req: Request, res: Response, next: NextFunction) {
    try {
      const postId: number = parseInt(req.params.postId);
      const result = await PostsService.findByPostId(postId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateByPostId(req: Request, res: Response, next: NextFunction) {
    try {
      const postId: number = parseInt(req.params.postId);
      const request: PostRequest = req.body as PostRequest;
      const result = await PostsService.updatePostsByPostId(postId, request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyByPostId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const postId: number = parseInt(req.params.postId);
      const result = await PostsService.destroyByPostId(postId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async changeUserIdByPostId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const postId: number = parseInt(req.params.postId);
      const request: PostRequest = req.body as PostRequest;
      const result = await PostsService.changeUserIdByPostId(postId, request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
