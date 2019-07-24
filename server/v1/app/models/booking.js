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

  /**
   * @description view all saved bookings in the DB
   */
  static viewAll() {
    const queryText = `SELECT * FROM bookings ORDER BY booking_id ASC;`;
    const response = db.query(queryText)
    return response;
    }

   /**
   * delete booking of id bookingId from the DB
   * @param {number} bookigId 
   */
  static deleteById(bookingId) {
    const queryText = `DELETE FROM bookings WHERE booking_id = $1 RETURNING *;`; 
    const response = db.query(queryText, [bookingId])
    return response;
  }

  /**
   * select a given booking of id bookingId
   * @param {number} bookingId 
   */
  static getById(userId) {
    const queryText = `SELECT * FROM bookings WHERE user_id = $1;`; 
    const response = db.query(queryText, [userId])
    return response;
  }

}

export default Booking;
