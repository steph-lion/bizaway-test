import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { logger } from '../src/modules';

const prisma = new PrismaClient();

/**
 * Create seed data for the application
 */
async function main(): Promise<void> {
  try {
    // Clear existing data
    await prisma.trip.deleteMany();
    await prisma.user.deleteMany();

    logger.debug('Creating test users...');

    // Create test users with predefined tokens for authentication
    await Promise.all([
      prisma.user.create({
        data: {
          name: 'Test User 1',
          email: 'user1@example.com',
          password: 'password123', // In a real app, this would be hashed
          token: `test-token-${randomUUID()}`,
        },
      }),
      prisma.user.create({
        data: {
          name: 'Test User 2',
          email: 'user2@example.com',
          password: 'password456',
          token: `test-token-${randomUUID()}`,
        },
      }),
      prisma.user.create({
        data: {
          name: 'Test User 3',
          email: 'user3@example.com',
          password: 'password789',
          token: `test-token-${randomUUID()}`,
        },
      }),
    ]);

    logger.debug('Users created successfully:');
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Seed failed:', error.message);
    } else {
      logger.error('Seed failed with an unknown error');
    }
    process.exit(1);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    if (error instanceof Error) {
      logger.error('Seed script error:', error.message);
    } else {
      logger.error('Seed script failed with an unknown error');
    }
    await prisma.$disconnect();
    process.exit(1);
  });
