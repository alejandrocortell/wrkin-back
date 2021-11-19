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

class Configuration extends Model {
    public marginHours!: number
    public allowModifyPunchIn!: boolean
    public allowInsertPastPunchIn!: boolean

    // Auto-generated
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date

    // Populated for inclusions
    public readonly Organization: Organization[]

    public static associations: {
        Organization: Association<Configuration, Organization>
    }

    public static initialize(sequelize: Sequelize) {
        this.init(
            {
                marginHours: DataTypes.INTEGER,
                allowModifyPunchIn: DataTypes.BOOLEAN,
                allowInsertPastPunchIn: DataTypes.BOOLEAN,
            },
            {
                sequelize: sequelize,
                name: {
                    singular: 'Configuration',
                    plural: 'Configurations',
                },
            }
        )
    }
}

export default Configuration
