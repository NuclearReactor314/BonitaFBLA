let isLoggedIn = false;
let currentUserEmail = '';

function registerUser(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isLoggedIn) {
        alert('You are already logged in.');
        return;
    }

    // Check if the user is already registered
    const existingUser = getUser(email);

    if (existingUser) {
        alert('Email is already registered.');
    } else {
        // Register the user
        saveUser({ email, password });
        isLoggedIn = true;
        currentUserEmail = email;

        // Update the README.md file with the new user
        updateReadme();

        alert('Registration successful!');
        toggleContentVisibility();
    }
}

function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isLoggedIn) {
        alert('You are already logged in.');
        return;
    }

    // Check if the user exists and the password is correct
    const existingUser = getUser(email);

    if (existingUser && existingUser.password === password) {
        isLoggedIn = true;
        currentUserEmail = email;
        alert('Login successful!');
        toggleContentVisibility();
    } else {
        alert('Invalid email or password!');
    }
}

function getUser(email) {
    const users = getUsers();
    return users.find(user => user.email === email);
}

function getUsers() {
    const usersText = getReadmeText();
    const users = parseUsersFromReadme(usersText);
    return users;
}

function saveUser(user) {
    const users = getUsers();
    users.push(user);

    // Save the updated user list to README.md
    updateReadme(users);
}

function getReadmeText() {
    const readmeUrl = 'https://raw.githubusercontent.com/your-username/your-repo/main/README.md';
    const response = fetch(readmeUrl);
    return response.then(res => res.text());
}

function parseUsersFromReadme(readmeText) {
    const users = [];
    const userRegex = /\| ([^|]+) \| ([^|]+) \|/g;
    let match;

    while ((match = userRegex.exec(readmeText)) !== null) {
        const email = match[1].trim();
        const password = match[2].trim();
        users.push({ email, password });
    }

    return users;
}

function updateReadme(users) {
    const readmeUrl = 'https://github.com/NuclearReactor314/BonitaFBLA.git/main/DATA.md';

    // If users parameter is not provided, use the existing users
    if (!users) {
        users = getUsers();
    }

    // Construct the updated README content
    let updatedReadme = '# User Database\n\n## Users\n\n| Email | Password |\n| --- | --- |\n';

    users.forEach(user => {
        updatedReadme += `| ${user.email} | ${user.password} |\n`;
    });

    // Update README.md using GitHub API (requires appropriate GitHub token)
    // You may need to use a server-side script for this operation due to CORS restrictions

    // For example, using fetch and GitHub API:
    /*
    fetch(readmeUrl, {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer YOUR_GITHUB_TOKEN',
        },
        body: JSON.stringify({
            message: 'Update user data',
            content: btoa(updatedReadme), // Convert to base64
            sha: 'SHA_OF_EXISTING_README', // Replace with the actual SHA
        }),
    });
    */

    // For simplicity, you might manually update README.md on GitHub after testing
}
