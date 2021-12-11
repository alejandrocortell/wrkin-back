import controllerUser from '../controllers/users.controller'
import controllerOrganizations from '../controllers/organizations.controller'

const sameOrganization = async (req, res, next) => {
    console.log(req.baseUrl)
    const user = await controllerUser.getUser(req.decoded.id)
    const usersOrg = await controllerOrganizations.getUsers(+req.params.id)
    const allowRoles = [1]
    const userId = usersOrg.find((u) => u.id === req.decoded.id)

    if (allowRoles.includes(user.roleId)) {
        next()
    } else if (userId.id === user.id) {
        next()
    } else {
        res.status(203).send({ message: 'Unauthorized' })
    }
}

module.exports = sameOrganization
