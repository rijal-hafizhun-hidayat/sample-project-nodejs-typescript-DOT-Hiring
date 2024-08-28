import { NextFunction, Request, Response } from "express";
import { TodosService } from "../service/todos-service";
import { TodosRequest } from "../model/todos-model";
import { number } from "zod";

export class TodosController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await TodosService.getAll();
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
}
