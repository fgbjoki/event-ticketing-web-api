import { z } from "zod";

// Domain model (what we store/return)
export type Book = {
  id: string;
  title: string;
  author: string;
  description?: string;
  publishedYear?: number;
  isbn?: string;
};

// DTOs & validation
export const NewBookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  description: z.string().optional(),
  publishedYear: z.number().int().min(1000).max(9999).optional(),
  isbn: z.string().optional()
});

export type NewBookDTO = z.infer<typeof NewBookSchema>;

export const UpdateBookSchema = NewBookSchema.partial(); // PATCH-like
export type UpdateBookDTO = z.infer<typeof UpdateBookSchema>;
