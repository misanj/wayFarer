import moment from 'moment';
import Pool from './db';
import Auth from '../auth/auth';

const queryText = `
  INSERT INTO users (first_name, last_name, email, password, is_admin) 
  VALUES ('Aisha', 'Abdulkareem', 'aishabd@gmail.com', '${Auth.hashPassword('password')}', true),
         ('Dasola', 'Akolo', 'dassyakolo@gmail.com', '${Auth.hashPassword('password')}', false),
         ('Jasmine', 'Abdul', 'jas.abdul@gmail.com', '${Auth.hashPassword('password')}', false),
         ('Jane', 'Doe', 'janedoe@gmail.com', '${Auth.hashPassword('password')}', false);
`;

Pool.query(queryText);