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
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, user_id, trip_id ,trip_date, bus_id, seat_number, first_name, last_name, email, created_on;`;

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
  static viewAll(userId) {
    let result;
    if (userId) {
      result = db.query(
        'SELECT * FROM bookings WHERE user_id = $1 ORDER BY id ASC', userId
      );
    } else {
      result = db.query(
        'SELECT * FROM bookings ORDER BY id ASC'
      );
    }
    return result;
  }

   /**
   * delete booking of id bookingId from the DB
   * @param {number} bookigId 
   */
  static deleteById(bookingId) {
    return db.query(
      'DELETE FROM bookings WHERE id = $1 RETURNING *', 
      [bookingId]
    );
  }

  /**
   * select a given booking of id bookingId
   * @param {number} bookingId 
   */
  static getById(userId) {
    return db.query(
      'SELECT * FROM bookings WHERE user_id = $1', 
      [userId]
    );
  }

}

export default Booking;
