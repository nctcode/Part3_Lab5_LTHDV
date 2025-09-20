const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = (app) => {
    const mongoUrl = process.env.MONGO_URI;
    if (!mongoUrl) throw new Error("MONGO_URI is not defined in .env");

    app.use(session({
        secret: process.env.SESSION_SECRET || 'secretkey',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 1 ngày
        }
    }));
};