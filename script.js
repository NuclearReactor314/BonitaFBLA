let isLoggedIn = false;

function registerUser(event) {
    event.preventDefault();

    // Get the entered email
    const email = document.getElementById('email').value;

    // Check if the email ends with 'busd.school'
    const allowedDomain = 'busd.school';
    const lowercasedEmail = email.toLowerCase();

    if (lowercasedEmail.endsWith('@' + allowedDomain)) {
        isLoggedIn = true;
        alert('Login successful!');
        toggleContentVisibility();
    } else {
        alert('Invalid email! Please use a busd.school email address.');
    }
}

function toggleContentVisibility() {
    const registrationSection = document.getElementById('registration');
    const mainNav = document.getElementById('main-nav');
    const mainContent = document.getElementById('main-content');
    const fbla2324Nav = document.getElementById('fbla-23-24-nav');
    const fbla2324Content = document.getElementById('fbla-23-24-content');
    const fbla2425Nav = document.getElementById('fbla-24-25-nav');
    const fbla2425Content = document.getElementById('fbla-24-25-content');

    if (isLoggedIn) {
        registrationSection.style.display = 'none';
        mainNav.style.display = 'block';
        mainContent.style.display = 'block';
        fbla2324Nav.style.display = 'block';
        fbla2324Content.style.display = 'block';
        fbla2425Nav.style.display = 'block';
        fbla2425Content.style.display = 'block';
    } else {
        alert('Please login to access the content.');
    }
}
