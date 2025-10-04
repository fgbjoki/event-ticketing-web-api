1. **Add a new 'genre' field** to the Book type:
   - Open `book.types.ts`
   - Add `genre: string;` to the Book type
   - Add it to the NewBookSchema. Make sure that genre has to be at least 3 character and the most 64 character string
   - Update the route handler to include it

2. **Add a new endpoint** to search books:
   ```
   GET /api/books/search?title=gatsby
   ```


#
# Solution - DON'T PEEK IF YOU DON'T HAVE TO :)

1. 
books.types.ts
   ```typescript
   export type Book = {
	id: string;
	title: string;
	author: string;
	description?: string;
	publishedYear?: number;
	isbn?: string;
	genre?: string;
	};
   ```

   ```typescript
	export const NewBookSchema = z.object({
		title: z.string().min(1),
		author: z.string().min(1),
		description: z.string().optional(),
		publishedYear: z.number().int().min(1000).max(9999).optional(),
		isbn: z.string().optional(),
		genre: z.string().max(64).min(3)
	});
   ```


   2. 

books.routes.ts
```typescript
	// GET /api/books/search?title=gatsby
	bookRouter.get("/search", (req, res) => {
		const title = req.query.title as string;
		const results = bookStore.list().filter(b =>
		b.title.toLowerCase().includes(title.toLowerCase())
		);
		res.json(results);
	});
```