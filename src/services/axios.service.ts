import axios, { AxiosInstance } from 'axios';
import { env } from '../modules';

/**
 * This is the axios istance used for the 3rd party API calls.
 */
const externalTripsInstance: AxiosInstance = axios.create({
  baseURL: env.TRIPS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': env.TRIPS_API_KEY,
  },
});

// Export the Axios instance for use in other parts of the application
export default externalTripsInstance;
