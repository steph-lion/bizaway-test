import { z } from 'zod';

export const ValidateTripIdSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'Must be a number string')
    .transform((value) => parseInt(value, 10)),
});

/**
 * Type definition for the get trip by id parameters
 */
export type ValidateTripId = z.infer<typeof ValidateTripIdSchema>;
