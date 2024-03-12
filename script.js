let isLoggedIn = false;
let currentUserEmail = '';

// Function to update the display with logged-in user's email
function updateLoggedInUserDisplay() {
    const loggedInUserElement = document.getElementById('loggedInUser');
    if (isLoggedIn) {
        loggedInUserElement.textContent = `Logged in as: ${currentUserEmail}`;
    } else {
        loggedInUserElement.textContent = '';
    }
}

// Function to close registration popup
function closeRegistrationPopup() {
    // Implement the logic to close your registration popup here
}

// Function to check if the email is from 'busd.school'
function isValidEmail(email) {
    const allowedDomain = 'busd.school';
    const lowercasedEmail = email.toLowerCase();

    if (lowercasedEmail.endsWith('@' + allowedDomain)) {
        return true;
    } else {
        alert('Invalid email! Please use a busd.school email address.');
        return false;
    }
}

// Function to manually register a user
function registerUserManually(email, password) {
    // Implement your user registration logic here
    // For demonstration, let's assume you have a SQLite database named 'users.db' and a table named 'users'
    // You need to adjust this code according to your actual setup
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('users.db');

    db.serialize(function() {
        // Check if the user already exists
        db.get("SELECT * FROM users WHERE email = ?", email, function(err, row) {
            if (err) {
                console.error(err.message);
                return;
            }
            if (row) {
                alert('Email is already registered.');
            } else {
                // Insert the new user into the database
                db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, password], function(err) {
                    if (err) {
                        console.error(err.message);
                        return;
                    }
                    alert('Registration successful!');
                });
            }
        });
    });

    db.close();
}

// Function to display registration prompt
function displayRegistrationPrompt() {
    const registrationPrompt = confirm('You need to register to access the website. Click "OK" to register.');

    if (registrationPrompt) {
        // User clicked "OK" to register
        const email = prompt('Enter your email:');
        const password = prompt('Enter your password:');

        // Call your registration function with email and password
        registerUserManually(email, password);

        // Close the registration popup
        closeRegistrationPopup();
    } else {
        // User clicked "Cancel" or closed the prompt
        // You can handle this as needed, for example, redirecting or displaying a message
        alert('You must register to access the website.');
        window.location.href = 'https://www.your-redirect-page.com'; // Replace with your redirect page
    }
}

// Function to log in a user
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isLoggedIn) {
        alert('You are already logged in.');
        return;
    }

    // Check if the user exists and the password is correct
    // For demonstration, assume you have a SQLite database named 'users.db' and a table named 'users'
    // You need to adjust this code according to your actual setup
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('users.db');

    db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], function(err, row) {
        if (err) {
            console.error(err.message);
            return;
        }
        if (row) {
            isLoggedIn = true;
            currentUserEmail = email;
            alert('Login successful!');
            toggleContentVisibility();
            updateLoggedInUserDisplay(); // Update the display with logged-in user's email
        } else {
            alert('Invalid email or password!');
        }
    });

    db.close();
}

// Update the display with logged-in user's email on script load
updateLoggedInUserDisplay();
