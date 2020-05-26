const jsonwebtoken = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const getAuthToken = function (user) {
    return jsonwebtoken.sign(
        {
            user: { name: user.name }
        },
        process.env.AUTH_TOKEN_SECRET,
        { expiresIn: '10m' }
    );
}

const getRefreshToken = function (user) {
    return jsonwebtoken.sign(
        {
            user: { name: user.name }
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '7d',
            jwtid: uuidv4()
        }
    );
}

module.exports = {
    getAuthToken,
    getRefreshToken
};