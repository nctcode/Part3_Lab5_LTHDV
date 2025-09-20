const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', productController.index);
router.get('/create', productController.create);
router.post('/create', productController.store);
router.get('/edit/:id', productController.edit);
router.post('/edit/:id', productController.update);
router.get('/delete/:id', productController.delete);

module.exports = router;