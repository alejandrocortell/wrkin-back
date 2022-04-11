import controllerUser from '../controllers/users.controller'
import controllerRequestsDaysOff from '../controllers/requestsDaysOff.controller'
import controllerPunchIn from '../controllers/punchsIn.controller'

// Get the user by the resource requested
const createdBy = async (req, res, next) => {
    let requestUserId
    const user = await controllerUser.getUser(req.decoded.id)
    const allowRoles = [1, 2, 3, 4]

    if (req.baseUrl === '/requests-days-off') {
        const requestDayOff = await controllerRequestsDaysOff.getRequestDayOff(+req.params.id)
        requestUserId = requestDayOff.userId
    } else if (req.baseUrl === '/punchs-in') {
        const punchIn = await controllerPunchIn.getPunchIn(+req.params.id)
        requestUserId = punchIn.userId
    } else {
        res.status(404).send({ message: 'Resource not found' })
    }

    if (allowRoles.includes(user.roleId)) {
        next()
    } else if (requestUserId === user.id) {
        next()
    } else {
        res.status(203).send({ message: 'Unauthorized' })
    }
}

module.exports = createdBy
