const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');
chai.use(http);

//start app
const app = require('../app');
const User = require('../models/user')

describe('App', () => {
  it('Should exists', () => {
    expect(app).to.be.a('function');})
})


describe('App basics', () => {
    
  it('Should exists', () => {
    expect(app).to.be.a('function');
  })

  it('GET / should return 200 and message', (done) => {
    //send request to the app
    chai.request(app).get('/')
      .then((res) => {
        //assertions
        //console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal('Hello!')
        done();
    }).catch(err => {
      console.log(err.message);
    })
  });
})

describe('User registration', () => {
    //this.timeout(10000);
    it('Should return 201 and confirmation for valid input', (done) => {
      //mock valid user input
    let user_input = {
        "name": "zaoua",
        "email": "zxoux@mil.com",
        "password": "12345678"
      }
      //send /POST request to /register
      chai.request(app).post('/register').send(user_input).then(res => {
        //validate
        expect(res).to.have.status(201);
        expect(res.body.message).to.be.equal('User registered');
        console.log(res.body.user);
        //new validations to confirm user is saved in database
        expect(res.body.user._id).to.exist;
        expect(res.body.user.createdAt).to.exist;
        //validation to confirm password is encrypted
        expect(res.body.user.password).to.not.be.eql(user_input.password);
            done();
          }).catch(err => {
            console.log(err.message);
          })
    });
  
  })


  describe('User login', () => {
    it('should return 200 and token for valid credentials', (done) => {
      //mock invalid user input
      const valid_input = {
        "email": "zxoux@mil.com",
        "password": "12345678"
      }
      //send request to the app
      chai.request(app).post('/login')
        .send(valid_input)
          .then((res) => {
            //console.log(res.body);
            //assertions
            expect(res).to.have.status(200);
            expect(res.body.token).to.exist;
            expect(res.body.message).to.be.equal("Auth OK");
            expect(res.body.errors.length).to.be.equal(0);
            done();
          }).catch(err => {
            console.log(err.message);
          })
    });
  });

  describe('Protected route', () => {

    it('should return 200 and user details if valid token provided', (done) => {
      //mock login to get token
      const valid_input = {
        "email": "zxoux@mil.com",
        "password": "12345678"
      }
      //send login request to the app to receive token
      chai.request(app).post('/login')
        .send(valid_input)
          .then((login_response) => {
            //add token to next request Authorization headers as Bearer adw3R£$4wF43F3waf4G34fwf3wc232!w1C"3F3VR
            const token = 'Bearer ' + login_response.body.token;
            chai.request(app).get('/protected')
              .set('Authorization', token)
              .then(protected_response => {
                //assertions
                expect(protected_response).to.have.status(200);
                expect(protected_response.body.message).to.be.equal('Welcome, your email is zxoux@mil.com ');
                expect(protected_response.body.user.email).to.exist;
                expect(protected_response.body.errors.length).to.be.equal(0);
  
                done();
            }).catch(err => {
                console.log(err.message);
              });
          }).catch(err => {
            console.log(err.message);
          });
    })
  
    after((done) => {
      //stop app server
      console.log('All tests completed, stopping server....')
      process.exit();
      done();
    });
  
  });


/*var expect = require('chai').expect;
var app = require('../routes/login');
var request = require('supertest');
// définissons les données nécessaires à la méthode de connexion 
const userCredentials = {
    name: 'azerty',
    password: '12345678'
}
//connectons maintenant l'utilisateur avant d'exécuter des tests
var authenticatedUser = request.agent(app);
before(function (done) {
    authenticatedUser
        .post('/login/')
        .send(userCredentials)
        .end(function (err, response) {
            expect(response.statusCode).to.equal(200);
            expect('Location', '/home');
            done();
        });
});
describe('GET /admin', function (done) {
    //addresses 1st bullet point: if the user is logged in we should get a 200 status code
    it('should return a 200 response if the user is logged in', function (done) {
        authenticatedUser.get('/admin')
            .expect(200, done);
    });
    //addresses 2nd bullet point: if the user is not logged in we should get a 302 response code and be directed to the /login page
    it('should return a 302 response and redirect to /login', function (done) {
        request(app).get('/profile')
            .expect('Location', '/admin')
            .expect(302, done);
    });
});*/