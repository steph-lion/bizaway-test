import { z } from 'zod';

/**
 * Schema for validating trip save request body
 */
export const SaveTripSchema = z.object({
  original_id: z.string().length(36, 'Original ID must be a valid UUID'),
});

/**
 * Type definition for the saving trip parameters
 */
export type SaveTripBody = z.infer<typeof SaveTripSchema>;
