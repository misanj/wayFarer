import Auth from '../auth/auth';
import db from '../migration/db';

/**
 * @exports User
 * @class User
 */
class User {
  /**
   * @param {*} data
   * @returns { object } user object
   */
  static create(data) {
    const queryText = `INSERT INTO users (first_name, last_name, email, password)
     VALUES ($1, $2, $3, $4) RETURNING user_id, first_name, last_name, email, is_admin;`;

    const {
      first_name, last_name, email, password,
    } = data;

    const hashedPassword = Auth.hashPassword(password);
    const values = [first_name, last_name, email, hashedPassword];
    const response = db.query(queryText, values);
    return response;
  }

  /**
   * @param {*} email
   * @returns { object } user object
   */
  static find(email) {
    const query = 'SELECT * FROM users WHERE email=$1';
    const response = db.query(query, [email]);
    return response;
  }

}

export default User;
