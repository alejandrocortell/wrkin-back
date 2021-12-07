const sameUser = (req, res, next) => {
    const id = parseInt(req.params.id)
    if (id === req.decoded.id) {
        next()
    } else {
        res.status(203).send({ message: 'Unauthorized' })
    }
}

module.exports = sameUser
