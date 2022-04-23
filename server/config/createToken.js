const jwt = require('jsonwebtoken')


module.exports = (data) => {
    return jwt.sign(data, '$jfdkslajfal/$fjkslajfklejf', { expiresIn: '7d' });
}