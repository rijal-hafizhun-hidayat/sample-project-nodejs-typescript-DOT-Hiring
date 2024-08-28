import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
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
  ): Promise<CommentsRequest> {
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

  static async changePostIdByCommentId(
    commentId: number,
    request: CommentsRequest
  ): Promise<CommentResponse> {
    const requestBody: CommentsRequest = Validation.validate(
      CommentsValidation.CommentChangePostIdRequest,
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
        },
      }),
    ]);

    return toCommentResponse(comment);
  }
}
