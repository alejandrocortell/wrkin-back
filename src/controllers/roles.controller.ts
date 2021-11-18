import { Role } from '../database/models'

async function getRoles(): Promise<any[]> {
    return await Role.findAll({
        order: [['id', 'ASC']],
    })
}

async function createRole(name: string): Promise<number> {
    let role = await Role.create({ name: name })

    return role.id
}

async function getRole(id: number): Promise<any> {
    let role = await Role.findByPk(id)
    if (!role) throw Error('404')

    return role
}

async function updateRole(id: number, name: string): Promise<void> {
    let role = await Role.findByPk(id)
    if (!role) throw Error('404')

    await role.update({ name: name })
}

async function deleteRole(id: number): Promise<void> {
    let role = await Role.findByPk(id)
    if (!role) throw Error('404')

    await role.destroy()
}

export default {
    getRoles,
    createRole,
    getRole,
    updateRole,
    deleteRole,
}
