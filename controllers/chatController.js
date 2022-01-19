const { async } = require('rxjs');
const { ROLE } = require('../auth/role');
let { users } = require('../data/users');
let { groups } = require('../data/users');

const addGroup = async (req, res, next) => {
    try {
        const { name } = req.body.group
        const group = await groups.find( group => group.name == name )
        if (group) return next(new Error('Group already exist'))
        else {
            let userlist = []
            userlist.push(users.find( user => user.id == req.body.userId ));
            const newGroup = {id: req.body.group.id, name: req.body.group.name, users: userlist, messages: [{ id: 1, message: "Welcome", likes: 0 }] }
            groups.push(newGroup)
            res.status(201)
            res.json({
                newGroup: newGroup
            })
        }
       } catch (error) {
        next(error)
    }
}

const deleteGroup = async (req, res, next) => {
    try {
        const groupId = req.params.groupId;
        const group = groups.filter((group) => {
            return group.id == groupId;
        });
        console.log(group);
        if(group == null || group.length == 0) res.status(404).json({ message: 'Group not found'})
        else {
            const index = groups.indexOf(group)
            groups.splice(index, 1)
            res.status(200).json({
                data: groups,
                message: 'Group has been deleted'
            });
        }
        } catch (error) {
         next(error)
        }
}

const getGroups = async (req, res, next) => {
    try {
        const { userId } = req.body
        let groupsList = []
        const mygroups = groups.filter( function (item) { 
            return item.users.find( user => user.id == userId ) })
        groupsList.push(mygroups)
        if (!mygroups) return next(new Error('No groups found'))
        else {
            res.status(200)
            res.json({
                groups: groupsList
            })
        }
       } catch (error) {
        next(error)
    }
}

const addUserToGroup = async (req, res, next) => {
    try {
        const { name } = req.body.group
        const group = await groups.find( group => group.name == name )
        if (!group) return next(new Error('Group does not exist'))
        else {
            const userToAdd = users.find( user => user.id == req.body.userIdToAdd )
            let userlist = group.users
            messagelist = group.messages
            userlist.push(userToAdd)
            messagelist.push( { id: messagelist.length + 1, message: userToAdd.name + " is added to the group", likes: 0} )
            res.status(201)
            res.json({
                user: userToAdd
            })
        }
        } catch (error) {
        next(error)
    }
}

const sendMessage = async (req, res, next) => {
    try {
        const group = await groups.find( group => group.name == req.body.group.name )
        if (!group) return next(new Error('Group does not exist'))
        else {
            const messagelist = group.messages
            messagelist.push( { id: messagelist.length + 1, message: req.body.group.message, likes: 0})
            res.status(200)
            res.json({
                messages: group.messages
            })
        
        }
        } catch (error) {
        next(error)
    }
}

const likeMessage = async (req, res, next) => {
    try {
        const { name } = req.body.group
        const group = await groups.find( group => group.name == name )
        if (!group) return next(new Error('Group does not exist'))
        else {
            const message = group.messages.find( message => message.id === req.body.messageId)
            if(message == null) res.status(404).json({message: "Message not found"})
            else{
                const likes = message.likes + 1
                message.likes = likes
                res.status(200)
                res.json({
                    messages: group.messages
                })
            }
        }
        } catch (error) {
        next(error)
    }
}

module.exports = { addGroup, deleteGroup, addUserToGroup, getGroups, likeMessage, sendMessage }