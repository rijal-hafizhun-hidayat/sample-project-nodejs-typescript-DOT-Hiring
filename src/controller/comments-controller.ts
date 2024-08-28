import { NextFunction, Request, Response } from "express";
import { CommentsService } from "../service/comments-service";
import { CommentsRequest } from "../model/comments-model";

export class CommentsController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await CommentsService.getAll();
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CommentsRequest = req.body as CommentsRequest;
      const result = await CommentsService.store(request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findByCommentId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commentId: number = parseInt(req.params.commentId);
      const result = await CommentsService.findByCommentId(commentId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateByCommentId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commentId: number = parseInt(req.params.commentId);
      const request: CommentsRequest = req.body as CommentsRequest;
      const result = await CommentsService.updateByCommentId(
        commentId,
        request
      );

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyByCommentId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commentId: number = parseInt(req.params.commentId);
      const result = await CommentsService.destroyByCommentId(commentId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async changePostIdNyCommentId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commentId: number = parseInt(req.params.commentId);
      const request: CommentsRequest = req.body as CommentsRequest;
      const result = await CommentsService.changePostIdByCommentId(
        commentId,
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
