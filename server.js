const express = require('./node_modules/express');
const hbs = require('express-handlebars');
const path = require('path')
const mainRouter = require('./routes/mainRouter');
const documentsRouter = require('./routes/documentsRouter');

const app = express();
const port = 3000;

app.engine('.hbs', hbs.engine({extname: '.hbs',
helpers: {
  formatDate: function(dateTimeString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString('en-GB', options);
  }
}}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}))

app.use('/', mainRouter);
app.use('/documents', documentsRouter);

const publicPath = path.join(__dirname, 'public');




app.listen(port, () => {
  console.log(`Serwer Express nasłuchuje na porcie ${port}`);
});