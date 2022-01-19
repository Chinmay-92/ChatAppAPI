const { ROLE } = require("../auth/role");

module.exports = {
    users: [
        { id: 1, name: 'admin', password: 'admin', role: ROLE.ADMIN },
        { id: 2, name: 'user1', password: 'testpassword1', role: ROLE.USER },
        { id: 3, name: 'user2', password: 'testpassword2', role: ROLE.USER },
    ],
    groups: [
        { id: 1, name: "chatroom1", users: [ 
            { id: 1, name: 'admin', password: 'admin', role: ROLE.ADMIN }
         ], messages: [{ id: 1, message: "Welcome", likes: 0 }] },
         { id: 2, name: "chatroom2", users: [ 
            { id: 1, name: 'admin', password: 'admin', role: ROLE.ADMIN },
            { id: 2, name: 'user1', password: 'testpassword1', role: ROLE.ADMIN }
         ], messages: [{ id: 1, message: "Welcome", likes: 0 }] }
    ]
}