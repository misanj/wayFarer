import users from '../models/users';
import Auth from '../auth/auth';
import ResponseMsg from '../helpers/response';

const { resLong, resErr } = ResponseMsg;

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
    return resErr(res, 409, 'email is already taken');
    }
    const response = await users.create(req.body);
    const user = response.rows[0];
    const { user_id, is_admin } = user;
    const token = Auth.generateToken({
      user_id, is_admin,
    });
    return resLong(res, 201, {
      ...user, token,
    });
    }

  /**
  * @method signIn
  * @description Logs in a user
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
static async signIn(req, res) {
  const { email, password } = req.body;
  const response = await users.find(email);

    if (response.rowCount < 1 || !Auth.verifyPassword(password, response.rows[0].password)) {
      return resErr(res, 400, 'The email and password you entered does not exist! Please check and try again.');
    }
    const {
      user_id, first_name, last_name, is_admin,
    } = response.rows[0];
    const token = Auth.generateToken({
      user_id, is_admin,
    });
    return resLong(res, 200, {
      user_id, first_name, last_name, email, is_admin, token,
    });
  }
}
export default UserController;
