const CryptoJS = require('crypto-js')
const config = require('./../config/config')

export const encode = (text: string) => {
    return CryptoJS.AES.encrypt(text, config.keyPass).toString()
}

export const decode = (hash: string): string => {
    const bytes = CryptoJS.AES.decrypt(hash, config.keyPass)
    return bytes.toString(CryptoJS.enc.Utf8)
}
