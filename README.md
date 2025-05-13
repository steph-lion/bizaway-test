# BizAway Trip Search API

A RESTful API for searching and saving trips using Express, TypeScript, and Prisma.

## Features

- RESTful API design following industry best practices
- Search trips from an external API with sorting options
- User authentication with JWT tokens (simplified for demonstration)
- CRUD operations for user trips (get, save, delete)
- Rate limiting (180 requests per 60 seconds window)
- Interactive API documentation with Swagger/OpenAPI 3.0
- PostgreSQL database with Prisma ORM
- Docker setup for easy deployment

## Tech Stack

- **TypeScript**: For type safety and better developer experience
- **Express**: Fast, unopinionated web framework for Node.js
- **Prisma**: Modern database toolkit for TypeScript
- **PostgreSQL**: Relational database for data persistence
- **Docker**: Containerization for consistent development and production environments
- **Swagger/OpenAPI**: Interactive API documentation
- **express-rate-limit**: API rate limiting middleware
- **Zod**: Schema validation for request parameters
- **express-rate-limit**: API rate limiting middleware
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

## Authentication

All endpoints under `/api/trips` require authentication via Bearer token (mocked randomly).

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

## API Documentation

The API is documented using Swagger/OpenAPI 3.0, providing interactive and easy-to-use documentation.

### Accessing the Documentation

After starting the server, you can access the API documentation at:

```
http://localhost:3000/api-docs
```

Modify the port if needed according to your `.env` configuration (the default port is 3000).

The Swagger documentation offers:

- Detailed description of all API endpoints
- Required and optional parameters for each endpoint
- Request and response data schemas
- Interactive interface to test the APIs directly from the browser
- Bearer token authentication implementation

### Testing the API via Swagger

1. Navigate to the documentation page (`/api-docs`)
2. For protected endpoints, click the "Authorize" button and enter the Bearer token
3. Select the endpoint you want to test
4. Enter the required parameters
5. Click "Execute" to send the request
