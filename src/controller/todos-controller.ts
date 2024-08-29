import { NextFunction, Request, Response } from "express";
import { TodosService } from "../service/todos-service";
import { TodosQuery, TodosRequest } from "../model/todos-model";
import { PostQuery } from "../model/posts-model";

export class TodosController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query: PostQuery = req.query as PostQuery;
      const result = await TodosService.getAll(query);
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    try {
      const request: TodosRequest = req.body as TodosRequest;
      const result = await TodosService.store(request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findByTodoId(req: Request, res: Response, next: NextFunction) {
    try {
      const todoId: number = parseInt(req.params.todoId);
      const result = await TodosService.findByTodoId(todoId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateByTodoId(req: Request, res: Response, next: NextFunction) {
    try {
      const todoId: number = parseInt(req.params.todoId);
      const request: TodosRequest = req.body as TodosRequest;
      const result = await TodosService.updateByTodoId(todoId, request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyByTodoId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const todoId: number = parseInt(req.params.todoId);
      const result = await TodosService.destroyByTodoId(todoId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllFromApi(req: Request, res: Response, next: NextFunction) {
    try {
      const query: TodosQuery = req.query as TodosQuery;
      const result = await TodosService.getAllFromApi(query);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeFromApi(req: Request, res: Response, next: NextFunction) {
    try {
      const request: TodosRequest = req.body as TodosRequest;
      const result = await TodosService.storeFromApi(request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findByTodosIdFromApi(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const todoId: number = parseInt(req.params.todoId);
      const result = await TodosService.findByTodosIdFromApi(todoId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateByTodosIdFromApi(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const todoId: number = parseInt(req.params.todoId);
      const request: TodosRequest = req.body as TodosRequest;
      const result = await TodosService.updateByTodosIdFromApi(todoId, request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async patchByTodoIdFromApi(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const todoId: number = parseInt(req.params.todoId);
      const request: TodosRequest = req.body as TodosRequest;
      const result = await TodosService.patchByTodosIdFromApi(
        todoId,
        request
      );

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyByTodosIdFromApi(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const todoId: number = parseInt(req.params.todoId);
      const result = await TodosService.destroyByTodosIdFromApi(todoId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async patchByTodoId(req: Request, res: Response, next: NextFunction) {
    try {
      const todoId: number = parseInt(req.params.todoId);
      const request: TodosRequest = req.body as TodosRequest;
      const result = await TodosService.patchByTodosId(todoId, request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
