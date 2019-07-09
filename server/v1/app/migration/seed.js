import moment from 'moment';
import Pool from './db';
import Auth from '../auth/auth';

const queryText = `
  INSERT INTO users (firstName, lastName, email, password, type, isAdmin) 
  VALUES ('Aisha', 'Abdulkareem', 'aishabd@gmail.com', '${Auth.hashPassword('password')}', 'admin', true),
         ('Dasola', 'Akolo', 'dassyakolo@gmail.com', '${Auth.hashPassword('password')}', 'member', false),
         ('Jasmine', 'Abdul', 'jas.abdul@gmail.com', '${Auth.hashPassword('password')}', 'member', false),
         ('Jane', 'Doe', 'janedoe@gmail.com', '${Auth.hashPassword('password')}', 'member', false);
`;

Pool.query(queryText);