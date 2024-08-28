import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  TodosRequest,
  TodosResponse,
  toTodosResponse,
} from "../model/todos-model";
import { TodosValidation } from "../validation/todos-validation";
import { Validation } from "../validation/validation";

export class TodosService {
  static async getAll(): Promise<any> {
    const todos = await prisma.todo.findMany({});

    return todos;
  }

  static async store(request: TodosRequest): Promise<TodosResponse> {
    const requestBody: TodosRequest = Validation.validate(
      TodosValidation.TodosRequest,
      request
    );

    const isUserExist = await prisma.users.findUnique({
      where: {
        id: requestBody.userId,
      },
    });

    if (!isUserExist) {
      throw new ErrorResponse(404, "user not found");
    }

    const [todo] = await prisma.$transaction([
      prisma.todo.create({
        data: {
          userId: requestBody.userId,
          title: requestBody.title,
          completed: requestBody.completed,
        },
      }),
    ]);

    return toTodosResponse(todo);
  }

  static async findByTodoId(todoId: number): Promise<TodosResponse> {
    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!todo) {
      throw new ErrorResponse(404, "todo not found");
    }

    return toTodosResponse(todo);
  }

  static async updateByTodoId(
    todoId: number,
    request: TodosRequest
  ): Promise<TodosResponse> {
    const requestBody: TodosRequest = Validation.validate(
      TodosValidation.TodosRequest,
      request
    );

    const isUserExist = await prisma.users.findUnique({
      where: {
        id: requestBody.userId,
      },
    });

    if (!isUserExist) {
      throw new ErrorResponse(404, "user not found");
    }

    const [todo] = await prisma.$transaction([
      prisma.todo.update({
        where: {
          id: todoId,
        },
        data: {
          userId: requestBody.userId,
          title: requestBody.title,
          completed: requestBody.completed,
        },
      }),
    ]);

    return toTodosResponse(todo);
  }

  static async destroyByTodoId(todoId: number): Promise<TodosResponse> {
    const isTodoExists = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!isTodoExists) {
      throw new ErrorResponse(404, "todo not found");
    }

    const [todo] = await prisma.$transaction([
      prisma.todo.delete({
        where: {
          id: todoId,
        },
      }),
    ]);

    return toTodosResponse(todo);
  }
}
