import { number, string, z, ZodType } from "zod";

export class CommentsValidation {
  static readonly CommentsRequest: ZodType = z.object({
    postId: number().min(1).int(),
    name: string().min(1).max(100),
    email: string().min(1).max(100),
    body: string().min(1),
  });

  static readonly CommentChangePostIdRequest: ZodType = z.object({
    postId: number().min(1).int(),
  });
}
