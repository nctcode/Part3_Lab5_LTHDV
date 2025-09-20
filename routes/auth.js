const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/register', authController.registerGet);
router.post('/register', authController.registerPost);

router.get('/login', authController.loginGet);
router.post('/login', authController.loginPost);

router.get('/logout', authController.logout);

router.get('/forgot', authController.forgotGet);
router.post('/forgot', authController.forgotPost);

module.exports = router;