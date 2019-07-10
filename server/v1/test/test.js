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
            res.body.data.should.be.a('array');
            res.body.data[0].should.have.property('token');
            res.body.data[0].should.have.property('user_id');
            res.body.data[0].should.have.property('first_name');
            res.body.data[0].should.have.property('last_name');
            res.body.data[0].should.have.property('email');
            res.body.data[0].should.have.property('is_admin');
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
});
