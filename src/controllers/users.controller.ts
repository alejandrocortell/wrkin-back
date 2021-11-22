import { PunchIn, User } from '../database/models'

async function getUsers(): Promise<any[]> {
    return await User.findAll({
        order: [['id', 'ASC']],
    })
}

async function createUser(
    firstName: string,
    lastName: string,
    birthday: string,
    address: string,
    zipcode: string,
    city: string,
    hoursToWork: number
): Promise<number> {
    let user = await User.create({
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        address: address,
        zipcode: zipcode,
        city: city,
        hoursToWork: hoursToWork,
    })

    return user.id
}

async function getUser(id: number): Promise<any> {
    let user = await User.findByPk(id)
    if (!user) throw Error('404')

    return user
}

async function updateUser(
    id: number,
    firstName: string | undefined,
    lastName: string | undefined,
    birthday: string | undefined,
    address: string | undefined,
    zipcode: string | undefined,
    city: string | undefined,
    hoursToWork: number | undefined
): Promise<void> {
    let user = await User.findByPk(id)
    if (!user) throw Error('404')

    const userUpdated = {
        firstName: firstName !== undefined ? firstName : user.firstName,
        lastName: lastName !== undefined ? lastName : user.lastName,
        birthday: birthday !== undefined ? birthday : user.birthday,
        address: address !== undefined ? address : user.address,
        zipcode: zipcode !== undefined ? zipcode : user.zipcode,
        city: city !== undefined ? city : user.city,
        hoursToWork: hoursToWork !== undefined ? hoursToWork : user.hoursToWork,
    }

    await user.update(userUpdated)
}

async function deleteUser(id: number): Promise<void> {
    let user = await User.findByPk(id)
    if (!user) throw Error('404')

    await user.destroy()
}

async function getPunchIns(id: number): Promise<PunchIn[]> {
    return await PunchIn.findAll({
        include: [
            {
                model: User,
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
}
