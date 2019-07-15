import moment from 'moment';
import Pool from './db';
import Auth from '../auth/auth';

const queryText = `
  INSERT INTO users (first_name, last_name, email, password, is_admin) 
  VALUES ('Aisha', 'Abdulkareem', 'aishabd@gmail.com', '${Auth.hashPassword('password')}', true),
         ('Dasola', 'Akolo', 'dassyakolo@gmail.com', '${Auth.hashPassword('password')}', true),
         ('Jasmine', 'Abdul', 'jas.abdul@gmail.com', '${Auth.hashPassword('password')}', false),
         ('Dami', 'Ayodele', 'dammy@gmail.com', '${Auth.hashPassword('password')}', false),
         ('Jane', 'Doe', 'janedoe@gmail.com', '${Auth.hashPassword('password')}', false);

  INSERT INTO bus (number_plate, manufacturer, model, year, capacity)
  VALUES('GRBMJ-3VY', 'Toyota', 'Hiace', '2018', '14' ),
        ('BRKMZ-HV5', 'Innosine', 'Hiace', '2018', '8' ),
        ('CVPJY-E4H', 'Ford', 'Mover', '2018', '12' );

  INSERT INTO trip (bus_id, origin, destination, trip_date, fare, status)
  VALUES(1,'Lagos', 'Abuja', '${moment(new Date())}', 8000, 'cancelled'),
        (2, 'Yola', 'Benue','${moment(new Date())}', 10000, 'active'),
        (3, 'Lagos', 'Benin','${moment(new Date())}', 3000, 'cancelled'),
        (2, 'Abuja', 'Ebonyi','${moment(new Date())}', 12000, 'active');

  INSERT INTO bookings (user_id, trip_id ,trip_date, bus_id, seat_number, first_name, last_name, email, created_on)
  VALUES(1, 2, '${moment(new Date())}', 1, 3, 'Jasmine', 'Abdul', 'jas.abdul@gmail.com', '${moment(new Date())}'),
        (4, 1, '${moment(new Date())}', 3, 1, 'Jane', 'Doe', 'janedoe@gmail.com', '${moment(new Date())}');
`;

Pool.query(queryText);