import { Settings } from '../database/models'

async function createSettings(
    marginHours: number,
    allowModifyPunchIn: boolean,
    allowInsertPastPunchIn: boolean,
    organizationId: number
): Promise<any> {
    let settings = await Settings.create({
        marginHours: marginHours,
        allowModifyPunchIn: allowModifyPunchIn,
        allowInsertPastPunchIn: allowInsertPastPunchIn,
        organizationId: organizationId,
    })

    return settings
}

async function getSettings(id: number): Promise<any> {
    let settings = await Settings.findAll({ where: { organizationId: id } })
    if (settings === null) return 404

    return settings[0]
}

async function updateSettings(
    id: number,
    marginHours: number,
    allowModifyPunchIn: boolean,
    allowInsertPastPunchIn: boolean
): Promise<any> {
    let settings = await Settings.findByPk(id)
    if (settings === null) return 404

    const configUpdated = {
        marginHours:
            marginHours !== undefined ? marginHours : settings.marginHours,
        allowModifyPunchIn:
            allowModifyPunchIn !== undefined
                ? allowModifyPunchIn
                : settings.allowModifyPunchIn,
        allowInsertPastPunchIn:
            allowInsertPastPunchIn !== undefined
                ? allowInsertPastPunchIn
                : settings.allowInsertPastPunchIn,
    }

    settings = await settings.update(configUpdated)
    if (settings === null) return 404
    return settings
}

async function deleteSettings(id: number): Promise<any> {
    let settings = await Settings.findAll({ where: { organizationId: id } })[0]
    if (settings === null) return 404

    const deleted = await settings.destroy()
    return deleted
}

export default {
    createSettings,
    getSettings,
    updateSettings,
    deleteSettings,
}
