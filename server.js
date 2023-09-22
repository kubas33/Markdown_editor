const express = require('./node_modules/express');
const hbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
var FileStore = require('session-file-store')(session);


const mainRouter = require('./routes/mainRouter');
const documentsRouter = require('./routes/documentsRouter');
const authRouter = require('./routes/authRouter');
const { handlebarsHelpers } = require('./helpers/handlebars-helpers');
const authController = require('./controllers/authController');

const app = express();
const port = 3000;
const fileStoreOptions = {
  ttl: 7200,
};

app.engine('.hbs', hbs.engine({ extname: '.hbs', helpers: handlebarsHelpers }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
passport.use(authController.localStrategy);
app.use(session({
  store: new FileStore(fileStoreOptions),
  secret: 'your_secret', resave: false, saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/documents', documentsRouter);

app.listen(port, () => {
  console.log(`Serwer Express nasłuchuje na porcie ${port}`);
  console.log(`Wejdź na stronę pod adresem http://localhost:${port}`);
});
