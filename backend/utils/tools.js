const getToken = require('jsonwebtoken')

const secret = "qweasd789456"

const verifyToken = token => {
    return new Promise((resolve, reject) => {
        const info = getToken.verify(token.split(' ')[1], secret);
        resolve(info);
    })
}

module.exports = verifyToken