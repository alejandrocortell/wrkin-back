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
    public readonly Organization: Organization[]
    public readonly User?: User[]
    public readonly DocumentType: DocumentType[]

    public static associations: {
        Organization: Association<Document, Organization>
        User: Association<Document, User>
        DocumentType: Association<Document, DocumentType>
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
