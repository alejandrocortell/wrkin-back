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

import User from './user'

class PunchIn extends Model {
    public start!: Date
    public end!: Date

    // Auto-generated
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date

    // Populated for inclusions
    public readonly Users?: User

    public static associations: {
        Users: Association<PunchIn, User>
    }

    public static initialize(sequelize: Sequelize) {
        this.init(
            {
                start: DataTypes.DATE,
                end: DataTypes.DATE,
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
