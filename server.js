const express = require('express');
const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Routes
// Home Page
app.get('/', (req, res) => {
    res.render('index', { title: 'Home', message: 'Welcome to the Currency Converter!' });
});

// Currency Converter Page
app.get('/converter', (req, res) => {
    res.render('converter', { title: 'Currency Converter' });
});

// 404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404 - Page Not Found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
