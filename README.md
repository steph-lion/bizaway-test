# Trip Planner API

A Node.js API that allows searching for trips between origins and destinations with sorting options.

## Features

- Search trips by origin and destination (http://localhost:3000/api/search?origin=XXX&destination=XXX&sort_by=fastest|cheapest)
- CRUD operations for trips. Since the 3rd party API does not support a GET request for a trip, the POST request is done by creating a trip instead of saving one from the 3rd party API. (http://localhost:3000/api/trips)
- Docker-ready setup with PostgreSQL database

## Requirements

- Docker and Docker Compose
- Node.js 18+ (only for local development without Docker)

## Quick Start

### Using Docker (Recommended)

1. Clone the repository
2. Create a `.env` file (you can copy from `.env.example`)
3. Add your API key to the `.env` file
4. Run with Docker Compose:

```bash
docker compose up
```

This will:

- Start a PostgreSQL database
- Create the database schema using Prisma
- Start the Node.js API server

The API will be available at `http://localhost:3000`

### Manual Setup (Without Docker)

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`)
3. Update `DATABASE_URL` in `.env` to point to your local PostgreSQL instance
4. Generate Prisma client:

```bash
npx prisma generate
```

5. Push the database schema:

```bash
npx prisma db push
```

6. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Health Check

```
GET /
```

Returns server status

### Search Trips

```
GET /api/search?origin=XXX&destination=XXX&sort_by=fastest|cheapest
```

Parameters:

- `origin`: IATA 3 letter code of the origin (required)
- `destination`: IATA 3 letter code of the destination (required)
- `sort_by`: Sorting strategy, either `fastest` or `cheapest` (defaults to `fastest`)

## Configuration

All configuration is done through environment variables:

- `SERVER_PORT`: Port for the API server (default: 3000)
- `NODE_ENV`: Environment (development, production, test)
- `TRIPS_API_BASE_URL`: URL for the 3rd party trips API
- `TRIPS_API_KEY`: API key for accessing the 3rd party trips API
- `DB_USER`: PostgreSQL username
- `DB_PASSWORD`: PostgreSQL password
- `DB_NAME`: PostgreSQL database name
- `DB_PORT`: PostgreSQL port
- `DB_URL`: Full PostgreSQL connection string

## Development

### Available Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build for production
- `npm run start`: Run production build
- `npm run lint`: Lint code
- `npm run format`: Format code with Prettier
- `npm run prisma:generate`: Generate Prisma client
- `npm run migrate:dev`: Create a new migration
- `npm run migrate:deploy`: Deploy migrations

### Code Quality

This project uses **ESLint** and **Prettier** to ensure consistent and high-quality code across the team. Run the following commands to check and format the code:

- Lint the code:

```bash
npm run lint
```

- Format the code:

```bash
npm run format
```

## Architecture

The project follows a clean architecture approach:

- `controllers/`: Handle HTTP requests and responses
- `services/`: Business logic
- `middlewares/`: Express middleware functions
- `routes/`: API endpoint definitions
- `dto/`: Data Transfer Objects for validation
- `types/`: TypeScript type definitions
- `modules/`: Shared modules like logging and configuration
- `prisma/`: Database schema and migrations

## Error Handling

The application implements centralized error handling with proper HTTP status codes and standardized error responses.
