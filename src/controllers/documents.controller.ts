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
    user: number | undefined,
    documentType: number
): Promise<any> {
    console.log('hereee')
    let document = await Document.create({
        name: name,
        nameServer: nameServer,
        path: path,
        organizationId: +organization,
        ...(user && { userId: +user }),
        documentTypeId: +documentType,
    })

    return document
}

async function getDocument(id: number): Promise<any> {
    let document = await Document.findByPk(id)
    if (document === null) return 404

    return document
}

async function deleteDocument(id: number): Promise<any> {
    let document = await Document.findByPk(id)
    if (document === null) return 404

    const deleted = await document.destroy()
    return deleted
}

export default {
    getDocuments,
    createDocument,
    getDocument,
    deleteDocument,
}
