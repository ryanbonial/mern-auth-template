const jsonwebtoken = require('jsonwebtoken');

const getAuthToken = function(user) {
    return jsonwebtoken.sign({ userName: user.name }, 'reallyBadJwtSecret', { expiresIn: "10m" });
}

const getRefreshToken = function(user) {
    return jsonwebtoken.sign({ userName: user.name }, 'reallyBadRefreshSecret', { expiresIn: "7d" });
}

module.exports = {
    getAuthToken,
    getRefreshToken
};