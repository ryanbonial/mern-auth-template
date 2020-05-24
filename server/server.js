const express = require('express');
const argon2 = require('argon2');

const app = express();
app.use(express.json())
const users = [];

app.get('/ping', (req, res) => res.send('pong'));

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', async (req, res) => {
    const { name, password } = req.body
    try {
        const passwordHash = await argon2.hash(password, 10);
        users.push({ name, passwordHash });
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
})

app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    const user = users.find(user => user.name === name);
    if (!user) {
        return res.status(401).send('Invalid username or password');
    }
    try {
        if (await argon2.verify(user.passwordHash, password)) {
            return res.status(200).send(user);
        } else {
            return res.status(401).send('Invalid username or password');
        }
    } catch (e) {
        res.status(500).json(e);
    }
});

console.log('Server listening on http://localhost:4000/ping')
app.listen(4000);