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
import User from './user'
import DocumentType from './documentType'

class Document extends Model {
    public name!: string
    public nameServer!: string
    public path!: string

    // Auto-generated
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date

    // Populated for inclusions
    public readonly Organizations?: Organization[]
    public readonly Users?: User[]
    public readonly DocumentsType?: DocumentType[]

    public static associations: {
        Organizations: Association<Document, Organization>
        Users: Association<Document, User>
        DocumentsType: Association<Document, DocumentType>
    }

    public static initialize(sequelize: Sequelize) {
        this.init(
            {
                name: DataTypes.STRING,
                nameServer: DataTypes.STRING,
                path: DataTypes.STRING,
            },
            {
                sequelize: sequelize,
                name: {
                    singular: 'Document',
                    plural: 'Documents',
                },
            }
        )
    }
}

export default Document
