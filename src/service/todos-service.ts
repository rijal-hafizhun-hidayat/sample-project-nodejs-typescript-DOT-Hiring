import axios, { AxiosResponse } from "axios";
import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  TodosQuery,
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

  static async getAllFromApi(query: TodosQuery): Promise<AxiosResponse> {
    const queryParams: any = {};

    if (query.userId) {
      queryParams.params = {};
      queryParams.params.userId = query.userId;
    }

    const todos: AxiosResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/todos",
      queryParams
    );

    return todos.data;
  }

  static async storeFromApi(request: TodosRequest): Promise<TodosResponse> {
    const requestBody: TodosRequest = Validation.validate(
      TodosValidation.TodosRequest,
      request
    );

    const todo: AxiosResponse = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        userId: requestBody.userId,
        title: requestBody.title,
        completed: requestBody.completed,
      }
    );

    return toTodosResponse(todo.data);
  }

  static async findByTodosIdFromApi(todoId: number): Promise<TodosResponse> {
    const todo: AxiosResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`
    );

    return toTodosResponse(todo.data);
  }

  static async updateByTodosIdFromApi(
    todoId: number,
    request: TodosRequest
  ): Promise<TodosResponse> {
    const requestBody: TodosRequest = Validation.validate(
      TodosValidation.TodosRequest,
      request
    );

    const todo: AxiosResponse = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
      {
        userId: requestBody.userId,
        title: requestBody.title,
        completed: requestBody.completed,
      }
    );

    return toTodosResponse(todo.data);
  }

  static async destroyByTodosIdFromApi(todoId: number): Promise<AxiosResponse> {
    const todo: AxiosResponse = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`
    );

    return todo.data;
  }
}
