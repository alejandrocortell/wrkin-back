import { DataTypes, Model, Sequelize } from 'sequelize'

class DocumentType extends Model {
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
                    singular: 'Document type',
                    plural: 'Documents types',
                },
            }
        )
    }
}

export default DocumentType
