import { Role } from '../database/models'

async function getRoles(): Promise<any[]> {
    return await Role.findAll({
        order: [['id', 'ASC']],
    })
}

async function createRole(name: string): Promise<any> {
    let role = await Role.create({ name: name })

    return role
}

async function getRole(id: number): Promise<any> {
    let role = await Role.findByPk(id)
    if (role === null) return 404

    return role
}

async function updateRole(id: number, name: string): Promise<any> {
    let role = await Role.findByPk(id)
    if (role === null) return 404

    role = await role.update({ name: name })
    if (role === null) return 404
    return role
}

async function deleteRole(id: number): Promise<any> {
    let role = await Role.findByPk(id)
    if (role === null) return 404

    const deleted = await role.destroy()
    return deleted
}

export default {
    getRoles,
    createRole,
    getRole,
    updateRole,
    deleteRole,
}
