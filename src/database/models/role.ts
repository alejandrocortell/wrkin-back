import { DataTypes, Model, Sequelize } from 'sequelize'

class Role extends Model {
    public name!: string

    // Auto-generated
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date

    public static initialize(sequelize: Sequelize) {
        this.init(
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize: sequelize,
                name: {
                    singular: 'Role',
                    plural: 'Roles',
                },
            }
        )
    }
}

export default Role
