let isLoggedIn = false;

async function registerUser(event) {
    event.preventDefault();

    // Get the entered email and password
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send registration data to the server for verification
    const registrationSuccessful = await sendRegistrationData(email, password);

    if (registrationSuccessful) {
        isLoggedIn = true;
        alert('Registration / Login successful!');
        toggleContentVisibility();
    } else {
        alert('Invalid email or password! Please use a busd.school email address and provide the correct password.');
    }
}

async function sendRegistrationData(email, password) {
    // Send registration data to the server (you need to implement this on the server)
    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    return result.success;
}

function toggleContentVisibility() {
    const registrationSection = document.getElementById('registration');
    const mainNav = document.getElementById('main-nav');
    const mainContent = document.getElementById('main-content');

    if (isLoggedIn) {
        registrationSection.style.display = 'none';
        mainNav.style.display = 'block';
        mainContent.style.display = 'block';
        // Show other content based on login status
    } else {
        alert('Please login to access the content.');
    }
}
