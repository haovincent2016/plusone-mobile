const getToken = require('jsonwebtoken')

exports.verToken = function(token){
    return new Promise((resolve,rejece) => {
        const info = getToken.verify(token.split(' ')[1],"qweasd789456");
        resolve(info);
    })
}