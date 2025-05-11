import { PrismaClient } from '@prisma/client';
import { logger } from '../src/modules';

const prisma = new PrismaClient();

/**
 * Seed the database with 3 initial users with predefined tokens
 */
async function main(): Promise<void> {
  try {
    await prisma.user.deleteMany();

    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password_1', // In a real app, this would be properly hashed
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIn0.hqWGSaFpvbrXkOWc6YFPk9LALxCwbGbqgW-GkBKuQ_s',
      },
    });

    await prisma.user.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'hashed_password_2', // In a real app, this would be properly hashed
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkphbmUgU21pdGgiLCJlbWFpbCI6ImphbmVAZXhhbXBsZS5jb20ifQ.V8iqT3GUq-NDWNhqQx8vKUMnYI9cf1hhIGODMlHcVSg',
      },
    });

    await prisma.user.create({
      data: {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: 'hashed_password_3', // In a real app, this would be properly hashed
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkJvYiBKb2huc29uIiwiZW1haWwiOiJib2JAZXhhbXBsZS5jb20ifQ.HlzF_y4tU1XNT5qX4YMjrdxTJGh-cvjTiKt1O_ILeXs',
      },
    });
  } catch (error) {
    // Type checking for error
    if (error instanceof Error) {
      logger.error('Error seeding database:', error.message);
      logger.error(error.stack);
    } else {
      logger.error('Unknown error seeding database');
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
