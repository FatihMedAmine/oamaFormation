const { body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

// exports.getStudentValidator = [
//     body.param('id').isInt().withMessage('Student ID must be an integer'),
//     validatorMiddleware
// ]





const createStudentValidator = [
  body('first-name')
    .isString()
    .withMessage('First name must be a string')
    .notEmpty()
    .withMessage('First name is required'),
    validatorMiddleware
];



module.exports = { createStudentValidator };
