import { boolean, number, string, z, ZodType } from "zod";

export class TodosValidation {
  static readonly TodosRequest: ZodType = z.object({
    userId: number().min(1).int(),
    title: string().min(1).max(100),
    completed: boolean(),
  });
}
