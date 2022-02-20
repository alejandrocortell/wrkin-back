import { Sequelize } from 'sequelize'
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
const sequelize = new Sequelize(
    dbConfig.database as string,
    dbConfig.username as string,
    dbConfig.password as string,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect as 'mysql' | 'postgres',
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        },
    }
)

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

Settings.belongsTo(Organization, {
    as: 'organization',
    foreignKey: { allowNull: false },
    onDelete: 'CASCADE',
})
PunchIn.belongsTo(User, {
    as: 'user',
    foreignKey: { allowNull: false },
    onDelete: 'CASCADE',
})
Document.belongsTo(DocumentType, {
    as: 'documentType',
    foreignKey: { allowNull: false },
    onDelete: 'CASCADE',
})
Document.belongsTo(User, {
    as: 'user',
    foreignKey: { allowNull: false },
    onDelete: 'CASCADE',
})
RequestDayOff.belongsTo(DayOffType, {
    as: 'dayOffType',
    foreignKey: { allowNull: false },
    onDelete: 'CASCADE',
})
RequestDayOff.belongsTo(User, {
    as: 'user',
    foreignKey: { allowNull: false },
    onDelete: 'CASCADE',
})
RequestDayOff.belongsTo(StatusRequest, {
    as: 'statusRequest',
    foreignKey: { allowNull: false },
    onDelete: 'CASCADE',
})
User.belongsTo(Role, {
    as: 'role',
    foreignKey: { allowNull: false },
    onDelete: 'CASCADE',
})
User.belongsTo(User, {
    as: 'manager',
    foreignKey: { allowNull: false },
    onDelete: 'CASCADE',
})
User.belongsTo(Organization, {
    foreignKey: { allowNull: false },
    onDelete: 'CASCADE',
})

// Create database tables
// alter: keep the database
// force: update the database
sequelize.sync({ alter: true })

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
