import { Association, DataTypes, Model, Sequelize } from 'sequelize'

import Organization from './organization'

class Settings extends Model {
    public marginHours!: number
    public allowModifyPunchIn!: boolean
    public allowInsertPastPunchIn!: boolean

    // Auto-generated
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date

    // Populated for inclusions
    public readonly organization: Organization

    public static associations: {
        organization: Association<Settings, Organization>
    }

    public static initialize(sequelize: Sequelize) {
        this.init(
            {
                marginHours: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                allowModifyPunchIn: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
                allowInsertPastPunchIn: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
            },
            {
                sequelize: sequelize,
                name: {
                    singular: 'Settings',
                    plural: 'Settings',
                },
            }
        )
    }
}

export default Settings
