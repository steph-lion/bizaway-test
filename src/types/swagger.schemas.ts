/**
 * @swagger
 * components:
 *   headers:
 *     RateLimit-Limit:
 *       description: Maximum number of requests allowed in the specified period
 *       schema:
 *         type: integer
 *       example: 180
 *     RateLimit-Remaining:
 *       description: Number of requests remaining in the current period
 *       schema:
 *         type: integer
 *       example: 179
 *     RateLimit-Reset:
 *       description: Time in seconds until the rate limiting window resets
 *       schema:
 *         type: integer
 *       example: 58
 *   schemas:
 *     Trip:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Internal ID of the saved trip
 *         original_id:
 *           type: string
 *           description: Original trip ID in the external API
 *         user_id:
 *           type: integer
 *           description: ID of the owner user
 *         origin:
 *           type: string
 *           description: Origin airport code
 *         destination:
 *           type: string
 *           description: Destination airport code
 *         cost:
 *           type: integer
 *           description: Trip cost in cents
 *         duration:
 *           type: integer
 *           description: Trip duration in minutes
 *         type:
 *           type: string
 *           description: Type of transport
 *         display_name:
 *           type: string
 *           description: Descriptive name of the trip
 *       example:
 *         id: 1
 *         user_id: 1
 *         origin: "SYD"
 *         destination: "GRU"
 *         cost: 625
 *         duration: 5
 *         type: "flight"
 *         original_id: "a749c866-7928-4d08-9d5c-a6821a583d1a"
 *         display_name: "from SYD to GRU by flight"
 *
 *     ExternalTrip:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Trip ID in the external API
 *         origin:
 *           type: string
 *           description: Origin airport code
 *         destination:
 *           type: string
 *           description: Destination airport code
 *         cost:
 *           type: number
 *           description: Trip cost in euros
 *         duration:
 *           type: integer
 *           description: Trip duration in minutes
 *         type:
 *           type: string
 *           description: Type of transport
 *         display_name:
 *           type: string
 *           description: Descriptive name of the trip
 *       example:
 *         origin: "SYD"
 *         destination: "GRU"
 *         cost: 625
 *         duration: 5
 *         type: "flight"
 *         id: "a749c866-7928-4d08-9d5c-a6821a583d1a"
 *         display_name: "from SYD to GRU by flight"
 */
