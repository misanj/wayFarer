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
          first_name: 'Toemisan',
          last_name: 'Ootokuefor',
          email: 'test@testmail.com',
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
          email: 'test@testmail.com',
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
          email: 'test@testmail.com',
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

  describe('Create Trip Tests', () => {
    describe('POST requests to admin protected routes', () => {
      it('Should return 403 if token is for user', (done) => {
        const login = {
          email: 'test@testmail.com',
          password: 'pA55w0rd',
        };
        
        chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          const trip = {
            bus_id: 1,
            origin: 'Lagos',
            destination: 'Abuja',
            fare: 10000,
          };
          
          chai.request(app)
          .post(`${apiEndPoint}trips`)
          .set('Authorization', token)
          .send(trip)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
        });
      });
      it('Should Successfully Create a Trip', (done) => {
        const login = {
          email: 'dassyakolo@gmail.com',
          password: 'password',
        };
        
        chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          const trip = {
            bus_id: 1,
            origin: 'Lagos',
            destination: 'jos',
            fare: 15000,
          };
          
          chai.request(app)
          .post(`${apiEndPoint}trips`)
          .set('Authorization', token)
          .send(trip)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('trip_id');
            res.body.data.should.have.property('bus_id');
            res.body.data.should.have.property('origin');
            res.body.data.should.have.property('destination');
            res.body.data.should.have.property('trip_date');
            res.body.data.should.have.property('fare');
            done();
          });
        });
      });
      it('Should return 401 if is_admin token is empty', (done) => {
        const login = {
          email: 'dassyakolo@gmail.com',
          password: 'password',
        };
        chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          const trip = {
            bus_id: 1,
            origin: 'Lagos',
            destination: 'Abuja',
            fare: 10000,
          };
          
          chai.request(app)
          .post(`${apiEndPoint}trips`)
          .set('Authorization', '')
          .send(trip)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
        });
      });
      it('Should return 400 if bus_id isn\'t specified', (done) => {
        const login = {
          email: 'dassyakolo@gmail.com',
          password: 'password',
        };
        chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          const trip = {
            origin: 'Lagos',
            destination: 'Abuja',
            fare: 10000,
          };
          
          chai.request(app)
          .post(`${apiEndPoint}trips`)
          .set('Authorization', token)
          .send(trip)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
        });
      });
      
      it('Should return 400 if origin isn\'t specified', (done) => {
        const login = {
          email: 'dassyakolo@gmail.com',
          password: 'password',
        };
        chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          const trip = {
            bus_id: 1,
            destination: 'Abuja',
            fare: 10000,
          };
          
          chai.request(app)
          .post(`${apiEndPoint}trips`)
          .set('Authorization', token)
          .send(trip)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
        });
      });
      
      it('Should return 400 if destinaton isn\'t specified', (done) => {
        const login = {
          email: 'dassyakolo@gmail.com',
          password: 'password',
        };
        chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          const trip = {
            bus_id: 1,
            origin: 'Lagos',
            fare: 10000,
          };
          
          chai.request(app)
          .post(`${apiEndPoint}trips`)
          .set('Authorization', token)
          .send(trip)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
        });
      });
      
      it('Should return 400 if fare isn\'t specified', (done) => {
        const login = {
          email: 'dassyakolo@gmail.com',
          password: 'password',
        };
        chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          const trip = {
            bus_id: 1,
            origin: 'Lagos',
          };
          
          chai.request(app)
          .post(`${apiEndPoint}trips`)
          .set('Authorization', token)
          .send(trip)
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
  describe('Get All Trips Test', () => {
    describe('Get requests for both user and admin', () => {
      it('should return 200 and get all trips', (done) => {
        const login = {
          email: 'test@testmail.com',
          password: 'pA55w0rd',
        };
        
        chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          
          chai.request(app)
          .get(`${apiEndPoint}trips`)
          .set('Authorization', token)
          .send(token)
          .end((err, res) => {
            res.should.have.status(200);
              res.body.should.be.an('object');
              res.body.should.have.property('status');
              res.body.should.have.property('data');
              res.body.data.should.be.an('array');
              res.body.data[0].should.have.property('trip_id');
              res.body.data[0].should.have.property('bus_id');
              res.body.data[0].should.have.property('origin');
              res.body.data[0].should.have.property('destination');
              res.body.data[0].should.have.property('trip_date');
              res.body.data[0].should.have.property('fare');
              done();
          });
        });
      });
            
      it('should return 200 and get all trips', (done) => {
        const login = {
          email: 'dassyakolo@gmail.com',
          password: 'password',
        };
        chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          
          chai.request(app)
          .get(`${apiEndPoint}trips`)
          .set('Authorization', token)
          .send(token)
          .end((err, res) => {
            res.should.have.status(200);
              res.body.should.be.an('object');
              res.body.should.have.property('status');
              res.body.should.have.property('data');
              res.body.data.should.be.an('array');
              res.body.data[0].should.have.property('trip_id');
              res.body.data[0].should.have.property('bus_id');
              res.body.data[0].should.have.property('origin');
              res.body.data[0].should.have.property('destination');
              res.body.data[0].should.have.property('trip_date');
              res.body.data[0].should.have.property('fare');
              done();
          });
        });  
      });
      it('should return 401 if token is invalid', (done) => {
        const login = {
          email: 'dassyakolo@gmail.com',
          password: 'password',
        };
        chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;
          
          chai.request(app)
          .get(`${apiEndPoint}trips`)
          .set('Authorization', '')
          .send(token)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
        });  
      });
    });
  });
});