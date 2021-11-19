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
    organization: string,
    user: string,
    documentType: string
): Promise<number> {
    let document = await Document.create({
        name: name,
        nameServer: nameServer,
        path: path,
        Organization: organization,
        User: user,
        DocumentType: documentType,
    })

    return document.id
}

async function getDocument(id: number): Promise<any> {
    let document = await Document.findByPk(id)
    if (!document) throw Error('404')

    return document
}

async function updateDocument(
    id: number,
    name: string | undefined,
    nameServer: string | undefined,
    path: string | undefined,
    organization: string | undefined,
    user: string | undefined,
    documentType: string | undefined
): Promise<void> {
    let document = await Document.findByPk(id)
    if (!document) throw Error('404')

    const userUpdated = {
        name: name !== undefined ? name : document.name,
        nameServer: nameServer !== undefined ? nameServer : document.nameServer,
        path: path !== undefined ? path : document.path,
        Organization: organization !== undefined ? organization : document.Organization,
        User: user !== undefined ? user : document.User,
        DocumentType: documentType !== undefined ? documentType : document.DocumentType,
    }

    await document.update(userUpdated)
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
    updateDocument,
    deleteDocument,
}
