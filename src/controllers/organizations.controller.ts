import { Organization, User } from '../database/models'

async function getOrganizations(): Promise<any[]> {
    return await Organization.findAll({
        order: [['id', 'ASC']],
    })
}

async function createOrganization(name: string): Promise<number> {
    let organization = await Organization.create({ name: name })

    return organization.id
}

async function getOrganization(id: number): Promise<any> {
    let organization = await Organization.findByPk(id)
    if (!organization) throw Error('404')

    return organization
}

async function updateOrganization(id: number, name: string): Promise<void> {
    let organization = await Organization.findByPk(id)
    if (!organization) throw Error('404')

    await organization.update({ name: name })
}

async function deleteOrganization(id: number): Promise<void> {
    let organization = await Organization.findByPk(id)
    if (!organization) throw Error('404')

    await organization.destroy()
}

async function getUsers(id: number): Promise<User[]> {
    return await User.findAll({
        include: [
            {
                model: Organization,
                where: { id: id },
                required: true,
                attributes: [],
            },
        ],
    })
}

export default {
    getOrganizations,
    createOrganization,
    getOrganization,
    updateOrganization,
    deleteOrganization,
    getUsers,
}
