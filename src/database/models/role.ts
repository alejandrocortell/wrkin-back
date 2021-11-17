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

class Role extends Model {
    public name!: string

    // Auto-generated
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date

    public static initialize(sequelize: Sequelize) {
        this.init(
            {
                name: DataTypes.STRING,
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
