let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe("Admin APIs", function() {

    describe('/GET groups', () => {
        it('it should GET all the groups', (done) => {
          chai.request(server)
              .get('/getGroups')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
              });
        });
    });

    describe('/POST add group', () => {
        it('it should not POST a group without name field', (done) => {
            let group = {
                "userId": 1,
                "password": "admin"
            }
          chai.request(server)
              .post('/addGroup')
              .send(group)
              .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                done();
              });
        });
        it('it create a new group', (done) => {
            let group = {
                "userId": 1,
                "password": "admin",
                "group": { "id": 4, "name": "chatroom4" }
            }
          chai.request(server)
              .post('/addGroup')
              .send(group)
              .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                done();
              });
        });
    });

});