import { z } from 'zod';

/**
 * Schema for validating trip search query parameters
 * Requires origin and destination as IATA codes (3 uppercase letters)
 * Optionally accepts sort_by parameter which must be either 'fastest' or 'cheapest'.
 *
 * NOTE: I could have added a check for the array given in the homework, but since the 3rd party API returns 200 for non-existent airports, I decided to leave it out.
 */
export const SearchTripSchema = z.object({
  origin: z
    .string()
    .length(3)
    .regex(/^[A-Z]{3}$/, 'Origin must be a valid 3-letter IATA code'),
  destination: z
    .string()
    .length(3)
    .regex(/^[A-Z]{3}$/, 'Destination must be a valid 3-letter IATA code'),
  sort_by: z.enum(['fastest', 'cheapest']).optional().default('fastest'),
});

/**
 * Type definition for the search trip parameters
 */
export type SearchTripParams = z.infer<typeof SearchTripSchema>;
