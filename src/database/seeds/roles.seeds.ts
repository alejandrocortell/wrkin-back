module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Roles', [
            {
                name: 'admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'manager',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'rrhh',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'coordinator',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'employee',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(
            'Roles',
            null,
            {
                truncate: true,
                cascade: true,
            },
            { primaryKeys: [], primaryKeyAttributes: [] }
        )
    },
}
