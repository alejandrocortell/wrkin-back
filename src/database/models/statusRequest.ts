import { DataTypes, Model, Sequelize } from 'sequelize'

class StatusRequest extends Model {
    public statusRequest!: string

    // Auto-generated
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date

    public static initialize(sequelize: Sequelize) {
        this.init(
            {
                statusRequest: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize: sequelize,
                name: {
                    singular: 'Status request',
                    plural: 'Status request',
                },
            }
        )
    }
}

export default StatusRequest
