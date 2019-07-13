import Schema from './schema';

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
      const validate = Schema.createUserSchema(user);
      const { error, value } = validate;
  
      if (error) {
        return res.status(400).send({
          status: 'error',
          error: error.details.map(detail => detail.message),
        });
      }
      req.body = value;
      return next();
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
    const validate = Schema.loginSchema(login);
    const { error, value } = validate;

    if (error) {
      return res.status(400).send({
        status: 'error',
        error: error.details.map(detail => detail.message),
      });
    }
    req.body = value;
    return next();
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
  const validate = Schema.createTrip(type);
  const { error, value } = validate;

  if (error) {
    return res.status(400).send({
      status: 'error',
      error: error.details.map(detail => detail.message),
    });
  }
  req.body = value;
  return next();
  }

}  
  export default InputValidator;