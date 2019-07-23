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
    static createUserSchema() {
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
      return schema;
    }

      /**
    * @method loginSchema
    * @description Validates the login details from a post request
    * @param {object} login - The login object to be validated
    * @returns {object} An object specifying weather the input was valid or not.
    */
    static loginSchema() {
      const schema = {
        email: Joi.string().trim().lowercase().email({ minDomainSegments: 2 })
          .required(),
        password: Joi.string().min(8).required(),
      };
      return schema;
    }

    /**
  * @method createTrip
  * @description Validates the account details from a post request
  * @param {object} trip - The account object to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  static createTrip() {
    const schema = {
      bus_id: Joi.number().required(),
      origin: Joi.string().trim().lowercase().required(),
      destination: Joi.string().trim().lowercase().required(),
      fare: Joi.number().min(2000).required(),
    };
    return schema;
  }

    /**
  * @method bookTrip
  * @description Validates the booking details from a post request
  * @param {object} trips - The booking object to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  static bookTrip() {
    const schema = {
      user_id: Joi.number().required(),
      trip_id: Joi.number().required(),
      trip_date: joi.number().required(),
      bus_id: Joi.number().required(),
      seat_number: Joi.number().required(),
      first_name: Joi.string().trim().lowercase().required(),
      last_name: Joi.string().trim().lowercase().required(),
      email: Joi.string().trim().lowercase().email({ minDomainSegments: 2 })
      .required(),
    };
    return schema;
  }
}
  
export default Schema;
  