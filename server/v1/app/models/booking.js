import db from '../migration/db';
import moment from 'moment';

/**
 * @exports Booking
 * @class Booking
 */
class Booking {
  /**
   * @param {*} data
   * @returns { object } user object
   */
  static createBooking(data) {
    const queryText = `INSERT INTO bookings (user_id, trip_id ,trip_date, bus_id, seat_number, first_name, last_name, email, created_on)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING booking_id, user_id, trip_id ,trip_date, bus_id, seat_number, first_name, last_name, email, created_on;`;

    const {
        user_id, trip_id, bus_id, seat_number, first_name, last_name, email
    } = data;

    const values =  [user_id, trip_id, moment(new Date()), bus_id, seat_number, first_name, last_name, email, moment(new Date())];
    const response = db.query(queryText, values);
    return response;
  }

}

export default Booking;
