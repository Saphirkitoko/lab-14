import { defineStore } from 'pinia'; // Import defineStore function from Pinia
import { ref, computed } from 'vue'; // Import ref and computed from Vue
import { mande } from 'mande'; // Import mande for API requests

// Define the API endpoint for students
const studentAPI = mande('api/students');

// Define and export the student store using Pinia
export const useStudentStore = defineStore('students', () => {

    // Define reactive variables for student data
    const studentList = ref([]);
    const mostRecentStudent = ref({});
    const addNewStudentErrors = ref([]);

    // Function to fetch all students from the API
    function getAllStudents() {
        return studentAPI.get().then(students => {
            studentList.value = students; // Update the studentList with fetched students
        });
    }

    // Function to add a new student
    function addNewStudent(student) {
        studentAPI.post(student).then(resp => {
            getAllStudents(); // Refresh the list of students after adding a new student
        }).catch(err => {
            addNewStudentErrors.value = err.body; // Capture errors if any during addition of a new student
        });
    }

    // Function to delete a student
    function deleteStudent(studentToDelete) {
        const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`);
        deleteStudentAPI.delete().then(() => {
            mostRecentStudent.value = {}; // Clear the mostRecentStudent after deletion
            getAllStudents(); // Refresh the list of students after deletion
        });
    }

    // Function to update the arrival/departure status of a student
    function arrivedOrLeft(student) {
        const editStudentAPI = mande(`/api/students/${student.id}`);
        editStudentAPI.patch(student).then(() => {
            mostRecentStudent.value = student; // Update the mostRecentStudent after status change
            getAllStudents(); // Refresh the list of students after status change
        });
    }

    // Compute a sorted list of students by name
    const sortedStudents = computed(() => {
        return studentList.value.sort((s1, s2) => {
            return s1.name.localeCompare(s2.name); // Sort students alphabetically by name
        });
    });

    // Compute the total count of students
    const studentCount = computed(() => {
        return studentList.value.length; // Count the number of students in the list
    });

    // Return reactive data, functions, and computed properties
    return {
        studentList,
        mostRecentStudent,
        addNewStudentErrors,
        addNewStudent,
        deleteStudent,
        arrivedOrLeft,
        getAllStudents,
        sortedStudents,
        studentCount
    };
});
