'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/pages', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/pages')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should follow the structure defined in the model', function(done) {
    request(app)
      .get('/api/pages')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        if(res.body.length > 0) {
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('url');
          res.body[0].should.have.property('template');
          res.body[0].should.have.property('visibility');
          res.body[0].should.have.property('created');
          res.body[0].should.have.property('updated');
          res.body[0].should.have.property('author');
          res.body[0].should.have.property('tabTitle');
          res.body[0].should.have.property('title');
          res.body[0].should.have.property('content');
          res.body[0].should.have.property('images');
          if(res.body[0].images && res.body[0].images.length > 0) {
            res.body[0].images.should.have.property('url');
            res.body[0].images.should.have.property('alt');
            res.body[0].images.should.have.property('attribute');
            res.body[0].images.should.have.property('location');
            res.body[0].images.should.have.property('images');
          }
          res.body[0].should.have.property('extensions');
          if(res.body[0].extensions && res.body[0].extensions.length > 0) {
            res.body[0].extensions.should.have.property('name');
            res.body[0].extensions.should.have.property('group');
            res.body[0].extensions.should.have.property('position');
            res.body[0].extensions.should.have.property('text');
            res.body[0].extensions.should.have.property('contentName');
            res.body[0].extensions.should.have.property('config');
            res.body[0].extensions.should.have.property('data');
          }
          res.body[0].should.have.property('description');
          res.body[0].should.have.property('summary');
          res.body[0].should.have.property('published');
        }
        done();
      });
  });
});