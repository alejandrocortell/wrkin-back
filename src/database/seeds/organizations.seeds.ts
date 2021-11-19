let fakerOrg = require('faker')

let organizationsData = []
for (let index = 0; index < 3; index++) {
    organizationsData.push({
        name: fakerOrg.company.companyName(),
        createdAt: new Date(),
        updatedAt: new Date(),
    })
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Organizations', organizationsData)
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(
            'Organizations',
            null,
            {
                truncate: true,
                cascade: true,
            },
            { primaryKeys: [], primaryKeyAttributes: [] }
        )
    },
}
