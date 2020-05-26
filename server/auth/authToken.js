const jsonwebtoken = require('jsonwebtoken');

const getAuthToken = function (user) {
    return jsonwebtoken.sign({ user: { name: user.name } }, process.env.AUTH_TOKEN_SECRET, { expiresIn: "10m" });
}

const getRefreshToken = function (user) {
    return jsonwebtoken.sign({ user: { name: user.name } }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

module.exports = {
    getAuthToken,
    getRefreshToken
};