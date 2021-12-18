import { DayOffType } from '../database/models'

async function getDaysOffTypes(): Promise<any[]> {
    return await DayOffType.findAll({
        order: [['id', 'ASC']],
    })
}

async function createDayOffType(name: string): Promise<any> {
    let dayOffType = await DayOffType.create({ dayOffType: name })

    return dayOffType
}

async function getDayOffType(id: number): Promise<any> {
    let dayOffType = await DayOffType.findByPk(id)
    if (dayOffType === null) return 404

    return dayOffType
}

async function updateDayOffType(id: number, name: string): Promise<any> {
    let dayOffType = await DayOffType.findByPk(id)
    if (dayOffType === null) return 404

    dayOffType = await dayOffType.update({ dayOffType: name })
    if (dayOffType === null) return 404
    return dayOffType
}

async function deleteDayOffType(id: number): Promise<any> {
    let dayOffType = await DayOffType.findByPk(id)
    if (dayOffType === null) return 404

    const deleted = await dayOffType.destroy()
    return deleted
}

export default {
    getDaysOffTypes,
    createDayOffType,
    getDayOffType,
    updateDayOffType,
    deleteDayOffType,
}
