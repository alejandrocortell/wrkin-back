import { Organization, User } from '../database/models'

async function getOrganizations(): Promise<any[]> {
    return await Organization.findAll({
        order: [['id', 'ASC']],
    })
}

async function createOrganization(name: string): Promise<any> {
    let organization = await Organization.create({ name: name })

    return organization
}

async function getOrganization(id: number): Promise<any> {
    let organization = await Organization.findByPk(id)
    if (organization === null) return 404

    return organization
}

async function updateOrganization(id: number, name: string): Promise<any> {
    let organization = await Organization.findByPk(id)
    if (organization === null) return 404

    organization = await organization.update({ name: name })
    if (organization === null) return 404
    return organization
}

async function deleteOrganization(id: number): Promise<any> {
    let organization = await Organization.findByPk(id)
    if (organization === null) return 404

    const deleted = await organization.destroy()
    return deleted
}

export default {
    getOrganizations,
    createOrganization,
    getOrganization,
    updateOrganization,
    deleteOrganization,
}
