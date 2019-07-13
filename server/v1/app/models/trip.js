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
       VALUES ($1, $2, $3, $4, $5) RETURNING id, bus_id, origin, destination, trip_date, fare;`;
  
      const {
        bus_id, origin, destination, fare,
      } = data;
  
      const values = [bus_id, origin, destination, moment(new Date()), fare];
      const response = db.query(queryText, values);
      return response;
    }

  }
  
  export default Trip;
  