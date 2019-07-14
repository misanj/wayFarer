import express from 'express';
import InputValidator from '../middlewares/inputValidator';
import TripController from '../controllers/tripController';
import AuthenticateUser from '../middlewares/authenticate';

const tripRoutes = express.Router();

tripRoutes.post('/trips', AuthenticateUser.verifyAdmin, InputValidator.validateTrip, TripController.CreateTrip);
tripRoutes.patch('/trips/:id', AuthenticateUser.verifyAdmin, TripController.CancelTrip);

export default tripRoutes;
