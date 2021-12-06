import controllerUser from '../controllers/users.controller'
import controllerRoles from '../controllers/roles.controller'

const rolePermission = (roleRequired) => {
    return async (req, res, next) => {
        const user = await controllerUser.getUser(req.decoded.id)
        const role = await controllerRoles.getRole(user.RoleId)

        if (roleRequired.includes(role.name)) {
            next()
        } else {
            return res.status(203).json({ message: 'Invalid permission' })
        }
    }
}

module.exports = rolePermission
