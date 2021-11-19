import { PunchIn } from '../database/models'

async function getPunchsIn(): Promise<any[]> {
    return await PunchIn.findAll({
        order: [['id', 'ASC']],
    })
}

async function createPunchIn(start: Date, end: Date, user: number): Promise<number> {
    let punchIn = await PunchIn.create({
        start: start,
        end: end,
        user: user,
    })

    return punchIn.id
}

async function getPunchIn(id: number): Promise<any> {
    let punchIn = await PunchIn.findByPk(id)
    if (!punchIn) throw Error('404')

    return punchIn
}

async function updatePunchIn(
    id: number,
    start: Date | undefined,
    end: Date | undefined,
    user: number | undefined
): Promise<void> {
    let punchIn = await PunchIn.findByPk(id)
    if (!punchIn) throw Error('404')

    const punchInUpdated = {
        start: start !== undefined ? start : punchIn.start,
        end: end !== undefined ? end : punchIn.end,
        user: user !== undefined ? user : punchIn.user,
    }

    await punchIn.update(punchInUpdated)
}

async function deletePunchIn(id: number): Promise<void> {
    let punchIn = await PunchIn.findByPk(id)
    if (!punchIn) throw Error('404')

    await punchIn.destroy()
}

export default {
    getPunchsIn,
    createPunchIn,
    getPunchIn,
    updatePunchIn,
    deletePunchIn,
}
