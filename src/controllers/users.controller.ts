import { Op } from 'sequelize'
import {
    PunchIn,
    RequestDayOff,
    User,
    Document,
    Organization,
} from '../database/models'
import { encode } from '../utils/cryptoJS'

async function getUsers(): Promise<any[]> {
    return await User.findAll({
        order: [['id', 'ASC']],
    })
}

async function createUser(
    user: string,
    password: string,
    firstName: string,
    lastName: string,
    birthday: string,
    address: string,
    zipcode: string,
    city: string,
    role: number,
    manager: number,
    organization: number,
    hoursToWork: number
): Promise<any> {
    let newUser = await User.create({
        user: user,
        password: encode(password),
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        address: address,
        zipcode: zipcode,
        city: city,
        roleId: role,
        managerId: manager,
        OrganizationId: organization,
        hoursToWork: hoursToWork,
    })

    return newUser
}

async function getUser(id: number): Promise<any> {
    const user = await User.findByPk(id)
    if (user === null) return 404

    return user
}

async function updateUser(
    id: number,
    password: string | undefined,
    firstName: string | undefined,
    lastName: string | undefined,
    birthday: string | undefined,
    address: string | undefined,
    zipcode: string | undefined,
    city: string | undefined,
    role: number | undefined,
    manager: number | undefined
): Promise<any> {
    let foundUser = await User.findByPk(id)
    if (foundUser === null) return 404

    const userUpdated = {
        password:
            password !== undefined ? encode(password) : foundUser.password,
        firstName: firstName !== undefined ? firstName : foundUser.firstName,
        lastName: lastName !== undefined ? lastName : foundUser.lastName,
        birthday: birthday !== undefined ? birthday : foundUser.birthday,
        address: address !== undefined ? address : foundUser.address,
        zipcode: zipcode !== undefined ? zipcode : foundUser.zipcode,
        city: city !== undefined ? city : foundUser.city,
        roleId: role !== undefined ? role : foundUser.role,
        managerId: manager !== undefined ? manager : foundUser.manager,
    }

    console.log('------------------------')
    console.log(userUpdated)

    foundUser = await foundUser.update(userUpdated)
    if (foundUser === null) return 404
    return foundUser
}

async function updateAvatar(id: number, avatar: string): Promise<any> {
    let foundUser = await User.findByPk(id)
    if (foundUser === null) return 404

    const userUpdated = {
        avatar: avatar,
    }

    foundUser = await foundUser.update(userUpdated)
    if (foundUser === null) return 404
    return foundUser
}

async function deleteUser(id: number): Promise<any> {
    let user = await User.findByPk(id)
    if (user === null) return 404

    const deleted = await user.destroy()
    return deleted
}

async function getPunchIns(id: number): Promise<PunchIn[]> {
    return await PunchIn.findAll({
        include: [
            {
                model: User,
                as: 'user',
                where: { id: id },
                required: true,
                attributes: [],
            },
        ],
    })
}

async function getDaysOff(id: number): Promise<RequestDayOff[]> {
    return await RequestDayOff.findAll({
        include: [
            {
                model: User,
                as: 'user',
                where: { id: id },
                required: true,
                attributes: [],
            },
        ],
    })
}

async function getDocuments(id: number): Promise<Document[]> {
    return await Document.findAll({
        where: {
            [Op.or]: [{ userId: id }, { userId: null }],
        },
    })
}

export default {
    getUsers,
    createUser,
    getUser,
    updateUser,
    updateAvatar,
    deleteUser,
    getPunchIns,
    getDaysOff,
    getDocuments,
}
