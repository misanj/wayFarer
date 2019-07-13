import Trip from '../models/trip';

/**
 * @class UserController
 * @description Contains methods for each user related endpoint
 * @exports UserController
 */
class TripController {
    /**
    * @method CreateTrip
    * @description Adds a trip to the database
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
    static async CreateTrip(req, res) {
      const { rows } = await Trip.create(req.body);
      const {
        id, bus_id, origin, destination, trip_date, fare
      } = rows[0]
      return res.status(201).json({
        status: 'success',
        data: {
            trip_id: id,
            bus_id,
            origin,
            destination, 
            trip_date,
            fare
          },
        });
      }
  
  }
  export default TripController;