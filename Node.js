const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let registeredUsers = [];

app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Check if the email is already registered
    if (registeredUsers.find(user => user.email === email)) {
        res.json({ success: false, message: 'Email is already registered.' });
    } else {
        // Store the new user's information (you may want to use a database in a real application)
        registeredUsers.push({ email, password });
        res.json({ success: true, message: 'Registration successful.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at https://nuclearreactor314.github.io/BonitaFBLA/:3000`);
});
