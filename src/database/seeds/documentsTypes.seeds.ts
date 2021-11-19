module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('DocumentTypes', [
            {
                name: 'payslip',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'sick leave',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'identifying',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'generic',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(
            'DocumentTypes',
            null,
            {
                truncate: true,
                cascade: true,
            },
            { primaryKeys: [], primaryKeyAttributes: [] }
        )
    },
}
