const { async } = require('rxjs');
const { ROLE } = require('../auth/role');
let { users } = require('../data/users');

const addUser = async (req, res, next) => {
    try {
        const { userId } = req.body.user
        const user = await users.find( user => user.id == userId )
        if (user) return next(new Error('User Id already exist'))
        else {
            const newUser = {id: req.body.user.userId, name: req.body.user.name, password: req.body.user.password, role: req.body.user.role || ROLE.USER}
            users.push(newUser)
            res.status(201)
            res.json({
                data: newUser
            })
        }
       } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
     const { userId, password } = req.body;
     const user = await users.find( user => user.id == userId );
     if (!user) return next(new Error('userId does not exist'));
     const validPassword = (password == user.password)
     if (!validPassword) return next(new Error('Password is incorrect'))
     res.status(200).json({
      data: { email: user.email, role: user.role }
     })
    } catch (error) {
     next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
    const userId = req.params.userId;
    const user = users.filter((item) => {
        return item.id == userId;
    });
    if(user == null || user.length == 0) res.status(404).json({ message: 'User not found'})
    else {
        const index = users.indexOf(user)
        users.splice(index, 1)
        res.status(200).json({
            data: users,
            message: 'User has been deleted'
        });
    }
    } catch (error) {
     next(error)
    }
}

module.exports = { addUser, login, deleteUser }