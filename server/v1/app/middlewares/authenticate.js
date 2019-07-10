import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

/**
 * @class AuthenticateUser
 * @description Contains methods for user authentication
 * @exports AuthenticateUser
 */
class AuthenticateUser {
/**
 * @method verifyUser
 * @description verifies the user token
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @param {object} next - The next Object
 * @returns {object} JSON API Response
 */
  static verifyUser(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: res.statusCode,
          error: 'Authentication Failed',
        });
      }
      req.user = decoded;
    });
    if (req.user.type !== 'user') {
      return res.status(403).json({
        status: res.statusCode,
        error: 'Please sign in with a client account to access this endpoint',
      });
    }

    return next();
  }

  /**
   * @method verifyAdmin
   * @description verifies the user token to determine if the user is admin or not
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The next Object
   * @returns {object} JSON API Response
   */
  static verifyAdmin(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: res.statusCode,
          error: 'Authentication Failed',
        });
      }
      req.user = decoded;
    });
    if (!req.user.isAdmin) {
      return res.status(403).send({
        status: res.statusCode,
        error: 'Unauthorized',
      });
    }
    return next();
  }
}

export default AuthenticateUser;
