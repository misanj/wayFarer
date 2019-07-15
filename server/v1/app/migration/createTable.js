import Pool from './db';


const queryText = `
  CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(130) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    is_admin BOOLEAN DEFAULT false
  ); 

  CREATE TABLE IF NOT EXISTS bus
(
  bus_id SERIAL PRIMARY KEY,
  number_plate VARCHAR(100) NOT NULL UNIQUE,
  manufacturer VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year VARCHAR(100) NOT NULL,
  capacity INTEGER NOT NULL 
);

CREATE TABLE IF NOT EXISTS trip(
  trip_id SERIAL PRIMARY KEY,
  bus_id INTEGER REFERENCES bus(bus_id) ON DELETE CASCADE,
  origin VARCHAR(100) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  trip_date DATE NOT NULL,
  fare NUMERIC(200,2) NOT NULL,
  status VARCHAR(100) DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS bookings(
  booking_id SERIAL PRIMARY KEY,
  trip_id INTEGER REFERENCES trip(trip_id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES user(user_id) ON DELETE CASCADE, 
  created_on TIMESTAMP NOT NULL DEFAULT now(),
  bus_id SERIAL NOT NULL REFERENCES bus(bus_id),
  trip_date TIMESTAMP NOT NULL,
  seat_number INT NOT NULL,
  first_name VARCHAR (128) NOT NULL,
  last_name VARCHAR (128) NOT NULL,
  email VARCHAR (355) NOT NULL 
);
`;

Pool.query(queryText);
