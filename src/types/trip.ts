/**
 * Types for the Trip object as defined by the 3rd party API
 */
export interface ExternalTrip {
  origin: string;
  destination: string;
  cost: number;
  duration: number;
  type: string;
  id: string;
  display_name: string;
}

/**
 * Supported sort strategies for trip results
 */
export type SortStrategy = 'fastest' | 'cheapest';
