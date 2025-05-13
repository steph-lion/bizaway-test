import { z } from 'zod';
import { SUPPORTED_AIRPORTS } from '../constants/airports';

/**
 * Schema for validating trip search query parameters
 */
export const SearchTripSchema = z.object({
  origin: z
    .enum(SUPPORTED_AIRPORTS, {
      errorMap: () => ({ message: 'Origin must be a valid supported IATA airport code' }),
    })
    .describe('IATA airport code for origin (3-letter code)'),
  destination: z
    .enum(SUPPORTED_AIRPORTS, {
      errorMap: () => ({ message: 'Destination must be a valid supported IATA airport code' }),
    })
    .describe('IATA airport code for destination (3-letter code)'),
  sort_by: z.enum(['fastest', 'cheapest']).optional().default('fastest'),
});

/**
 * Type definition for the search trip parameters
 */
export type SearchTripParams = z.infer<typeof SearchTripSchema>;
