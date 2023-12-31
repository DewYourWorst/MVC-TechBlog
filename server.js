const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path')
const helpers = require('./utils/helpers')

const PORT = process.env.PORT || 3001;
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
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers'));

app.listen(PORT, () => {
    console.log(`App listening to port: ${PORT}`);
    sequelize.sync({force: false})
})