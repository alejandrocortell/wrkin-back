import { PunchIn } from '../database/models'

async function getPunchsIn(): Promise<any[]> {
    return await PunchIn.findAll({
        order: [['id', 'ASC']],
    })
}

async function createPunchIn(start: Date, end: Date, user: number): Promise<any> {
    let punchIn = await PunchIn.create({
        start: start,
        end: end,
        userId: user,
    })

    return punchIn
}

async function getPunchIn(id: number): Promise<any> {
    let punchIn = await PunchIn.findByPk(id)
    if (punchIn === null) return 404

    return punchIn
}

async function updatePunchIn(
    id: number,
    start: Date | undefined,
    end: Date | undefined,
    user: number | undefined
): Promise<any> {
    let punchIn = await PunchIn.findByPk(id)
    if (punchIn === null) return 404

    const punchInUpdated = {
        start: start !== undefined ? start : punchIn.start,
        end: end !== undefined ? end : punchIn.end,
        user: user !== undefined ? user : punchIn.user,
    }

    punchIn = await punchIn.update(punchInUpdated)
    if (punchIn === null) return 404
    return punchIn
}

async function deletePunchIn(id: number): Promise<any> {
    let punchIn = await PunchIn.findByPk(id)
    if (punchIn === null) return 404

    const deleted = await punchIn.destroy()
    return deleted
}

export default {
    getPunchsIn,
    createPunchIn,
    getPunchIn,
    updatePunchIn,
    deletePunchIn,
}
