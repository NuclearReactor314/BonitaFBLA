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

    // 查重
    const existingUser = getUser(email);

    if (existingUser) {
        alert('Email is already registered.');
    } else {
        // Register the user
        saveUser({ email, password });
        isLoggedIn = true;
        currentUserEmail = email;

        // 更新数据，存储在DATA.md
        updateData();

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

    // 核对数据，邮箱和密码
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

    // Save the updated user list to DATA.md
    updateData(users);
}

function getReadmeText() {
    const readmeUrl = 'https://raw.githubusercontent.com/your-username/your-repo/main/DATA.md';
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

function updateData(users) {
    const dataUrl = 'https://github.com/NuclearReactor314/BonitaFBLA.git/main/DATA.md';

    // If users parameter is not provided, use the existing users
    if (!users) {
        users = getUsers();
    }

    // Construct the updated DATA.md content
    let updatedData = '# User Database\n\n## Users\n\n| Email | Password |\n| --- | --- |\n';

    users.forEach(user => {
        updatedData += `| ${user.email} | ${user.password} |\n`;
    });

    // Update DATA.md using GitHub API (requires appropriate GitHub token)
    // You may need to use a server-side script for this operation due to CORS restrictions

    // For example, using fetch and GitHub API:
    /*
    fetch(dataUrl, {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer YOUR_GITHUB_TOKEN',
        },
        body: JSON.stringify({
            message: 'Update user data',
            content: btoa(updatedData), // Convert to base64
            sha: 'SHA_OF_EXISTING_DATA', // Replace with the actual SHA
        }),
    });
    */

    // For simplicity, you might manually update DATA.md on GitHub after testing
}
