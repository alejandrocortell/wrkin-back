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
    dayOffType: number,
    statusRequest: number
): Promise<number> {
    let requestDayOff = await RequestDayOff.create({
        message: message,
        start: start,
        end: end,
        user: user,
        dayOffType: dayOffType,
        statusRequest: statusRequest,
    })

    return requestDayOff.id
}

async function getRequestDayOff(id: number): Promise<any> {
    let requestDayOff = await RequestDayOff.findByPk(id)
    if (!requestDayOff) throw Error('404')

    return requestDayOff
}

async function updateRequestDayOff(
    id: number,
    message: string | undefined,
    start: Date | undefined,
    end: Date | undefined,
    user: number | undefined,
    dayOffType: number | undefined,
    statusRequest: number | undefined
): Promise<void> {
    let requestDayOff = await RequestDayOff.findByPk(id)
    if (!requestDayOff) throw Error('404')

    const requestDayOffUpdated = {
        message: message !== undefined ? message : requestDayOff.message,
        start: start !== undefined ? start : requestDayOff.start,
        end: end !== undefined ? end : requestDayOff.end,
        user: user !== undefined ? user : requestDayOff.user,
        dayOffType: dayOffType !== undefined ? dayOffType : requestDayOff.dayOffType,
        statusRequest: statusRequest !== undefined ? statusRequest : requestDayOff.statusRequest,
    }

    await requestDayOff.update(requestDayOffUpdated)
}

async function deleteRequestDayOff(id: number): Promise<void> {
    let requestDayOff = await RequestDayOff.findByPk(id)
    if (!requestDayOff) throw Error('404')

    await requestDayOff.destroy()
}

export default {
    getRequestsDaysOff,
    createRequestDayOff,
    getRequestDayOff,
    updateRequestDayOff,
    deleteRequestDayOff,
}
