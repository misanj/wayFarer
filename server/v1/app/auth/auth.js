import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

/**
 * @class Auth
 * @description Contains methods for each user related endpoint
 * @exports Auth
 */

 class Auth {
    /**
     * @method hashPassword
     * @description hashes user inputed password
     * @param {string} password - the user password to be hashed
     * @returns {string} A string of the hashed password
     */
    static hashPassword(password){
      return bcrypt.hashSync(password, saltRounds);
    }

    /**
     * @method verifyPassword
     * @description verifies if the user password is valid by comparing
     * it against the stored hashed password
     * @param {string} plainTextPassword - password to be verified
     * @param {string} hashPassword - stored hashed password to compared against
     * @returns {boolean} Boolean indicating success or failure
     */
    static verifyPassword(plainTextPassword, hashPassword){
      return bcrypt.compareSync(plainTextPassword, hashPassword);
    }

    /**
     * @method generateToken
     * @description generates a token for the user
     * @param {string} payload - The user payload for generating the token
     * @returns {string} A string which is the token
     */
    static generateToken(payload){
      const token = jwt.sign(payload, secretKey, {expiresIn: '1 day'});
      return token;
    }

    /**
     * @method verifyToken
     * @description Verifies generated user token
     * @param {string} payload - payload for generating the token
     * @param {string} otp - The one time password genereted from the user's hashed password
     * @returns {string} a string which is the token
     */
  static verifyToken(payload, otp){
    const decoded = jwt.sign(payload, otp, { expiresIn: '30 mins' });
    return decoded;
  }
 }

 export default Auth;