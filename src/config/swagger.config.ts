import swaggerJsdoc from 'swagger-jsdoc';

/**
 * Swagger configuration for API documentation
 */
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Trip Planner API',
      version: '1.0.0',
      description: 'API for searching and managing trips',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'Enter the JWT token preceded by the word "Bearer" (example: "Bearer your-token")',
        },
      },
      responses: {
        RateLimitError: {
          description: 'Request limit exceeded',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Too many requests, please try again later.',
                  },
                  statusCode: {
                    type: 'integer',
                    example: 429,
                  },
                },
              },
            },
          },
        },
        UnauthorizedError: {
          description: 'Invalid or missing authentication token',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Unauthorized - Missing or invalid token',
                  },
                  statusCode: {
                    type: 'integer',
                    example: 401,
                  },
                },
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Search',
        description: 'Trip search operations',
      },
      {
        name: 'Trips',
        description: 'Trip management operations',
      },
    ],
  },
  // Paths of the files from which to extract the documentation
  apis: ['./src/routes/*.routes.ts', './src/controllers/*.controller.ts', './src/types/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
