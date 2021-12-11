import { StatusRequest } from '../database/models'

async function getStatusRequests(): Promise<any[]> {
    return await StatusRequest.findAll({
        order: [['id', 'ASC']],
    })
}

async function createStatusRequest(name: string): Promise<number> {
    let statusRequest = await StatusRequest.create({ statusRequest: name })

    return statusRequest.id
}

async function getStatusRequest(id: number): Promise<any> {
    let statusRequest = await StatusRequest.findByPk(id)
    if (!statusRequest) throw Error('404')

    return statusRequest
}

async function updateStatusRequest(id: number, name: string): Promise<void> {
    let statusRequest = await StatusRequest.findByPk(id)
    if (!statusRequest) throw Error('404')

    await statusRequest.update({ name: name })
}

async function deleteStatusRequest(id: number): Promise<void> {
    let statusRequest = await StatusRequest.findByPk(id)
    if (!statusRequest) throw Error('404')

    await statusRequest.destroy()
}

export default {
    getStatusRequests,
    createStatusRequest,
    getStatusRequest,
    updateStatusRequest,
    deleteStatusRequest,
}
