import express from 'express';
import BookingController from '../controllers/bookingController';
import InputValidator from '../middlewares/inputValidator';
import AuthenticateUser from '../middlewares/authenticate';

const bookingRoutes = express.Router();

bookingRoutes.post('/bookings', AuthenticateUser.verifyToken, BookingController.bookSeat);
bookingRoutes.get('/bookings', AuthenticateUser.verifyToken, BookingController.viewBookings);

export default bookingRoutes;
