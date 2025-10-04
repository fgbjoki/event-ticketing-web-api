import { Router, Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import { bookStore } from "./book.store";
import { HttpError } from "../lib/errors";
import { validateBody } from "../lib/validate";
import { Book, NewBookDTO, NewBookSchema, UpdateBookDTO, UpdateBookSchema } from "./book.types";

export const bookRouter = Router();

// GET /api/books
bookRouter.get("/", (_req: Request, res: Response) => {
  res.json(bookStore.list());
});

// GET /api/books/:id
bookRouter.get("/:id", (req, res, next) => {
  const item = bookStore.get(req.params.id);
  if (!item) return next(new HttpError(404, "Book not found"));
  res.json(item);
});

// POST /api/books
bookRouter.post(
  "/",
  validateBody(NewBookSchema),
  (req: Request, res: Response, next: NextFunction) => {
    const dto = (req as any).data as NewBookDTO;

    const existingBook = bookStore.list().find(book => book.title === dto.title);
    if (existingBook) {
      return next(new HttpError(409, "A book with this title already exists"));
    }

    const b: Book = {
      id: randomUUID(),
      title: dto.title,
      author: dto.author,
      description: dto.description ?? "",
      publishedYear: dto.publishedYear ?? 0,
      isbn: dto.isbn ?? ""
    };

    bookStore.create(b);

    res.status(201).json(b);
  }
);

// DELETE /api/books/:id
bookRouter.delete("/:id", (req, res, next) => {
  const ok = bookStore.delete(req.params.id);
  if (!ok) return next(new HttpError(404, "Book not found"));
  res.status(204).send();
});
