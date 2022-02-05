const faker = require('faker')
import {
    Database,
    DayOffType,
    DocumentType,
    Organization,
    PunchIn,
    RequestDayOff,
    Role,
    Settings,
    StatusRequest,
    User,
    User_Organization,
} from '../database/models'
import {
    generateBirthday,
    generatePunchIn,
    randomNumber,
} from './../utils/utils'
import { encode } from './../utils/cryptoJS'

async function destroyData(): Promise<any> {
    const tables = Database.getQueryInterface()
    tables.dropAllTables().then(() => Database.sync({ alter: true }))
}

async function bulkData(): Promise<any[]> {
    return await Promise.all([
        daysOffTypes(),
        documentsTypes(),
        organizations(),
        settings(),
        roles(),
        statusRequests(),
        users(),
        punchIns(),
        requestDayOff(),
        userToOrganization(),
    ])
}

async function daysOffTypes(): Promise<any[]> {
    return await DayOffType.bulkCreate([
        {
            dayOffType: 'holydays',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        { dayOffType: 'day off', createdAt: new Date(), updatedAt: new Date() },
        {
            dayOffType: 'formation',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            dayOffType: 'official exam',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        { dayOffType: 'other', createdAt: new Date(), updatedAt: new Date() },
    ])
}

async function documentsTypes(): Promise<any[]> {
    return await DocumentType.bulkCreate([
        { name: 'payslip', createdAt: new Date(), updatedAt: new Date() },
        { name: 'sick leave', createdAt: new Date(), updatedAt: new Date() },
        { name: 'identifying', createdAt: new Date(), updatedAt: new Date() },
        { name: 'generic', createdAt: new Date(), updatedAt: new Date() },
    ])
}

async function organizations(): Promise<any[]> {
    let organizationsData = []
    for (let index = 0; index < 5; index++) {
        organizationsData.push({
            name: faker.company.companyName(),
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    }
    return await Organization.bulkCreate(organizationsData)
}

async function settings(): Promise<any[]> {
    let settingsData = []
    for (let index = 1; index < 6; index++) {
        settingsData.push({
            organizationId: index,
            marginHours: randomNumber(1, 5),
            allowModifyPunchIn: true,
            allowInsertPastPunchIn: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    }
    return await Settings.bulkCreate(settingsData)
}

async function roles(): Promise<any[]> {
    return await Role.bulkCreate([
        { name: 'admin', createdAt: new Date(), updatedAt: new Date() },
        { name: 'manager', createdAt: new Date(), updatedAt: new Date() },
        { name: 'rrhh', createdAt: new Date(), updatedAt: new Date() },
        { name: 'coordinator', createdAt: new Date(), updatedAt: new Date() },
        { name: 'employee', createdAt: new Date(), updatedAt: new Date() },
    ])
}

async function statusRequests(): Promise<any[]> {
    return await StatusRequest.bulkCreate([
        {
            statusRequest: 'approved',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            statusRequest: 'dennied',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            statusRequest: 'waiting',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ])
}

async function users(): Promise<any[]> {
    let usersData = []
    for (let index = 0; index < 20; index++) {
        let roleId = 5
        index === 0 && (roleId = 2)
        index === 1 && (roleId = 3)
        index === 2 && (roleId = 4)

        usersData.push({
            user: faker.internet.userName(),
            password: encode(faker.internet.password()),
            roleId: roleId,
            managerId: roleId - 1,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            birthday: generateBirthday(),
            address: faker.address.streetName(),
            zipcode: faker.address.zipCode(),
            city: faker.address.city(),
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    }
    usersData.push({
        user: 'alejandro',
        password: encode('123456aA?'),
        roleId: 5,
        managerId: 4,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        birthday: generateBirthday(),
        address: faker.address.streetName(),
        zipcode: faker.address.zipCode(),
        city: faker.address.city(),
        createdAt: new Date(),
        updatedAt: new Date(),
    })
    return await User.bulkCreate(usersData)
}

async function punchIns(): Promise<any[]> {
    let punchInsData = []
    // Last 6 employees
    for (let i = 15; i <= 21; i++) {
        // Past last 100 days
        for (let z = 0; z < 30; z++) {
            const dayTarget = new Date(
                new Date().setDate(new Date().getDate() - z)
            )
            const journey = generatePunchIn(dayTarget)
            journey.forEach((element) => {
                punchInsData.push({
                    start: element[0],
                    end: element[1],
                    userId: i,
                    organizationId: randomNumber(1, 2),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
            })
        }
    }
    return await PunchIn.bulkCreate(punchInsData)
}

async function requestDayOff(): Promise<any[]> {
    let requestDaysOffData = []
    // Last 6 employees
    for (let i = 15; i <= 21; i++) {
        for (let z = 0; z < 20; z++) {
            const randomDay = randomNumber(-30, 30)
            const dayStart = new Date(
                new Date().setDate(new Date().getDate() + randomDay)
            )
            const dayEnd = new Date(
                new Date().setDate(
                    new Date().getDate() + (randomDay + randomNumber(1, 6))
                )
            )
            requestDaysOffData.push({
                message: faker.lorem.paragraph(3),
                start: dayStart,
                end: dayEnd,
                userId: i,
                organizationId: randomNumber(1, 2),
                dayOffTypeId: randomNumber(1, 5),
                statusRequestId:
                    randomDay > 0 ? randomNumber(1, 3) : randomNumber(1, 2),
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        }
    }
    return await RequestDayOff.bulkCreate(requestDaysOffData)
}

async function userToOrganization(): Promise<any[]> {
    let insertData = []
    const users = await User.findAll()
    const organizations = await Organization.findAll()

    await users.forEach((u) => {
        insertData.push({
            hoursToWork: randomNumber(7, 8),
            UserId: u.id,
            OrganizationId: 1,
        })
    })

    await organizations.forEach((u) => {
        if (u.id === 1) return
        insertData.push({
            hoursToWork: randomNumber(7, 8),
            UserId: randomNumber(1, 21),
            OrganizationId: u.id,
        })
    })

    insertData.push({
        hoursToWork: randomNumber(7, 8),
        UserId: 21,
        OrganizationId: 2,
    })

    return User_Organization.bulkCreate(insertData)
}

export default {
    bulkData,
    destroyData,
}
