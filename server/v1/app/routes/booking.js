import express from 'express';
import BookingController from '../controllers/bookingController';
import InputValidator from '../middlewares/inputValidator';

const bookingRoutes = express.Router();

bookingRoutes.post('/bookings', BookingController.bookSeat);

export default bookingRoutes;
