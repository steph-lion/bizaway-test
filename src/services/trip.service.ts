import { Prisma, Trip } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { TripRepository } from '../repositories';
import { ServerError } from '../types/serverError';
import { ExternalTrip } from '../types/trip';
import externalTripsInstance from './axios.service';

/**
 * Service handling Trip related business logic
 */
export class TripService {
  /**
   * Get all trips for a user
   */
  public static async getUserTrips(userId: number): Promise<Trip[]> {
    return TripRepository.findAllByUserId(userId);
  }

  /**
   * Get a specific trip by ID for a user
   */
  public static async getUserTrip(tripId: number, userId: number): Promise<Trip> {
    const trip = await TripRepository.findByIdAndUserId(tripId, userId);

    if (!trip) {
      throw new ServerError('Trip not found', HttpStatusCode.NotFound);
    }

    return trip;
  }

  /**
   * Fetch a trip from the external API using its ID
   */
  public static async fetchExternalTrip(originalId: string): Promise<ExternalTrip> {
    try {
      const response = await externalTripsInstance.request({
        method: 'GET',
        url: `/${originalId}`,
      });

      if (response.status !== 200) {
        throw new ServerError(`Failed to fetch trip: ${response.statusText}`, response.status);
      }

      return response.data as ExternalTrip;
    } catch (error) {
      if (error instanceof ServerError) {
        throw error;
      }
      throw new ServerError(
        'Failed to fetch trip from external API',
        HttpStatusCode.InternalServerError
      );
    }
  }

  /**
   * Save a trip for a user
   */
  public static async saveTrip(originalId: string, userId: number): Promise<Trip> {
    try {
      // Fetch from external API
      const externalTrip = await this.fetchExternalTrip(originalId);

      // Save to database
      return await TripRepository.create({
        user: {
          connect: { id: userId },
        },
        original_id: externalTrip.id,
        origin: externalTrip.origin,
        destination: externalTrip.destination,
        cost: externalTrip.cost,
        duration: externalTrip.duration,
        display_name: externalTrip.display_name,
        type: externalTrip.type,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ServerError(
          'A trip with this original_id already exists for this user',
          HttpStatusCode.Conflict
        );
      }
      throw new ServerError('Failed to save trip', HttpStatusCode.InternalServerError);
    }
  }

  /**
   * Delete a trip for a user
   */
  public static async deleteTrip(tripId: number, userId: number): Promise<Trip> {
    const deletedTrip = await TripRepository.deleteByIdAndUserId(tripId, userId);

    if (!deletedTrip) {
      throw new ServerError('Trip not found', HttpStatusCode.NotFound);
    }
    return deletedTrip;
  }
}
