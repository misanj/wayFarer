import db from '../migration/db';
import moment from 'moment';

/**
 * @exports Trip
 * @class Trip
 */
class Trip {
    /**
     * @param {*} data
     * @returns { object } trip object
     */
    static create(data) {
      const queryText = `INSERT INTO trip (bus_id, origin, destination, trip_date, fare)
       VALUES ($1, $2, $3, $4, $5) RETURNING trip_id, bus_id, origin, destination, trip_date, fare;`;
  
      const {
        bus_id, origin, destination, fare,
      } = data;
  
      const values = [bus_id, origin, destination, moment(new Date()), fare];
      const response = db.query(queryText, values);
      return response;
    }

     /**
   * select a given booking of id bookingId
   * @param {number} trip_id 
   */
  static cancelById(trip_id) {
    return db.query(
      `UPDATE trip SET status = 'cancelled' WHERE trip_id = $1 RETURNING *;`, 
      [trip_id]
    );
  }

   /**
   * @method getTrips
   * @returns {object} All trips
   */
    static async getTrips() {
      const queryText = `SELECT * from trip;`;
      const result = db.query(queryText);
      return result;
    }


  }
  
  export default Trip;
  