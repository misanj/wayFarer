import express from 'express';
import InputValidator from '../middlewares/inputValidator';
import ParamValidator from '../middlewares/paramValidator';
import TripController from '../controllers/tripController';
import AuthenticateUser from '../middlewares/authenticate';

const tripRoutes = express.Router();

tripRoutes.post('/trips', AuthenticateUser.verifyAdmin, InputValidator.validateTrip, TripController.CreateTrip);
tripRoutes.patch('/trips/:id', AuthenticateUser.verifyAdmin, ParamValidator.validateIdParams, TripController.CancelTrip);
tripRoutes.get('/trips', AuthenticateUser.verifyToken, TripController.GetTrips);

export default tripRoutes;
