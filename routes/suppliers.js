const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', supplierController.index);
router.get('/create', supplierController.create);
router.post('/create', supplierController.store);
router.get('/edit/:id', supplierController.edit);
router.post('/edit/:id', supplierController.update);
router.get('/delete/:id', supplierController.delete);

module.exports = router;