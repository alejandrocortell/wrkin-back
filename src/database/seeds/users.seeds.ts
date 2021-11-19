let fakerUsers = require('faker')

const randomNumber = (max, min) => {
    return Math.floor(Math.random() * (max + 1 - min) + min)
}

const generateBirthday = () => {
    const year = randomNumber(2000, 1950)
    const month = randomNumber(0, 11)
    const day = randomNumber(0, 31)
    const date = new Date(year, month, day)
    return date.toJSON()
}

let usersData = []
for (let index = 0; index < 20; index++) {
    let roleId = 5
    index === 0 && (roleId = 2)
    index === 1 && (roleId = 3)
    index === 2 && (roleId = 4)

    usersData.push({
        RoleId: roleId,
        ManagerId: roleId - 1,
        firstName: fakerUsers.name.firstName(),
        lastName: fakerUsers.name.lastName(),
        birthday: generateBirthday(),
        address: fakerUsers.address.streetName(),
        zipcode: fakerUsers.address.zipCode(),
        city: fakerUsers.address.city(),
        hoursToWork: randomNumber(40, 8),
        createdAt: new Date(),
        updatedAt: new Date(),
    })
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', usersData)
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(
            'Users',
            null,
            {
                truncate: true,
                cascade: true,
            },
            { primaryKeys: [], primaryKeyAttributes: [] }
        )
    },
}
