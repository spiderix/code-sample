import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './app';
import graphql from 'graphql';

chai.use(chaiHttp);
chai.should();

describe('Api response', ()=>{
  it('Get Graphql response', (done)=>{
    chai.request(app)
      .post('/api')
      .send({query: '{search(intitle: "json"){title}}'})
      .end((err, res)=>{
        res.should.have.status(200);
        res.body.data.should.have.property('search')
        done();
      })
  })
})