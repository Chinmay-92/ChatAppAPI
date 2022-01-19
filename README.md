# ChatAppAPI


Instructions to run the code

npm i (to install dependencies)
npm start (to run the server)


to run functional tests:
npm test


.rest files are also given as sample REQUESTS
use REST API extension in VS Code to directly run and test them

All APIs can be found in routes/route.js

Admin APIs:
POST createUser, DELETE deleteUser

User APIs:
POST login, createGroup, addUserToGroup, sendMessage, likeMessage
DELETE  deleteGroup
GET getGroups
