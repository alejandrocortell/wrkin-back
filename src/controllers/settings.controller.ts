import { Settings } from '../database/models'

async function createSettings(
    marginHours: number,
    allowModifyPunchIn: boolean,
    allowInsertPastPunchIn: boolean,
    organizationId: number
): Promise<number> {
    let settings = await Settings.create({
        marginHours: marginHours,
        allowModifyPunchIn: allowModifyPunchIn,
        allowInsertPastPunchIn: allowInsertPastPunchIn,
        organizationId: organizationId,
    })

    return settings.id
}

async function getSettings(id: number): Promise<any> {
    let settings = await Settings.findAll({ where: { organizationId: id } })
    if (!settings) throw Error('404')

    return settings[0]
}

async function updateSettings(
    id: number,
    marginHours: number,
    allowModifyPunchIn: boolean,
    allowInsertPastPunchIn: boolean
): Promise<void> {
    let settings = await Settings.findByPk(id)
    if (!settings) throw Error('404')

    const configUpdated = {
        marginHours: marginHours !== undefined ? marginHours : settings.marginHours,
        allowModifyPunchIn: allowModifyPunchIn !== undefined ? allowModifyPunchIn : settings.allowModifyPunchIn,
        allowInsertPastPunchIn:
            allowInsertPastPunchIn !== undefined ? allowInsertPastPunchIn : settings.allowInsertPastPunchIn,
    }

    await settings.update(configUpdated)
}

async function deleteSettings(id: number): Promise<void> {
    let settings = await Settings.findAll({ where: { organizationId: id } })[0]
    if (!settings) throw Error('404')

    await settings.destroy()
}

export default {
    createSettings,
    getSettings,
    updateSettings,
    deleteSettings,
}
