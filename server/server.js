require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const authToken = require('./auth/authToken');
const authGuard = require('./auth/authGuard');

const app = express();
app.use(express.json());
app.use(cookieParser());
const users = [];

app.get('/ping', (req, res) => res.send('pong'));
app.get('/protected-ping', authGuard, (req, res) => res.send('protected pong'));

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
            const jwt = authToken.getAuthToken(user);
            res.cookie('refreshToken', authToken.getRefreshToken(user), { httpOnly: true });
            return res.status(200).send(jwt);
        } else {
            return res.status(401).send('Invalid username or password');
        }
    } catch (e) {
        console.log(e)
        res.status(500).json(e);
    }
});

app.get('/refresh-login', async (req, res) => {
    try {
        const refreshPayload = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET, { algorithms: ['HS256'] });
        const newAuthToken = authToken.getAuthToken(refreshPayload.user);
        res.cookie('refreshToken', authToken.getRefreshToken(refreshPayload.user), { httpOnly: true });
        return res.status(200).send(newAuthToken);
    } catch {
        return res.status(401).send('Invalid refresh token');
    }
});

console.log('🙉 Server listening on http://localhost:4000/ping')
app.listen(4000);