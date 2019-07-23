import Schema from './schema';
import validate from '../helpers/validate';

/**
 * @class InputValidator
 * @description Validates all user inputs
 * @exports InputValidator
 */
class InputValidator {
    /**
      * @method validateUser
      * @description Validates the user object passed in from the request body
      * @param {object} req - The Request Object
      * @param {object} res - The Response Object
      * @param {function} next - The next function to point to the next middleware
      * @returns {function} next() - The next function
      */
    static validateUser(req, res, next) {
      const user = { ...req.body };
      return validate(user, Schema.createUserSchema(), req, res, next);
    } 
    
  /**
  * @method validateLogin
  * @description Validates the login details passed in from the request body
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @param {function} next - The next function to point to the next middleware
  * @returns {function} next() - The next function
  */
  static validateLogin(req, res, next) {
    const login = { ...req.body };
    return validate(login, Schema.loginSchema(), req, res, next);
  }

  
  /**
  * @method validateTrip
  * @description Validates the login details passed in from the request body
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @param {function} next - The next function to point to the next middleware
  * @returns {function} next() - The next function
  */
 static validateTrip(req, res, next) {
  const type = { ...req.body };
  return validate(type, Schema.createTrip(), req, res, next);
  }

  /**
  * @method validateBooking
  * @description Validates the booking details passed in from the request body
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @param {function} next - The next function to point to the next middleware
  * @returns {function} next() - The next function
  */
  static validateBooking(req, res, next) {
    const type = { ...req.body };
    return validate(type, Schema.bookTrip(), req, res, next);
  } 


}  

export default InputValidator;
