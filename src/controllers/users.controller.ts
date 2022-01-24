import {
    PunchIn,
    RequestDayOff,
    User,
    Document,
    Organization,
} from '../database/models'

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
    hoursToWork: number
): Promise<any> {
    let newUser = await User.create({
        user: user,
        password: password,
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        address: address,
        zipcode: zipcode,
        city: city,
        hoursToWork: hoursToWork,
    })

    return newUser
}

async function getUser(id: number): Promise<any> {
    let user = await User.findByPk(id)
    let organizations = await Organization.findAll({
        include: [
            {
                model: User,
                where: { id: id },
                required: true,
                attributes: [],
            },
        ],
    })
    if (user === null) return 404

    const response = { ...user.get(), organizations: organizations }
    return response
}

async function updateUser(
    id: number,
    user: string | undefined,
    password: string | undefined,
    firstName: string | undefined,
    lastName: string | undefined,
    birthday: string | undefined,
    address: string | undefined,
    zipcode: string | undefined,
    city: string | undefined,
    hoursToWork: number | undefined
): Promise<any> {
    let foundUser = await User.findByPk(id)
    if (foundUser === null) return 404

    const userUpdated = {
        user: user !== undefined ? user : foundUser.user,
        password: password !== undefined ? password : foundUser.password,
        firstName: firstName !== undefined ? firstName : foundUser.firstName,
        lastName: lastName !== undefined ? lastName : foundUser.lastName,
        birthday: birthday !== undefined ? birthday : foundUser.birthday,
        address: address !== undefined ? address : foundUser.address,
        zipcode: zipcode !== undefined ? zipcode : foundUser.zipcode,
        city: city !== undefined ? city : foundUser.city,
        hoursToWork:
            hoursToWork !== undefined ? hoursToWork : foundUser.hoursToWork,
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

export default {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getPunchIns,
    getDaysOff,
    getDocuments,
}
