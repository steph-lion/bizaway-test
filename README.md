# BizAway Trip Search API

A RESTful API for searching and saving trips using Express, TypeScript, and Prisma.

## Features

- RESTful API design following industry best practices
- Search trips from an external API with sorting options
- User authentication with JWT tokens (simplified for demonstration)
- CRUD operations for user trips (get, save, delete)
- PostgreSQL database with Prisma ORM
- Docker setup for easy deployment

## Tech Stack

- **TypeScript**: For type safety and better developer experience
- **Express**: Fast, unopinionated web framework for Node.js
- **Prisma**: Modern database toolkit for TypeScript
- **PostgreSQL**: Relational database for data persistence
- **Docker**: Containerization for consistent development and production environments
- **Zod**: Schema validation for request parameters
- **Pino**: Fast and low-overhead logger

## Architecture

The project follows a clean architecture approach with clear separation of concerns:

### Layers

1. **Controllers**: Handle HTTP requests and responses

   - Thin layer that delegates business logic to services
   - Handles HTTP status codes and response formatting

2. **Services**: Contain business logic

   - Encapsulate domain knowledge and business rules
   - Coordinate between repositories and external services
   - Handle errors and throw domain-specific exceptions

3. **Repositories**: Data access layer

   - Interact directly with the database through Prisma
   - Abstract away database implementation details
   - Provide domain-oriented methods for data operations

4. **Middlewares**: Process requests before they reach controllers

   - Authentication
   - Request validation
   - Logging and metrics
   - Error handling

5. **Routes**: Define API endpoints
   - Connect endpoints to controllers
   - Apply middleware to specific routes

### Directory Structure

```
src/
├── controllers/     # Request handlers
├── dto/             # Data transfer objects for validation
├── middlewares/     # Express middlewares
├── modules/         # Shared modules (logger, env)
├── repositories/    # Data access layer
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript type definitions
└── index.ts         # Application entry point
```

## API Endpoints

### Authentication

All endpoints under `/api/trips` require authentication via Bearer token.

### Public Endpoints

- `GET /`: Health check endpoint
- `GET /api/search`: Search for trips
  - Query parameters:
    - `origin`: 3-letter IATA code (required)
    - `destination`: 3-letter IATA code (required)
    - `sort_by`: Either 'fastest' or 'cheapest' (default: 'fastest')

### Protected Endpoints

- `GET /api/trips`: Get all saved trips for authenticated user
- `GET /api/trips/:id`: Get a specific saved trip by ID
- `POST /api/trips`: Save a trip
  - Body: `{ "original_id": "string" }`
- `DELETE /api/trips/:id`: Delete a saved trip by ID

## Setup and Installation

### Prerequisites

- Docker and Docker Compose
- Node.js 16+ (for local development)

### Using Docker (Recommended)

1. Clone the repository
2. Create a `.env` file based on `.env.example`
3. Run with Docker Compose:

```bash
docker compose up
```

This will:

- Start a PostgreSQL database
- Create the database schema using Prisma
- Seed the database with test users
- Start the API server

### Local Development

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file based on `.env.example`
3. Generate Prisma client:

```bash
npm run prisma:generate
```

4. Push database schema:

```bash
npx prisma db push
```

5. Seed the database:

```bash
npm run prisma:seed
```

6. Start development server:

```bash
npm run dev
```

## Testing the API

After starting the server, you can test the API with:

1. The health check endpoint:

```
GET http://localhost:3000/
```

2. Search for trips:

```
GET http://localhost:3000/api/search?origin=NYC&destination=LAX
```

3. To access protected endpoints, use one of the tokens printed during seeding:

```
GET http://localhost:3000/api/trips
Authorization: Bearer test-token-xxxx
```
