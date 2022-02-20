import { Association, DataTypes, Model, Sequelize } from 'sequelize'

import User from './user'
import DayOffType from './dayOffType'
import StatusRequest from './statusRequest'

class RequestDayOff extends Model {
    public message!: string
    public start!: Date
    public end!: Date

    // Auto-generated
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date

    // Populated for inclusions
    public readonly user: User[]
    public readonly dayOffType: DayOffType[]
    public readonly statusRequest: StatusRequest[]

    public static associations: {
        user: Association<RequestDayOff, User>
        dayOffType: Association<RequestDayOff, DayOffType>
        statusRequest: Association<RequestDayOff, StatusRequest>
    }

    public static initialize(sequelize: Sequelize) {
        this.init(
            {
                message: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                start: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                end: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
            },
            {
                sequelize: sequelize,
                name: {
                    singular: 'RequestDayOff',
                    plural: 'RequestsDaysOff',
                },
            }
        )
    }
}

export default RequestDayOff
