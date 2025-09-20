const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

exports.registerGet = (req, res) => {
    res.render('register');
};

exports.registerPost = async(req, res) => {
    try {
        const { username, password, email, phone } = req.body;
        const user = new User({ username, password, email, phone });
        await user.save();
        req.session.userId = user._id;
        res.redirect('/');
    } catch (err) {
        res.send('Error: ' + err.message);
    }
};

exports.loginGet = (req, res) => {
    res.render('login');
};

exports.loginPost = async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.send('User not found');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.send('Incorrect password');

    req.session.userId = user._id;
    res.redirect('/');
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) console.log(err);
        res.clearCookie('connect.sid');
        res.redirect('/auth/login');
    });
};

exports.forgotGet = (req, res) => {
    res.render('forgot');
};

exports.forgotPost = async(req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.send('Email not found');

    // Tạo mật khẩu mới ngẫu nhiên
    const newPassword = crypto.randomBytes(4).toString('hex');
    user.password = newPassword;
    await user.save();

    // TODO: Gửi email mật khẩu mới (ở đây tạm show ra)
    res.send(`New password: ${newPassword}. Please login and change it.`);
};