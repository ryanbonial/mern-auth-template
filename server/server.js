require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const authToken = require('./auth/authToken');
const authGuard = require('./auth/authGuard');

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, maxAge: 200, origin: 'http://localhost:3000' }));
app.use(cookieParser());
const users = [];

app.get('/ping', (req, res) => res.send('pong'));
app.get('/protected-ping', authGuard, (req, res) => res.send('protected pong'));

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', async (req, res) => {
    const { name, password } = req.body;
    try {
        const passwordHash = await argon2.hash(password, 10);
        users.push({ name, passwordHash, refreshBlacklist: [] });
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});

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
            return res.status(200).send({ token: jwt });
        } else {
            return res.status(401).send('Invalid username or password');
        }
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

app.post('/logout', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const refreshPayload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, { algorithms: ['HS256'] });
    const user = users.find(user => user.name === refreshPayload.user.name && !user.refreshBlacklist.includes(refreshPayload.jti));
    if (!user) {
        // Should we really require a valid session to logout?
        return res.status(401).send('Invalid token');
    }
    user.refreshBlacklist.push(refreshPayload.jti);
    res.status(200).send();
});

app.get('/refresh-login', (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const refreshPayload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, { algorithms: ['HS256'] });
        const user = users.find(user => user.name === refreshPayload.user.name && !user.refreshBlacklist.includes(refreshPayload.jti));
        if (!user) {
            return res.status(401).send('Invalid refresh token');
        }
        user.refreshBlacklist.push(refreshPayload.jti);
        const newAuthToken = authToken.getAuthToken(refreshPayload.user);
        res.cookie('refreshToken', authToken.getRefreshToken(refreshPayload.user), { httpOnly: true });
        return res.status(200).send({ token: newAuthToken });
    } catch {
        return res.status(401).send('Invalid refresh token');
    }
});

console.log('🙉 Server listening on http://localhost:4000/ping');
app.listen(4000);