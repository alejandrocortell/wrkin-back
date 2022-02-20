import { Association, DataTypes, Model, Sequelize } from 'sequelize'
import { Organization } from '.'

import User from './user'

class PunchIn extends Model {
    public start!: Date
    public end!: Date

    // Auto-generated
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date

    // Populated for inclusions
    public readonly user: User

    public static associations: {
        user: Association<PunchIn, User>
    }

    public static initialize(sequelize: Sequelize) {
        this.init(
            {
                start: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                end: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
            },
            {
                sequelize: sequelize,
                name: {
                    singular: 'PunchIn',
                    plural: 'PunchsIn',
                },
            }
        )
    }
}

export default PunchIn
