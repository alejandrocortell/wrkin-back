import { DocumentType } from '../database/models'

async function getDocumentsTypes(): Promise<any[]> {
    return await DocumentType.findAll({
        order: [['id', 'ASC']],
    })
}

async function createDocumentType(name: string): Promise<number> {
    let documentType = await DocumentType.create({ name: name })

    return documentType.id
}

async function getDocumentType(id: number): Promise<any> {
    let documentType = await DocumentType.findByPk(id, {})

    if (!documentType) throw Error('404')

    return documentType
}

async function updateDocumentType(id: number, name: string): Promise<void> {
    let documentType = await DocumentType.findByPk(id)
    if (!documentType) throw Error('404')

    await documentType.update({ name: name })
}

async function deleteDocumentType(id: number): Promise<void> {
    let documentType = await DocumentType.findByPk(id)
    if (!documentType) throw Error('404')

    await documentType.destroy()
}

export default {
    getDocumentsTypes,
    createDocumentType,
    getDocumentType,
    updateDocumentType,
    deleteDocumentType,
}
