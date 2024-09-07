const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Custom Middleware 1: Logger
function loggerMiddleware(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

// Custom Middleware 2: Request Time
function requestTimeMiddleware(req, res, next) {
    req.requestTime = new Date();
    next();
}

// Use middleware
app.use(loggerMiddleware);
app.use(requestTimeMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS)
app.use(express.static('public'));

// Set EJS as template engine
app.set('view engine', 'ejs');

// Include routes
const eventRoutes = require('./routes/events');
app.use('/events', eventRoutes);

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 404 Not Found handler
app.use((req, res, next) => {
    res.status(404).send('Sorry, can\'t find that!');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
