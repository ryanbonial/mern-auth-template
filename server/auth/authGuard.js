const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token, process.env.AUTH_TOKEN_SECRET, { algorithms: ['HS256'] });
        next();
    } catch {
        res.status(401).json({ error: 'Invalid authorization token' });
    }
};