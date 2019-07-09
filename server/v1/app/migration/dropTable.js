import Pool from './db';

const queryText = 'DROP TABLE IF EXISTS users;';

Pool.query(queryText);
