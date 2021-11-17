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

import Organization from './organization'
import Role from './role'

class User extends Model {
    public firstName!: string
    public lastName!: string
    public birthday!: Date
    public address!: string
    public hoursToWork!: number

    // Auto-generated
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date

    // Populated for inclusions
    public readonly Organizations?: Organization[]
    public readonly Roles?: Role
    public readonly Managers?: User

    public static associations: {
        Organizations: Association<User, Organization>
        Role: Association<User, Role>
        Managers: Association<User, User>
    }

    public static initialize(sequelize: Sequelize) {
        this.init(
            {
                firstName: DataTypes.STRING,
                lastName: DataTypes.STRING,
                birthday: DataTypes.DATE,
                address: DataTypes.STRING,
                hoursToWork: DataTypes.INTEGER,
            },
            {
                sequelize: sequelize,
                name: {
                    singular: 'User',
                    plural: 'Users',
                },
            }
        )
    }
}

export default User
