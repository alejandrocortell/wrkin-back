require('dotenv').config()

module.exports = {
    keyJWT: process.env.SECRET_KEY_TOKENS,
    keyPass: process.env.SECRET_KEY_PASSWORDS,
}
