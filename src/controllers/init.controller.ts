import {
    DayOffType,
    DocumentType,
    Organization,
    Role,
    Settings,
    StatusRequest,
    User,
} from '../database/models'
import { encode } from '../utils/cryptoJS'

async function initData(
    org: string,
    manager: string,
    pass: string
): Promise<any[]> {
    return await Promise.all([
        daysOffTypes(),
        documentsTypes(),
        organization(org),
        settings(),
        roles(),
        statusRequests(),
        user(manager, pass),
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
        {
            dayOffType: 'sick leave',
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

async function organization(org: string): Promise<any[]> {
    let organizationData = [
        {
            name: org,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]
    return await Organization.bulkCreate(organizationData)
}

async function settings(): Promise<any[]> {
    let settingsData = []
    settingsData.push({
        organizationId: 1,
        marginHours: 0,
        allowModifyPunchIn: true,
        allowInsertPastPunchIn: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
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

async function user(manager: string, pass: string): Promise<any[]> {
    const userData = [
        {
            user: manager,
            password: encode(pass),
            roleId: 2,
            managerId: 1,
            OrganizationId: 1,
            hoursToWork: 0,
            firstName: '',
            lastName: '',
            birthday: new Date(),
            address: '',
            zipcode: '',
            city: '',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]

    return await User.bulkCreate(userData)
}

export default {
    initData,
}
