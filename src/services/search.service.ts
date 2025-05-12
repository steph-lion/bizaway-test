import { ServerError } from '../types/serverError';
import { ExternalTrip } from '../types/trip';
import externalTripsInstance from './axios.service';

/**
 * Service for searching trips through the external API
 */
export class SearchService {
  /**
   * Search for trips matching the specified criteria
   */
  public static async searchTrips(
    origin: string,
    destination: string,
    sortBy: 'fastest' | 'cheapest' = 'fastest'
  ): Promise<ExternalTrip[]> {
    try {
      const response = await externalTripsInstance.request({
        method: 'GET',
        params: {
          origin,
          destination,
          sort_by: sortBy,
        },
      });

      if (response.status !== 200) {
        throw new ServerError(`Search failed: ${response.statusText}`, response.status);
      }
      const trips: ExternalTrip[] = response.data;

      // Sort trips based on the specified criteria
      if (sortBy === 'fastest') {
        return trips.sort((a, b) => a.duration - b.duration);
      } else {
        return trips.sort((a, b) => a.cost - b.cost);
      }
    } catch (error) {
      if (error instanceof ServerError) {
        throw error;
      }
      throw new ServerError('Failed to search trips', 500);
    }
  }
}
