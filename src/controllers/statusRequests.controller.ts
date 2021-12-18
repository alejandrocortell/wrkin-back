import { stat } from 'fs'
import { StatusRequest } from '../database/models'

async function getStatusRequests(): Promise<any[]> {
    return await StatusRequest.findAll({
        order: [['id', 'ASC']],
    })
}

async function createStatusRequest(name: string): Promise<any> {
    let statusRequest = await StatusRequest.create({ statusRequest: name })
    if (statusRequest === null) return 404

    return statusRequest
}

async function getStatusRequest(id: number): Promise<any> {
    let statusRequest = await StatusRequest.findByPk(id)
    if (statusRequest === null) return 404

    return statusRequest
}

async function updateStatusRequest(id: number, name: string): Promise<any> {
    let statusRequest = await StatusRequest.findByPk(id)
    if (statusRequest === null) return 404

    statusRequest = await statusRequest.update({ name: name })
    if (statusRequest === null) return 404
    return statusRequest
}

async function deleteStatusRequest(id: number): Promise<any> {
    let statusRequest = await StatusRequest.findByPk(id)
    if (statusRequest === null) return 404

    const deleted = await statusRequest.destroy()
    return deleted
}

export default {
    getStatusRequests,
    createStatusRequest,
    getStatusRequest,
    updateStatusRequest,
    deleteStatusRequest,
}
