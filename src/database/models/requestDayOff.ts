import {
    Association,
    DataTypes,
    Model,
    Sequelize,
    BelongsToCreateAssociationMixin,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyHasAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyRemoveAssociationsMixin,
    BelongsToManySetAssociationsMixin,
} from 'sequelize'

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
    public readonly Users?: User[]
    public readonly DaysOffTypes?: DayOffType[]
    public readonly StatusRequest?: StatusRequest[]

    public static associations: {
        Users: Association<RequestDayOff, User>
        DaysOffTypes: Association<RequestDayOff, DayOffType>
        StatusRequest: Association<RequestDayOff, StatusRequest>
    }

    public static initialize(sequelize: Sequelize) {
        this.init(
            {
                message: DataTypes.TEXT,
                start: DataTypes.DATE,
                end: DataTypes.DATE,
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
