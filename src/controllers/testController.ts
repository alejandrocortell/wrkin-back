import { Configuration } from '../database/models'
import { DayOffType } from '../database/models'
import { Document } from '../database/models'
import { DocumentType } from '../database/models'
import { Organization } from '../database/models'
import { PunchIn } from '../database/models'
import { RequestDayOff } from '../database/models'
import { Role } from '../database/models'
import { StatusRequest } from '../database/models'
import { User } from '../database/models'

async function getUsers(): Promise<any[]> {
    return await User.findAll({
        order: [['id', 'ASC']],
        attributes: ['id', 'firstName', 'lastName'],
    })
}

async function createUser(firstName: string, lastName: string): Promise<number> {
    let user = await User.create({
        firstName: firstName,
        lastName: lastName,
    })

    return user.id
}

export default {
    getUsers: getUsers,
    createUser: createUser,
}
