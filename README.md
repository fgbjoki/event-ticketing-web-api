# Book Library Web API

A simple REST API for managing a book library, built with Node.js, Express, and TypeScript.

## Prerequisites

Before you start, make sure you have the following installed on your computer:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

To check if you have them installed, open your terminal and run:
```bash
node --version
npm --version
```

## Installation

1. **Clone or download this project** to your computer

2. **Open a terminal** in the project folder

3. **Install dependencies** by running:
```bash
npm install
```

This will download all the required packages.

## Running the Application

### Development Mode (Recommended for learning)

Run the app in development mode with auto-reload on file changes:

```bash
npm run dev
```

You should see: `Books API running at http://localhost:3000`

The server will automatically restart whenever you make changes to the code.

### Production Mode

First, build the TypeScript code:
```bash
npm run build
```

Then start the server:
```bash
npm start
```

## API Endpoints

Once the server is running, you can use these endpoints:

### Get all books
```http
GET http://localhost:3000/api/books
```

### Get a specific book
```http
GET http://localhost:3000/api/books/{id}
```

### Create a new book
```http
POST http://localhost:3000/api/books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A classic American novel",
  "publishedYear": 1925,
  "isbn": "978-0-7432-7356-5"
}
```

**Note:** Only `title` and `author` are required. If a book with the same title already exists, you'll get an error.

### Delete a book
```http
DELETE http://localhost:3000/api/books/{id}
```

## Testing the API

You can test the API using:
- **curl** (command line) - Example:
  ```bash
  curl http://localhost:3000/api/books
  ```
- **Postman** - [Download here](https://www.postman.com/downloads/)

## Project Structure

```
src/
├── books/
│   ├── book.types.ts    # Book data types and validation
│   ├── book.store.ts    # In-memory data storage
│   └── book.routes.ts   # API route handlers
├── lib/
│   ├── errors.ts        # Error handling
│   └── validate.ts      # Request validation
├── app.ts               # Express app setup
└── server.ts            # Server entry point
```

## Common Issues

**Port already in use?**
- Another app is using port 3000
- Stop the other app or change the port by setting: `PORT=3001 npm run dev`