const express = require('express')
const app = express()
const cors = require('cors');
//const mongoose = require('mongoose');
const data = require('./data/users')
const routes = require('./routes/route.js');
app.use(express.json())
app.use(cors());
app.use(setUser);

//commenting out as mac mongodb issue, will use local data
/* mongoose
 .connect('mongodb://localhost:27017/test')
 .then(() => {
  console.log('Connected to the Database successfully');
 })
 .catch(err => console.log(err)); */

app.use('/', routes)
const server = app.listen(3000, function () {
    console.log('Server listening on port ' + 3000);
});

function setUser(req, res, next) {
    const userId = req.body.userId
    if(userId){
        req.user = data.users.find(user => user.id == userId);
    }
    next()
}

module.exports = server
