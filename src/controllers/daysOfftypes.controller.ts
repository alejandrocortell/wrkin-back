import { DayOffType } from '../database/models'

async function getDaysOffTypes(): Promise<any[]> {
    return await DayOffType.findAll({
        order: [['id', 'ASC']],
    })
}

async function createDayOffType(name: string): Promise<number> {
    let dayOffType = await DayOffType.create({ dayOffType: name })

    return dayOffType.id
}

async function getDayOffType(id: number): Promise<any> {
    let dayOffType = await DayOffType.findByPk(id)
    if (!dayOffType) throw Error('404')

    return dayOffType
}

async function updateDayOffType(id: number, name: string): Promise<void> {
    let dayOffType = await DayOffType.findByPk(id)
    if (!dayOffType) throw Error('404')

    await dayOffType.update({ dayOffType: name })
}

async function deleteDayOffType(id: number): Promise<void> {
    let dayOffType = await DayOffType.findByPk(id)
    if (!dayOffType) throw Error('404')

    await dayOffType.destroy()
}

export default {
    getDaysOffTypes,
    createDayOffType,
    getDayOffType,
    updateDayOffType,
    deleteDayOffType,
}
