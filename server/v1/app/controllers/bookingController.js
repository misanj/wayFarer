import Booking from '../models/booking';

import ResponseMsg from '../helpers/response';

const { resLong, resErr, resShort } = ResponseMsg;

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
      try{
        const result = await Booking.createBooking(req.body);
        const bookAtrip = result.rows[0];
        return resLong(res, 201, {
          ...bookAtrip,
          }); 
      } catch (error) {
        if (error) 
        return resErr(res, 400, error.message);
      }
    }

    /**
     * Users can view all their trips
     * @param {*} req
     * @param {*} res
     */
    static async viewBookings(req, res) {
      try {
        let result;
  
        if (!req.body.is_admin) {
          result = await Booking.getById(req.body.user_id);
        } else {
          result = await Booking.viewAll(); 
        }
        
        const { rows } = result;
        return rows.length === 0
          ? resShort(res, 200, {
             message: 'No booking made yet' 
            })
          : resLong(res, 200, result.rows);
      } catch (error) {
        if (error) return resErr(res, 500, error.message);
      }
    }

    /**
     * delete a saved booking request
     * @param {object} req 
     * @param {object} res 
     */
    static async deleteBooking(req, res) {
      try {
        const { rows } = await Booking.deleteById(req.params.bookingId);
        if (!rows[0]) {
          return resErr(res, 404, 'Booking with the given ID not found');
        }
        return resShort(res, 200, {
          message: 'Booking deleted successfully'
        });
      } catch (error) {
        if (error) 
        return resErr(res, 400, error.message);
      }
    }

  }
  export default BookingController;
