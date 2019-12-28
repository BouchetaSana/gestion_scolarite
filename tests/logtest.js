
var expect = require('chai').expect;
var app = require('../routes/inscrire');
var request = require('supertest');

describe('POST /user',()=>{
  it('should creat a user',(done) => {
    var email ="ex@mail.com";
    var password = "123456789";

    request(app)
    .post('/')
    .send({email, password})
    .expect((res) => {
      expect(res.body.email).toBe(email);
    })
    .end((err) => {
      if(err) return done(err);

      User.findOne({email}).then((user) =>{
        expect(user).not.toBeNull();
        expect(user.password).not.toBe(password);
        done();
      }); 
    })
  })
})


/*let's set up the data we need to pass to the login method
const userCredentials = {
    email: 'ex@mil.com', 
    password: '12345678'
  }//now let's login the user before we run any tests
  var authenticatedUser = request.agent(app);before(function(done){
    authenticatedUser
      .post('/')
      .send(userCredentials)
      .end(function(err, response){
        expect(response.statusCode).to.equal(200);
        expect('Location', '/home');
        done();
      });
  });//this test says: make a POST to the /login route with the email: sponge@bob.com, password: garyTheSnail
  //after the POST has completed, make sure the status code is 200 
  //also make sure that the user has been directed to the /home page

  describe('GET /profile', function(done){
 // if the user is logged in we should get a 200 status code  
 it('should return a 200 response if the user is logged in', function(done){
    authenticatedUser.get('/profile')
    .expect(200, done);
  });//if the user is not logged in we should get a 302 response code and be directed to the /login page  
  it('should return a 302 response and redirect to /login', function(done){
    request(app).get('/profile')
    .expect('Location', '/login')
    .expect(302, done);
  });});*/