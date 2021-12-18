import { DocumentType } from '../database/models'

async function getDocumentsTypes(): Promise<any[]> {
    return await DocumentType.findAll({
        order: [['id', 'ASC']],
    })
}

async function createDocumentType(name: string): Promise<any> {
    let documentType = await DocumentType.create({ name: name })

    return documentType
}

async function getDocumentType(id: number): Promise<any> {
    let documentType = await DocumentType.findByPk(id)
    if (documentType === null) return 404

    return documentType
}

async function updateDocumentType(id: number, name: string): Promise<any> {
    let documentType = await DocumentType.findByPk(id)
    if (documentType === null) return 404

    documentType = await documentType.update({ name: name })
    if (documentType === null) return 404
    return documentType
}

async function deleteDocumentType(id: number): Promise<any> {
    let documentType = await DocumentType.findByPk(id)
    if (documentType === null) return 404

    const deleted = await documentType.destroy()
    return deleted
}

export default {
    getDocumentsTypes,
    createDocumentType,
    getDocumentType,
    updateDocumentType,
    deleteDocumentType,
}
