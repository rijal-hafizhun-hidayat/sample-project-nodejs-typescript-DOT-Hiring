import { number, string, z, ZodType } from "zod";

export class AlbumsValidation {
  static readonly AlbumRequest: ZodType = z.object({
    userId: number().min(1).int(),
    title: string().min(1).max(100),
  });
}
