const express = require('./node_modules/express');
const hbs = require('express-handlebars');
const mainRouter = require('./routes/mainRouter');
const documentsRouter = require('./routes/documentsRouter');
const authRouter = require('./routes/auth');
const { handlebarsHelpers } = require('./helpers/handlebars-helpers');

const app = express();
const port = 3000;

app.engine('.hbs', hbs.engine({ extname: '.hbs', helpers: handlebarsHelpers }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', mainRouter);
app.use('/', authRouter);
app.use('/documents', documentsRouter);

app.listen(port, () => {
  console.log(`Serwer Express nasłuchuje na porcie ${port}`);
  console.log(`Wejdź na stronę pod adresem http://localhost:${port}`);
});
