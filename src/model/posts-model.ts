import { post } from "@prisma/client";

export type PostRequest = {
  userId: number;
  title?: string;
  body?: string;
};

export type PostQuery = {
  userId?: string;
};

export type PostResponse = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export function toPostResponse(post: post): PostResponse {
  return {
    id: post.id,
    userId: post.userId,
    title: post.title,
    body: post.body,
  };
}
