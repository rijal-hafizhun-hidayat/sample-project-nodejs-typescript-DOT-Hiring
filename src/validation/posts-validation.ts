import { number, string, z, ZodType } from "zod";

export class PostsValidation {
  static readonly PostsRequest: ZodType = z.object({
    userId: number().min(1).int(),
    title: string().min(1).max(100),
    body: string().min(1),
  });

  static readonly PostChangeUserIdValidation: ZodType = z.object({
    userId: number().min(1).int(),
  });
}
