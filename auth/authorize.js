const ROLE = require('./role')

function authUser(req, res, next) {
    if (ROLE.length && !ROLE.includes(req.user.role)) {
        res.status(403)
        return res.send('Unauthorized')
    }

    next();
}

function authRole(role) {
    return (req, res, next) => {
        
        if (req.user.role !== role) {
            res.status(401)
            return res.send('Not allowed')
        }

    next();
    }
}
module.exports = { authUser, authRole }