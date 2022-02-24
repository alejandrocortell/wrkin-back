const util = require('util')
const fs = require('fs')
const multer = require('multer')

let storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const path = `./uploads/avatar/`
        fs.mkdirSync(path, { recursive: true })
        cb(null, path)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

let uploadFile = multer({
    storage: storage,
}).single('avatar')

let uploadFileMiddleware = util.promisify(uploadFile)

module.exports = uploadFileMiddleware
