import Pool from './db';

const queryText = 'DROP TABLE IF EXISTS users, bus, trip, bookings CASCADE';

Pool.query(queryText);
