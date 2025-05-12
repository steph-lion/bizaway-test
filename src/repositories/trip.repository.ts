import { Prisma, Trip } from '@prisma/client';
import { prisma } from '../services/prisma.service';

/**
 * Repository handling Trip entity database operations
 */
export class TripRepository {
  /**
   * Find all trips for a specific user
   */
  public static async findAllByUserId(userId: number): Promise<Trip[]> {
    return prisma.trip.findMany({
      where: { user_id: userId },
    });
  }

  /**
   * Find a specific trip by ID and user ID
   */
  public static async findByIdAndUserId(tripId: number, userId: number): Promise<Trip | null> {
    return prisma.trip.findFirst({
      where: {
        id: tripId,
        user_id: userId,
      },
    });
  }

  /**
   * Create a new trip in the database
   */
  public static async create(tripData: Prisma.TripCreateInput): Promise<Trip> {
    return prisma.trip.create({
      data: tripData,
    });
  }

  /**
   * Delete a trip by ID and user ID
   */
  public static async deleteByIdAndUserId(tripId: number, userId: number): Promise<Trip | null> {
    try {
      return await prisma.trip.delete({
        where: {
          id: tripId,
          user_id: userId,
        },
      });
    } catch (error) {
      // If record not found, return null instead of throwing an error
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return null;
      }
      throw error;
    }
  }
}
