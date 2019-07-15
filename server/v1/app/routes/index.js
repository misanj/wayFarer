import express from 'express';
import userRoutes from './users';
import tripRoutes from './trip';
import bookingRoutes from './booking';

const router = express.Router();

// Home
router.get('/', (req, res) => res.status(301).redirect('api/v1'));
router.get('/v1', (req, res) => res.status(200).json({
  status: 'success',
  message: 'Welcome to WayFarer API version 1',
}));

// Routes
router.use('/v1/auth', userRoutes);
router.use('/v1', tripRoutes);
router.use('/v1', bookingRoutes);

export default router;
