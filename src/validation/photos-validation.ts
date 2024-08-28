import { number, string, z, ZodType } from "zod";

export class PhotosValidation {
  static readonly PhotosRequest: ZodType = z.object({
    albumId: number().min(1).int(),
    title: string().min(1).max(100),
    url: string().min(1).max(100),
    thumbnailUrl: string().min(1).max(100),
  });
}
