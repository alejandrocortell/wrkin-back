import { Options, Sequelize } from 'sequelize'

import Settings from './settings'
import DayOffType from './dayOffType'
import Document from './document'
import DocumentType from './documentType'
import Organization from './organization'
import PunchIn from './punchIn'
import RequestDayOff from './requestDayOff'
import Role from './role'
import StatusRequest from './statusRequest'
import User from './user'

const dbConfig = require('../../config/database')

// Open database connection
const sequelize = new Sequelize(dbConfig.database as string, dbConfig.username as string, dbConfig.password as string, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect as 'mysql' | 'postgres',
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
})

// Initialize each model in the database
// This must be done before associations are made
let models = [
    Settings,
    DayOffType,
    Document,
    DocumentType,
    Organization,
    PunchIn,
    RequestDayOff,
    Role,
    StatusRequest,
    User,
]
models.forEach((model) => model.initialize(sequelize))

Settings.belongsTo(Organization)

PunchIn.belongsTo(User)

Document.belongsTo(DocumentType)
Document.belongsTo(Organization)
Document.belongsTo(User)

RequestDayOff.belongsTo(DayOffType)
RequestDayOff.belongsTo(User)
RequestDayOff.belongsTo(StatusRequest)

User.belongsTo(Role)
User.belongsTo(User, { as: 'Manager' })

User.belongsToMany(Organization, { through: 'User_Organization' })
Organization.belongsToMany(User, { through: 'User_Organization' })

// Create database tables
// alter: true update the database (if is necessary) wiht the actual model
sequelize.sync({ force: true })

export {
    sequelize as Database,
    Settings,
    DayOffType,
    Document,
    DocumentType,
    Organization,
    PunchIn,
    RequestDayOff,
    Role,
    StatusRequest,
    User,
}
