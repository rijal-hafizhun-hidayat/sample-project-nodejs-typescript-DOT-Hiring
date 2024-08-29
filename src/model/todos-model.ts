import { todo } from "@prisma/client";

export type TodosRequest = {
  userId: number;
  title: string;
  completed: boolean;
};

export type TodosQuery = {
  userId?: number
}

export type TodosResponse = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

export function toTodosResponse(todo: todo): TodosResponse {
  return {
    id: todo.id,
    userId: todo.userId,
    title: todo.title,
    completed: todo.completed,
  };
}
