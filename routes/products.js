const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.js');
const { validateProduct, validateMongoId } = require('../controllers/validator.js');

router.post('/new', validateProduct, controller.createProduct);
router.get('/', controller.getAllProducts);
router.get('/:id', validateMongoId, controller.getProduct);
router.put('/:id', validateMongoId, validateProduct, controller.updateProduct);
router.delete('/:id', validateMongoId, controller.deleteProduct);

module.exports = router;
