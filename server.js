const express = require('express'); // Import the Express framework
const apiRoutes = require('./routes/api.js'); // Import API routes
const path = require('path'); // Import the path module

const app = express(); // Create an Express application

app.use(express.json()); // Middleware to parse JSON bodies

const staticFilePath = path.join(__dirname, 'client', 'dist'); // Define the path to static files
const staticFiles = express.static(staticFilePath); // Middleware to serve static files
app.use('/', staticFiles); // Mount the static middleware on the root path

app.use('/api', apiRoutes); // Mount API routes on the '/api' path

// Middleware for handling 404 errors (Not Found)
app.use(function(req, res, next) {
    res.status(404).send('Not found');
});

// Error-handling middleware for server errors
app.use(function(err, req, res, next) {
    console.error(err.stack); // Log the error stack for server developers
    res.status(500).send('Server error'); // Send a generic error message to the client
});

// Start the server and listen on the specified port
const server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port', server.address().port);
});