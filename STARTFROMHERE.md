### Step 1: Understand What Libraries Are Used

First, open `package.json` in the root folder. This file lists all the external code (libraries) this project uses:

**Main Dependencies (what the app needs to run):**
- **express** - The web framework that handles HTTP requests and responses
- **zod** - Validates that incoming data is correct (like checking form inputs)
- **cors** - Allows the API to be called from web browsers
- **helmet** - Adds security headers to protect your API
- **morgan** - Logs every request to the console (helpful for debugging)
- **uuid** - Generates unique IDs for each book

**Dev Dependencies (tools for development):**
- **typescript** - Adds types to JavaScript (catches errors before running code)
- **tsx** - Runs TypeScript files directly without compiling
- **@types/*** - Type definitions for TypeScript

### Step 2: Follow the Request Flow (Start Here!)

When someone makes an API request, the code follows this path:

#### **Start: `src/server.ts`** (Read this first)
- This is the entry point - where the app starts
- It imports the app and starts listening on port 3000
- **Key concept:** This is like the "main" function in other languages

#### **Next: `src/app.ts`** (Read this second)
- Sets up Express and all middleware (the stuff that runs before your routes)
- **Middleware** = functions that process the request before it reaches your code
- Notice the order matters: middleware runs top to bottom
- Connects the `/api/books` route to the book router
- Adds error handling at the end (catches any errors)

**What each middleware does:**
```javascript
app.use(helmet())         // Adds security headers
app.use(cors())           // Allows cross-origin requests
app.use(express.json())   // Parses JSON from request body
app.use(morgan("dev"))    // Logs requests to console
```

#### **Then: `src/books/book.routes.ts`** (Read this third)
- Defines what happens for each HTTP method (GET, POST, PATCH, DELETE)
- Each route is a function that takes `(req, res, next)`
  - **req** = the incoming request (has the data sent by the client)
  - **res** = the response (what you send back)
  - **next** = pass control to the next function (used for errors)

**Example flow for GET all books:**
```
1. Client sends: GET http://localhost:3000/api/books
2. Express matches this to: eventRouter.get("/")
3. Our function runs: res.json(bookStore.list())
4. Client receives: JSON array of all books
```

#### **Understanding: `src/books/book.types.ts`** (Read this fourth)
- Defines what a Book looks like (the structure/shape of data)
- Uses **Zod** to create validation schemas
- **Why validation?** So users can't send bad data (empty names, wrong types, etc.)

**Key concept:** Separation of concerns
- `Book` = what we store and return
- `NewBookDTO` = what we accept when creating a book
- `UpdateBookDTO` = what we accept when updating a book

#### **Understanding: `src/books/book.store.ts`** (Read this fifth)
- This is your "database" (just in-memory for learning)
- It's a class with methods to: list, get, create, update, delete
- Uses a `Map` to store books by ID (like a dictionary)
- **Important:** Data disappears when you restart the server!

#### **Helper files in `src/lib/`** (Read these last)
- **`errors.ts`** - Custom error class and error handler middleware
- **`validate.ts`** - Middleware that validates request body using Zod

### Step 3: Trace a Request End-to-End

Let's trace what happens when you create a book:

```
1. Client sends POST request to /api/books with JSON body
   ↓
2. Express receives it (server.ts → app.ts)
   ↓
3. Middleware runs in order:
   - helmet() adds security
   - cors() checks if request is allowed
   - express.json() parses the JSON body
   - morgan() logs the request
   ↓
4. Express matches route: POST /api/books
   ↓
5. validateBody(NewBookSchema) middleware runs
   - Checks if body has required fields (title, author)
   - Validates types and formats
   - If invalid: returns 400 error
   - If valid: attaches validated data to req
   ↓
6. Route handler function runs:
   - Checks if book with same title exists → 409 error
   - Creates new book object with UUID
   - Saves to bookStore
   - Returns 201 status with the new book
   ↓
7. Client receives response: { "id": "...", "title": "...", ... }
```

### Step 4: Key Concepts to Understand

- **REST API** = Uses HTTP methods (GET, POST, PATCH, DELETE) to manage resources
- **Middleware** = Functions that process requests before they reach your code
- **Request → Handler → Response** = The basic flow of web APIs
- **Validation** = Checking data before using it (security + correctness)
- **Error handling** = Catching problems and sending proper error responses
- **Stateless** = Each request is independent (no memory between requests except the store)