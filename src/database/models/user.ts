import {
    Association,
    DataTypes,
    Model,
    Sequelize,
    BelongsToManyAddAssociationMixin,
    BelongsToManyAddAssociationsMixin,
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
    public user!: string
    public password!: string
    public firstName!: string
    public lastName!: string
    public birthday!: Date
    public address!: string
    public zipcode!: string
    public city!: string

    // Auto-generated
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date

    // Populated for inclusions
    public readonly organization: Organization[]
    public readonly role: Role
    public readonly manager: User

    public addOrganization!: BelongsToManyAddAssociationMixin<
        Organization,
        number
    >
    public addOrganizations!: BelongsToManyAddAssociationsMixin<
        Organization,
        number
    >
    public getOrganizations!: BelongsToManyGetAssociationsMixin<Organization>
    public hasOrganization!: BelongsToManyHasAssociationMixin<
        Organization,
        number
    >
    public hasOrganizations!: BelongsToManyHasAssociationsMixin<
        Organization,
        number
    >
    public removeOrganization!: BelongsToManyRemoveAssociationMixin<
        Organization,
        number
    >
    public removeOrganizations!: BelongsToManyRemoveAssociationsMixin<
        Organization,
        number
    >
    public setOrganizations!: BelongsToManySetAssociationsMixin<
        Organization,
        number
    >

    public static associations: {
        organization: Association<User, Organization>
        role: Association<User, Role>
        manager: Association<User, User>
    }

    public static initialize(sequelize: Sequelize) {
        this.init(
            {
                user: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                lastName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                birthday: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                address: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                zipcode: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                city: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
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
