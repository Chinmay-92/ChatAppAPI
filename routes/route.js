const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const chatController = require('../controllers/chatController');
const {authRole, authUser} = require('../auth/authorize');
const { ROLE } = require('../auth/role')

router.post('/addUser', authUser, authRole(ROLE.ADMIN), userController.addUser);

router.post('/login', authUser, userController.login);

router.post('/addGroup', authUser, chatController.addGroup);

router.delete('/deleteGroup/:groupId', authUser, authRole(ROLE.ADMIN), chatController.deleteGroup);

router.get('/getGroups', authUser, chatController.getGroups);

router.post('/addUserToGroup', authUser, chatController.addUserToGroup);

router.post('/sendMessage', authUser, chatController.sendMessage);

router.post('/likeMessage', authUser, chatController.likeMessage);

router.delete('/deleteUser/:userId', authUser, authRole(ROLE.ADMIN), userController.deleteUser);

module.exports = router;