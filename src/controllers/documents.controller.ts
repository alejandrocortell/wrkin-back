import { Document } from '../database/models'

async function getDocuments(): Promise<any[]> {
    return await Document.findAll({
        order: [['id', 'ASC']],
    })
}

async function createDocument(
    name: string,
    nameServer: string,
    path: string,
    organization: number,
    user: number,
    documentType: number
): Promise<number> {
    let document = await Document.create({
        name: name,
        nameServer: nameServer,
        path: path,
        organizationId: organization,
        userId: user,
        documentTypeId: documentType,
    })

    return document.id
}

async function getDocument(id: number): Promise<any> {
    let document = await Document.findByPk(id)
    if (!document) throw Error('404')

    return document
}

async function deleteDocument(id: number): Promise<void> {
    let document = await Document.findByPk(id)
    if (!document) throw Error('404')

    await document.destroy()
}

export default {
    getDocuments,
    createDocument,
    getDocument,
    deleteDocument,
}
