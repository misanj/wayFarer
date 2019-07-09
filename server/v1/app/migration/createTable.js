import Pool from './db';


const queryText = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(130) UNIQUE NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    type VARCHAR(7) DEFAULT 'user',
    isAdmin BOOLEAN DEFAULT NULL
  ); 
`;

Pool.query(queryText);
