import Booking from '../models/booking';

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
         id, user_id, trip_id ,trip_date, bus_id, seat_number, first_name, last_name, email, created_on
      } = rows[0];
      return res.status(201).json({
        status: 'success',
        data: {  
            booking_id: id,        
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

    /**
     * Users can view all their trips
     * @param {*} req
     * @param {*} res
     */
    static async viewBookings(req, res) {
      try {
        const userId = req.body.is_admin ? null : req.body.user_id;
        const { rows } = await Booking.viewAll(userId);
        const bookings = rows.map((row) => {
          const newRow = row;
          newRow.booking_id = row.id;
          delete row.id;
          return newRow;
        });
        return rows.length === 0
          ? res.status(200).json({
             message: 'No booking made yet' 
            })
          : res.status(200).json({ 
            status: 'success',
             data: bookings 
            });
      } catch (error) {
        if (error) return res.status(500).json({
           status: 'error',
            error: error.message
         });
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
        return res.status(404).json({
          status: 'error',
          error: 'Booking with the given ID not found'
         });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Booking deleted successfully'
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
     * request booking(s) made by a specific id
     * @param {object} req 
     * @param {object} res 
     */
    static async getByUserId(req, res) {
      try {
        const { rows } = await Booking.getById(req.params.bookingId);
        if (!rows[0]) {
          return res.status(404).json({
             status: 'error',
            error: 'booking with given id not found',
           });
        }
        return res.status(200).json({
           status: 'success',
            data: rows,
          });
      } catch (error) {
        if (error) return res.status(500).json({
           status: 'error',
           error: ex.message,
          });
      }
    }

  }
  export default BookingController;
