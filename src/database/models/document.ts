import { Association, DataTypes, Model, Sequelize } from 'sequelize'

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
    public readonly user?: User[]
    public readonly documentType: DocumentType[]

    public static associations: {
        user: Association<Document, User>
        documentType: Association<Document, DocumentType>
    }

    public static initialize(sequelize: Sequelize) {
        this.init(
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                nameServer: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                path: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
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
