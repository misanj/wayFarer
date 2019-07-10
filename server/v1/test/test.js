import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.should();

chai.use(chaiHttp);

const apiEndPoint = '/api/v1/';
const userEndPoint = `${apiEndPoint}auth/`;

describe('Authentication Tests', () => {
  describe('User Sign Up Tests', () => {
    describe(`POST ${userEndPoint}signup`, () => {
      it('Should create a new user', (done) => {
        const user = {
          first_name: 'Temisan',
          last_name: 'Otokuefor',
          email: 'temi@testmail.com',
          password: 'pA55w0rd',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('token');
            res.body.data.should.have.property('user_id');
            res.body.data.should.have.property('first_name');
            res.body.data.should.have.property('last_name');
            res.body.data.should.have.property('email');
            res.body.data.should.have.property('is_admin');
            done();
          });
      });

      it('Should return 400 if firstname is ommited', (done) => {
        const user = {
          last_name: 'Otokuefor',
          email: 'temi@testmail.com',
          password: 'pA55w0rd',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });

      it('Should return 400 if lastname is ommited', (done) => {
        const user = {
          first_name: 'Temisan',
          email: 'temi@testmail.com',
          password: 'pA55w0rd',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });

      it('Should return 400 if email is ommited', (done) => {
        const user = {
          first_name: 'Chukwudi',
          last_name: 'Ngwobia',
          password: 'pA55w0rd',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });

      it('Should return 400 if email key is provided without value', (done) => {
        const user = {
          first_name: 'Chukwudi',
          last_name: 'Ngwobia',
          password: 'pA55w0rd',
          email: '',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });

      it('Should return 409 if email already exists', (done) => {
        const user = {
          first_name: 'jasmin',
          last_name: 'Ngwobia',
          email: 'temi@testmail.com',
          password: 'pA55w0rd',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(409);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });


      it('Should return 400 if password is ommited', (done) => {
        const user = {
          first_name: 'Temisan',
          last_name: 'Otokuefor',
          email: 'temi@testmail.com',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
    });
  });

  describe('User Login tests', () => {
    describe(`POST ${userEndPoint}signin`, () => {
      it('Should login a user successfully', (done) => {
        const login = {
          email: 'temi@testmail.com',
          password: 'pA55w0rd',
        };
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('token');
            res.body.data.should.have.property('user_id');
            res.body.data.should.have.property('first_name');
            res.body.data.should.have.property('last_name');
            res.body.data.should.have.property('email');
            done();
          });
      });

      it('Should deny access if wrong email is provided', (done) => {
        const login = {
          email: 'kcmykirl@gmail.com',
          password: 'pA55w0rd',
        };
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal('The email and password you entered does not exist! Please check and try again.');
            done();
          });
      });

      it('Should deny access if wrong password is provided', (done) => {
        const login = {
          email: 'temi@testmail.com',
          password: 'passweod',
        };
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal('The email and password you entered does not exist! Please check and try again.');
            done();
          });
      });

      it('Should return 400 if email is not provided', (done) => {
        const login = {
          password: 'pA55w0rd',
        };
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });

      it('Should return 400 if password is ommited', (done) => {
        const login = {
          email: 'temi@testmail.com',
        };
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
    });
  });
});
