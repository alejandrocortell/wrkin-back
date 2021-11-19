module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('StatusRequests', [
            {
                statusRequest: 'approved',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                statusRequest: 'dennied',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                statusRequest: 'waiting',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(
            'StatusRequests',
            null,
            {
                truncate: true,
                cascade: true,
            },
            { primaryKeys: [], primaryKeyAttributes: [] }
        )
    },
}
