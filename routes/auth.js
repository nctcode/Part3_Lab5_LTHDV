const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Trang đăng ký
router.get('/register', (req, res) => {
    res.render('register', { error: null });
});

// Xử lý đăng ký
router.post('/register', async(req, res) => {
    const { username, email, phone, password, confirm } = req.body;
    if (password !== confirm) return res.render('register', { error: 'Passwords do not match' });

    try {
        const user = new User({ username, email, phone, password });
        await user.save();
        res.redirect('login');
    } catch (err) {
        res.render('register', { error: 'User already exists or invalid data' });
    }
});

// Trang đăng nhập
router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Xử lý đăng nhập
router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.render('login', { error: 'Invalid username or password' });

    const match = await user.comparePassword(password);
    if (!match) return res.render('login', { error: 'Invalid username or password' });

    // Tạo session + cookie
    req.session.userId = user._id;
    req.session.username = user.username;
    res.redirect('/');
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        res.clearCookie('connect.sid');
        res.redirect('/auth/login');
    });
});

// Trang quên mật khẩu (chỉ demo: gửi password mới ra console)
router.get('/forgot', (req, res) => {
    res.render('forgot', { message: null });
});

router.post('/forgot', async(req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.render('forgot', { message: 'Email not found' });

    // Demo: reset password ngẫu nhiên và in ra console
    const newPassword = Math.random().toString(36).slice(-8);
    user.password = newPassword;
    await user.save();
    console.log(`Reset password for ${email}: ${newPassword}`);
    res.render('forgot', { message: 'Password reset. Check console for new password (demo)' });
});

module.exports = router;