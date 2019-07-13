import moment from 'moment';
import Pool from './db';
import Auth from '../auth/auth';

const queryText = `
  INSERT INTO users (first_name, last_name, email, password, is_admin) 
  VALUES ('Aisha', 'Abdulkareem', 'aishabd@gmail.com', '${Auth.hashPassword('password')}', true),
         ('Dasola', 'Akolo', 'dassyakolo@gmail.com', '${Auth.hashPassword('password')}', true),
         ('Jasmine', 'Abdul', 'jas.abdul@gmail.com', '${Auth.hashPassword('password')}', false),
         ('Jane', 'Doe', 'janedoe@gmail.com', '${Auth.hashPassword('password')}', false);

  INSERT INTO bus (number_plate, manufacturer, model, year, capacity)
  VALUES('GRBMJ-3VY', 'Toyota', 'Hiace', '2018', '14' ),
        ('CVPJY-E4H', 'Ford', 'Mover', '2018', '12' );

  INSERT INTO trip (bus_id, origin, destination, trip_date, fare, status)
  VALUES(1,'Lagos', 'Abuja', '${moment(new Date())}', 8000, 'cancelled'),
        (2, 'Warri', 'Abuja','${moment(new Date())}', 8000, 'active');

  INSERT INTO bookings (trip_id, user_id, seat_number,created_on)
  VALUES(2, 3, 4, '${moment(new Date())}');
`;

Pool.query(queryText);