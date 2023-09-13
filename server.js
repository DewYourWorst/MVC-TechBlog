const express = require('express');
const sessions = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path')
const helpers = require('./utils/helpers')

const PORT = process.env.PORT || 3000;
const app = express();

const sequelize = require('./config/config')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret:'Secret',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')