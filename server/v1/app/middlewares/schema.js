import Joi from '@hapi/joi';

/**
 * @class Schema
 * @description Validates user input.
 * @exports Schema
 */
class Schema {
    /**
    * @method createUserSchema
    * @description Validates the user object from a post request
    * @param {object} user - The user object to be validated
    * @returns {object} An object specifying weather the input was valid or not.
    */
    static createUserSchema(user) {
      const schema = {
        first_name: Joi.string().lowercase().trim().required()
          .regex(/^[a-zA-Z]+$/)
          .error((errors) => {
            errors.forEach((err) => {
              switch (err.type) {
                case 'string.regex.base':
                  err.message = 'first_name can only contain letters';
                  break;
                default:
                  break;
              }
            });
            return errors;
          }),
        last_name: Joi.string().lowercase().trim().required()
          .regex(/^[a-zA-Z]+$/)
          .error((errors) => {
            errors.forEach((err) => {
              switch (err.type) {
                case 'string.regex.base':
                  err.message = 'last_name can only contain letters';
                  break;
                default:
                  break;
              }
            });
            return errors;
          }),
        email: Joi.string().trim().lowercase().email({ minDomainSegments: 2 })
          .required(),
        password: Joi.string().min(8).required(),
      };
      return Joi.validate(user, schema, { abortEarly: false });
    }

      /**
    * @method loginSchema
    * @description Validates the login details from a post request
    * @param {object} login - The login object to be validated
    * @returns {object} An object specifying weather the input was valid or not.
    */
    static loginSchema(login) {
      const schema = {
        email: Joi.string().trim().lowercase().email({ minDomainSegments: 2 })
          .required(),
        password: Joi.string().min(8).required(),
      };
      return Joi.validate(login, schema, { abortEarly: false });
    }
    
  }
  
  export default Schema;
  