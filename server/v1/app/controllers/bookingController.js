import Booking from '../models/booking';
import { finished } from 'stream';

/**
 * @class BookingController
 * @description Contains methods for each booking related endpoint
 * @exports BookingController
 */
class BookingController {
    /**
    * @method bookSeat
    * @description Adds a users booking details to the database
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
    static async bookSeat(req, res) {
      const { rows } = await Booking.createBooking(req.body);
      const {
         booking_id, user_id, trip_id ,trip_date, bus_id, seat_number, first_name, last_name, email, created_on
      } = rows[0];
      return res.status(201).json({
        status: 'success',
        data: {  
            booking_id,        
            user_id,
            trip_id,
            trip_date,
            bus_id,
            seat_number,
            first_name,
            last_name,
            email,
            created_on,
          },
        });

        
      }

  }
  export default BookingController;
