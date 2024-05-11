const { Sequelize, DataTypes } = require('sequelize'); // Import Sequelize and DataTypes from sequelize
const configJson = require('../config.json'); // Import the database configuration JSON file
const createStudentModel = require('./student'); // Import function to create Student model

// Determine the environment (defaults to 'development')
const env = process.env.NODE_ENV || 'development';

// Retrieve the database password from environment variables
const dbPassword = process.env.DB_PASSWORD;

// Load the database configuration based on the environment
const config = configJson[env];
config.password = dbPassword; // Set the database password in the config object

// Create a new Sequelize instance using the loaded configuration
const sequelize = new Sequelize(config);

// Object to hold database-related elements
const database = {
    sequelize: sequelize, // Sequelize instance
    Sequelize: Sequelize, // Sequelize class
};

// Create the Student model using the provided function
const studentModel = createStudentModel(sequelize, DataTypes);

// Extract the name of the Student model
const studentModelName = studentModel.name;

// Add the Student model to the database object
database[studentModelName] = studentModel;

// Export the database object for use in other parts of the application
module.exports = database;