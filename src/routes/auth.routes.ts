const { Router } = require('express')
const jwt = require('jsonwebtoken')
const router = Router()

router.route('/').post((req, res, next) => {
    // controller
    //     .bulkData()
    //     .then(() => res.status(200).send())
    //     .finally(next)
    const key = req.app.get('key')
    if (req.body.user === 'asfo' && req.body.password === 'holamundo') {
        const payload = {
            check: true,
        }
        const token = jwt.sign(payload, key, {
            expiresIn: 1440,
        })
        res.json({
            mensaje: 'Autenticación correcta',
            token: token,
        })
    } else {
        res.json({ mensaje: 'Usuario o contraseña incorrectos' })
    }
})

export default router
