const { body, param, validationResult } = require('express-validator');
const mongoose = require('mongoose');

exports.validateProduct = [
  body('name').notEmpty().withMessage('name is required!!'),
  body('price').isFloat({ min: 0 }).withMessage('price must be a positive number! (minimum is 0)'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

exports.validateMongoId = [
  param('id').custom(value => {
    if (!mongoose.Types.ObjectId.isValid(value)) throw new Error('invalid id format');
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];
