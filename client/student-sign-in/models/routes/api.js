const express = require('express'); // Import the Express framework
const database = require('../models'); // Import the database models
const Student = database.Student; // Import the Student model

const router = express.Router(); // Create an instance of Express router

// Route to handle GET requests for fetching all students
router.get('/students', function(req, res, next) {
    Student.findAll({ order: ['present', 'name'] }) // Find all students ordered by 'present' status and then by name
        .then(students => {
            return res.json(students); // Respond with the fetched students in JSON format
        })
        .catch(err => {
            return next(err); // Forward any errors to the error-handling middleware
        });
});

// Route to handle POST requests for creating a new student
router.post('/students', function(req, res, next) {
    const newStudent = req.body; // Extract the new student data from the request body
    console.log(newStudent); // Log the new student data
    Student.create(newStudent) // Create a new student record in the database
        .then(result => {
            return res.status(201).send('New student created!'); // Respond with a success message
        })
        .catch(err => {
            if (err instanceof database.Sequelize.ValidationError) { // If the error is due to validation failure
                const messages = err.errors.map(e => e.message); // Extract error messages
                return res.status(400).json(messages); // Respond with validation error messages
            } else {
                return next(err); // Forward other errors to the error-handling middleware
            }
        });
});

// Route to handle PATCH requests for updating an existing student
router.patch('/students/:id', function(req, res, next) {
    const studentID = req.params.id; // Extract the student ID from the request parameters
    const updatedStudent = req.body; // Extract the updated student data from the request body
    console.log(studentID, updatedStudent); // Log the student ID and updated data
    Student.update(updatedStudent, { where: { id: studentID } }) // Update the student record in the database
        .then(result => {
            const rowsModified = result[0]; // Get the number of rows modified
            if (rowsModified === 1) {
                return res.send('Student updated'); // Respond with a success message if student is updated
            } else {
                return res.status(404).send('Student not found'); // Respond with an error if student is not found
            }
        })
        .catch(err => {
            if (err instanceof database.Sequelize.ValidationError) { // If the error is due to validation failure
                const messages = err.errors.map(e => e.message); // Extract error messages
                return res.status(400).json(messages); // Respond with validation error messages
            } else {
                return next(err); // Forward other errors to the error-handling middleware
            }
        });
});

// Route to handle DELETE requests for deleting an existing student
router.delete('/students/:id', function(req, res, next) {
    const studentID = req.params.id; // Extract the student ID from the request parameters
    Student.destroy({ where: { id: studentID } }) // Delete the student record from the database
        .then(rowsDeleted => {
            if (rowsDeleted === 1) {
                return res.send('Student deleted'); // Respond with a success message if student is deleted
            } else {
                return res.status(404).send('Student not found'); // Respond with an error if student is not found
            }
        })
        .catch(err => {
            return next(err); // Forward any errors to the error-handling middleware
        });
});

module.exports = router; // Export the router for use in other parts of the application