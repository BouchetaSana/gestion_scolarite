var expect = require('chai').expect;
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
});