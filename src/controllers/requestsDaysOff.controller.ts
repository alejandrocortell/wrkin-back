import { RequestDayOff } from '../database/models'

async function getRequestsDaysOff(): Promise<any[]> {
    return await RequestDayOff.findAll({
        order: [['id', 'ASC']],
    })
}

async function createRequestDayOff(
    message: string,
    start: Date,
    end: Date,
    user: number,
    dayOffType: number
): Promise<any> {
    let requestDayOff = await RequestDayOff.create({
        message: message,
        start: start,
        end: end,
        userId: user,
        dayOffTypeId: dayOffType,
        statusRequestId: 3,
    })

    return requestDayOff
}

async function getRequestDayOff(id: number): Promise<any> {
    let requestDayOff = await RequestDayOff.findByPk(id)
    if (requestDayOff === null) return 404

    return requestDayOff
}

async function updateRequestDayOff(
    id: number,
    message: string | undefined,
    start: Date | undefined,
    end: Date | undefined,
    user: number | undefined,
    dayOffType: number | undefined,
    statusRequestId: number | undefined
): Promise<any> {
    let requestDayOff = await RequestDayOff.findByPk(id)
    if (requestDayOff === null) return 404

    const requestDayOffUpdated = {
        message: message !== undefined ? message : requestDayOff.message,
        start: start !== undefined ? start : requestDayOff.start,
        end: end !== undefined ? end : requestDayOff.end,
        user: user !== undefined ? user : requestDayOff.user,
        dayOffType:
            dayOffType !== undefined ? dayOffType : requestDayOff.dayOffType,
        statusRequestId:
            statusRequestId !== undefined
                ? statusRequestId
                : requestDayOff.statusRequest,
    }

    requestDayOff = await requestDayOff.update(requestDayOffUpdated)
    if (requestDayOff === null) return 404
    return requestDayOff
}

async function deleteRequestDayOff(id: number): Promise<any> {
    let requestDayOff = await RequestDayOff.findByPk(id)
    if (requestDayOff === null) return 404

    const deleted = await requestDayOff.destroy()
    return deleted
}

export default {
    getRequestsDaysOff,
    createRequestDayOff,
    getRequestDayOff,
    updateRequestDayOff,
    deleteRequestDayOff,
}
