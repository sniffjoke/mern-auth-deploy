const jwt = require('jsonwebtoken')


module.exports = (data) => {
    return jwt.sign(data, process.env.TOKEN_KEY, { expiresIn: '7d' });
}
