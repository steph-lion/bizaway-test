import { PrismaClient } from '@prisma/client';
import { logger } from '../modules';

/**
 * Singleton instance of PrismaClient for database access
 */
class PrismaService {
  private static instance: PrismaService;
  private prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient();
    this.initialize();
  }

  /**
   * Initialize the database connection
   */
  private async initialize(): Promise<void> {
    try {
      await this.prisma.$connect();
      logger.info('Database connected successfully');
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Database connection error: ${error.message}`);
      } else {
        logger.error('Unknown database connection error');
      }
      process.exit(1);
    }
  }

  /**
   * Get the singleton instance
   */
  public static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
    }
    return PrismaService.instance;
  }

  /**
   * Get the PrismaClient instance
   */
  public getClient(): PrismaClient {
    return this.prisma;
  }

  /**
   * Disconnect from the database
   */
  public async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}

// Export a singleton instance
export const prisma = PrismaService.getInstance().getClient();
