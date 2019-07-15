import Schema from './schema';

/**
 * @class ParamValidator
 * @description Validates all request paramaters
 * @exports ParamValidator
 */
class ParamValidator {
  /**
    * @method validateIdParams
    * @description Validates IDs passed in through the request parameter
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @param {function} next - The next function to point to the next middleware
    * @returns {function} next() - The next function
    */
  static validateIdParams(req, res, next) {
    const { id } = req.params;
    const validate = Schema.idSchema(id);
    const { error, value } = validate;

    if (error) {
      return res.status(400).send({
        status: 'error',
        error: error.details.map(detail => detail.message),
      });
    }
    req.params = value;
    return next();
  }

}

export default ParamValidator;
