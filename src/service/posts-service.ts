import axios, { AxiosResponse } from "axios";
import {
  PostQuery,
  PostRequest,
  PostResponse,
  toPostResponse,
} from "../model/posts-model";
import { Validation } from "../validation/validation";
import { PostsValidation } from "../validation/posts-validation";
import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import { any } from "zod";
import { title } from "process";

export class PostsService {
  static async getAll(): Promise<any> {
    const posts = await prisma.post.findMany({});

    return posts;
  }

  static async store(request: PostRequest): Promise<PostResponse> {
    const requestBody: PostRequest = Validation.validate(
      PostsValidation.PostsRequest,
      request
    );

    const isUserExist = await prisma.users.findUnique({
      where: {
        id: requestBody.userId,
      },
    });

    if (!isUserExist) {
      throw new ErrorResponse(404, "user not exists");
    }

    const [post] = await prisma.$transaction([
      prisma.post.create({
        data: {
          userId: requestBody.userId,
          title: requestBody.title!,
          body: requestBody.body!,
        },
      }),
    ]);

    return toPostResponse(post);
  }

  static async findByPostId(postId: number): Promise<PostResponse> {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new ErrorResponse(404, "post not found");
    }

    return toPostResponse(post);
  }

  static async updatePostsByPostId(
    postId: number,
    request: PostRequest
  ): Promise<PostResponse> {
    const requestBody: PostRequest = Validation.validate(
      PostsValidation.PostsRequest,
      request
    );

    const isPostExist = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!isPostExist) {
      throw new ErrorResponse(404, "post not found");
    }

    const [post] = await prisma.$transaction([
      prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          userId: requestBody.userId,
          title: requestBody.title,
          body: requestBody.body,
        },
      }),
    ]);

    return toPostResponse(post);
  }

  static async destroyByPostId(postId: number): Promise<PostResponse> {
    const isPostExist = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!isPostExist) {
      throw new ErrorResponse(404, "post not found");
    }

    const [post] = await prisma.$transaction([
      prisma.post.delete({
        where: {
          id: postId,
        },
      }),
    ]);

    return toPostResponse(post);
  }

  static async changeUserIdByPostId(
    postId: number,
    request: PostRequest
  ): Promise<PostResponse> {
    const requestBody: PostRequest = Validation.validate(
      PostsValidation.PostChangeUserIdValidation,
      request
    );
    const isPostExist = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!isPostExist) {
      throw new ErrorResponse(404, "post not found");
    }

    const [post] = await prisma.$transaction([
      prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          userId: requestBody.userId,
        },
      }),
    ]);

    return toPostResponse(post);
  }

  static async getAllFromApi(query: PostQuery): Promise<any> {
    const queryParams: any = {};

    if (query.userId) {
      queryParams.params = {};
      queryParams.params.userId = parseInt(query.userId);
    }

    const posts = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
      queryParams
    );

    return posts.data;
  }

  static async findByPostIdFromApi(postId: number): Promise<PostResponse> {
    const posts = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );

    return toPostResponse(posts.data);
  }

  static async updateByPostIdFromApi(
    postId: number,
    request: PostRequest
  ): Promise<PostResponse> {
    const requestBody: PostRequest = Validation.validate(
      PostsValidation.PostsRequest,
      request
    );

    const post: AxiosResponse = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        userId: requestBody.userId,
        title: requestBody.title,
        body: requestBody.body,
      }
    );

    return toPostResponse(post.data);
  }

  static async destroyByPostIdFromApi(postId: number): Promise<PostResponse> {
    const post: AxiosResponse = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );

    return toPostResponse(post.data);
  }
}
