import jwt from 'jsonwebtoken';
import users from '../models/users';
import Auth from '../auth/auth';

/**
 * @class UserController
 * @description Contains methods for each user related endpoint
 * @exports UserController
 */
class UserController {
  /**
  * @method signUp
  * @description Adds a user to the database
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  static async signUp(req, res) {
    const findUser = await users.find(req.body.email);
    if (findUser.rowCount > 0) {
    return res.status(409).json({
      status: res.statusCode,
      error: 'email is already taken',
      });
    }
    const response = await users.create(req.body);
    const user = response.rows[0];
    const token = Auth.generateToken(user);
    return res.status(201).json({
      status: res.statusCode,
      data: [{
        token,
        ...user,
        }],
      });
    }
}
export default UserController;