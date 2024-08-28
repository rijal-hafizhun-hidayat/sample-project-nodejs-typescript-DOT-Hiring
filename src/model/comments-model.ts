import { comment } from "@prisma/client";

export type CommentsRequest = {
  postId: number;
  name?: string;
  email?: string;
  body?: string;
};

export type CommentResponse = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

export function toCommentResponse(comment: comment): CommentResponse {
  return {
    id: comment.id,
    postId: comment.postId,
    name: comment.name,
    email: comment.email,
    body: comment.body,
  };
}
