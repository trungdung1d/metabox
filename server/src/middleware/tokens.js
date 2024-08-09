const jwt =  require('jsonwebtoken')

let generateToken = (payload, expired) => {
    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: expired,
    })
}

module.exports = generateToken