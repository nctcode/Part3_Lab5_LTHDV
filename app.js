require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// ========================
// Database connection
// ========================
const mongoUrl = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/supplier-product-app';

mongoose.connect(mongoUrl)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// ========================
// Middleware
// ========================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// ========================
// Session
// ========================
app.use(session({
    secret: process.env.SESSION_SECRET || 'mysecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl }),
    cookie: { maxAge: 1000 * 60 * 60 } // 1h
}));

// ========================
// Make userId available in EJS templates
// ========================
app.use((req, res, next) => {
    res.locals.userId = req.session.userId || null;
    next();
});

// ========================
// Routes
// ========================
app.use('/', require('./routes/index')); // Trang chủ
app.use('/auth', require('./routes/auth')); // Đăng nhập / đăng ký / quên mật khẩu
app.use('/suppliers', require('./routes/suppliers')); // CRUD nhà cung cấp
app.use('/products', require('./routes/products')); // CRUD sản phẩm

// ========================
// Start server
// ========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));