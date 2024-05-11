// Exporting a function that defines and configures the Student model
module.exports = (sequelize, DataTypes) => {
    // Define the Student model with attributes and validations
    const Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true // Validation to ensure the name is not empty
            }
        },
        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Each student should have a unique starID
            validate: {
                notEmpty: true // Validation to ensure the starID is not empty
            }
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false // Default value for the 'present' attribute is false
        }
    });

    // Synchronize the model with the database (create the table if it doesn't exist)
    Student.sync({ force: false }).then(() => {
        console.log('Synced student table'); // Log a message when the synchronization is successful
    });

    return Student; // Return the Student model for use in other parts of the application
};