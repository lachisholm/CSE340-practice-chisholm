const express = require('express');
const path = require('path');
require('dotenv').config();

const { initDb } = require('./src/db/connection');


const app = express();

/**
 * Environment variables
 */
const NODE_ENV = process.env.NODE_ENV || 'production';
const PORT = process.env.PORT || 3000;



/**
 * Middleware
 */
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));





/**
 * View engine setup
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));


app.use('/contacts', require('./src/routes/contacts'));
app.use('/faculty', require('./src/routes/faculty'));


/**
 * Routes
 */
app.get('/', (req, res) => {
    res.render('home', { title: 'Welcome Home' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Me' });
});

app.get('/products', (req, res) => {
    res.render('products', { title: 'Our Products' });
});

/**
 * Server
 */
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

