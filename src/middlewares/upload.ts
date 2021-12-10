const util = require('util')
const fs = require('fs')
const multer = require('multer')
import controllerOrganization from '../controllers/organizations.controller'
import controllerType from '../controllers/documentsTypes.controller'

let storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const organization = await controllerOrganization.getOrganization(req.body.organization)
        const type = await controllerType.getDocumentType(+req.body.documentType)
        const path = `./uploads/${organization.name}/${type.name}`
        fs.mkdirSync(path, { recursive: true })
        cb(null, path)
    },
})

let uploadFile = multer({
    storage: storage,
}).single('file')

let uploadFileMiddleware = util.promisify(uploadFile)

module.exports = uploadFileMiddleware
