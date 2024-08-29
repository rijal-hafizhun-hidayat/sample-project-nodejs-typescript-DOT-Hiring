import axios, { Axios, AxiosResponse } from "axios";
import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  CommentQuery,
  CommentResponse,
  CommentsRequest,
  toCommentResponse,
} from "../model/comments-model";
import { CommentsValidation } from "../validation/comments-validation";
import { Validation } from "../validation/validation";

export class CommentsService {
  static async getAll(): Promise<any> {
    const comments = await prisma.comment.findMany({});

    return comments;
  }

  static async store(request: CommentsRequest): Promise<CommentResponse> {
    const requestBody: CommentsRequest = Validation.validate(
      CommentsValidation.CommentsRequest,
      request
    );

    const isPostExists = await prisma.post.findUnique({
      where: {
        id: requestBody.postId,
      },
    });

    if (!isPostExists) {
      throw new ErrorResponse(404, "post not found");
    }

    const [comment] = await prisma.$transaction([
      prisma.comment.create({
        data: {
          postId: requestBody.postId,
          name: requestBody.name!,
          email: requestBody.email!,
          body: requestBody.body!,
        },
      }),
    ]);

    return toCommentResponse(comment);
  }

  static async findByCommentId(commentId: number): Promise<CommentResponse> {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new ErrorResponse(404, "comments not found");
    }

    return toCommentResponse(comment);
  }

  static async updateByCommentId(
    commentId: number,
    request: CommentsRequest
  ): Promise<CommentResponse> {
    const requestBody: CommentsRequest = Validation.validate(
      CommentsValidation.CommentsRequest,
      request
    );

    const isPostExists = await prisma.post.findUnique({
      where: {
        id: requestBody.postId,
      },
    });

    if (!isPostExists) {
      throw new ErrorResponse(404, "post not found");
    }

    const [comment] = await prisma.$transaction([
      prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          postId: requestBody.postId,
          name: requestBody.name,
          email: requestBody.email,
          body: requestBody.body,
        },
      }),
    ]);

    return toCommentResponse(comment);
  }

  static async destroyByCommentId(commentId: number): Promise<CommentResponse> {
    const isCommentExists = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!isCommentExists) {
      throw new ErrorResponse(404, "comments not found");
    }

    const [comment] = await prisma.$transaction([
      prisma.comment.delete({
        where: {
          id: commentId,
        },
      }),
    ]);

    return toCommentResponse(comment);
  }

  static async patchByCommentId(
    commentId: number,
    request: CommentsRequest
  ): Promise<CommentResponse> {
    const [comment] = await prisma.$transaction([
      prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          postId: request.postId,
          name: request.name,
          email: request.email,
          body: request.body,
        },
      }),
    ]);

    return toCommentResponse(comment);
  }

  static async getAllFromApi(query: CommentQuery): Promise<AxiosResponse> {
    const queryParams: any = {};

    if (query.postId) {
      queryParams.params = {};
      queryParams.params.postId = query.postId;
    }
    const comments: AxiosResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/comments",
      queryParams
    );

    return comments.data;
  }

  static async storeFromApi(request: CommentsRequest): Promise<AxiosResponse> {
    const requestBody: CommentsRequest = Validation.validate(
      CommentsValidation.CommentsRequest,
      request
    );

    const comments: AxiosResponse = await axios.post(
      "https://jsonplaceholder.typicode.com/comments",
      {
        postId: requestBody.postId,
        name: requestBody.name,
        email: requestBody.email,
        body: requestBody.body,
      }
    );

    return comments.data;
  }

  static async findByCommentIdFromApi(
    commentId: number
  ): Promise<AxiosResponse> {
    const comment: AxiosResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/comments/${commentId}`
    );

    return comment.data;
  }

  static async updateByCommentIdFromApi(
    commentId: number,
    request: CommentsRequest
  ): Promise<AxiosResponse> {
    const requestBody: CommentsRequest = Validation.validate(
      CommentsValidation.CommentsRequest,
      request
    );

    const comment: AxiosResponse = await axios.put(
      `https://jsonplaceholder.typicode.com/comments/${commentId}`,
      {
        postId: requestBody.postId,
        name: requestBody.name,
        email: requestBody.email,
        body: requestBody.body,
      }
    );

    return comment.data;
  }

  static async destroyByCommentIdFromApi(
    commentId: number
  ): Promise<AxiosResponse> {
    const comment: AxiosResponse = await axios.delete(
      `https://jsonplaceholder.typicode.com/comments/${commentId}`
    );

    return comment.data;
  }

  static async patchByCommentIdFromApi(
    commentId: number,
    request: CommentsRequest
  ): Promise<AxiosResponse> {
    const comment: AxiosResponse = await axios.patch(
      `https://jsonplaceholder.typicode.com/comments/${commentId}`,
      {
        postId: request.postId,
        name: request.name,
        email: request.email,
        body: request.body,
      }
    );

    return comment.data;
  }
}
