import { Book } from "./book.types";

// In-memory store (like a simple repository)
class BookStore {
  private data = new Map<string, Book>();

  list(): Book[] {
    return Array.from(this.data.values());
  }
  get(id: string): Book | undefined {
    return this.data.get(id);
  }
  create(b: Book): Book {
    this.data.set(b.id, b);
    return b;
  }
  update(id: string, patch: Partial<Book>): Book | undefined {
    const current = this.data.get(id);
    if (!current) return undefined;
    const updated = { ...current, ...patch, id };
    this.data.set(id, updated);
    return updated;
  }
  delete(id: string): boolean {
    return this.data.delete(id);
  }
}

export const bookStore = new BookStore();
