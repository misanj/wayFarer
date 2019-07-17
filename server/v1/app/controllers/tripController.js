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
      try {
        const { rows } = await Trip.create(req.body);
        const {
          trip_id, bus_id, origin, destination, trip_date, fare
        } = rows[0]
        return res.status(201).json({
          status: 'success',
          data: {
              trip_id,
              bus_id,
              origin,
              destination, 
              trip_date,
              fare
            },
          });
        } catch (error) {
          if (error) 
          return res.status(400).json({
            status: 'error',
            error: error.message
          });
        }
    }
    

      /**
    * @method CancelTrip
    * @description Cancel a trip in the database
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
   static async cancelTrip(req, res) {
    try {
      const tripId = parseInt(req.params.trip_id, 10);
      const result = await Trip.cancelById(tripId);
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 'error',
          error: 'Trip not found',
        });
      }
      return res.status(200).json({
        status:'success',
        data:{
        message: 'Trip Cancelled Successfully',
        }
      });
    } catch (error) {
      if (error) 
      return res.status(400).json({
        status: 'error',
        error: error.message
      });
    }
  }
    /**
  * @method GetTrips
  * @description Fetches all trips, acitive and cancelled trips from the database
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static async GetTrips(req, res) {
    try{
      const result = await Trip.getTrips();
      return res.status(200).json({
        status: 'success',
        data: result.rows,
      });
    } catch (error) {
      if (error) 
      return res.status(400).json({
        status: 'error',
        error: error.message
      });
    }
  }
  
  }
  export default TripController;