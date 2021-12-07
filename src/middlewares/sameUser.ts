import controllerUser from '../controllers/users.controller'

const sameUser = async (req, res, next) => {
    const user = await controllerUser.getUser(req.decoded.id)
    const id = parseInt(req.params.id)
    const allowRoles = [1, 2, 3]

    if (allowRoles.includes(user.RoleId)) {
        next()
    } else if (id === req.decoded.id) {
        next()
    } else {
        res.status(203).send({ message: 'Unauthorized' })
    }
}

module.exports = sameUser
