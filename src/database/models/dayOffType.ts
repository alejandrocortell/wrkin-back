import { DataTypes, Model, Sequelize } from 'sequelize'

class DayOffType extends Model {
    public dayOffType!: string

    // Auto-generated
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date

    public static initialize(sequelize: Sequelize) {
        this.init(
            {
                dayOffType: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize: sequelize,
                name: {
                    singular: 'Day off type',
                    plural: 'Days off types',
                },
            }
        )
    }
}

export default DayOffType
