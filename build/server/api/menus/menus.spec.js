'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/menus', function() {

  it('should respond with an Object', function(done) {
    request(app)
      .get('/api/menus')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });

  it('each property should return an array of menu objects', function(done) {
    request(app)
      .get('/api/menus')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        for (var property in res.body) {
          if (res.body.hasOwnProperty(property)) {
            res.body[property].should.be.instanceof(Array);
          }
        }
        done();
      });
  });

  it('each menu item should follow the correct structure', function(done) {
    request(app)
      .get('/api/menus')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        for (var property in res.body) {
          if (res.body.hasOwnProperty(property)) {
            if(res.body[property].length > 0) {
              res.body[property][0].should.have.property('title');
              res.body[property][0].should.have.property('url');
              res.body[property][0].should.have.property('group');
              res.body[property][0].should.have.property('position');
              res.body[property][0].should.have.property('classes');
              res.body[property][0].should.have.property('target');
            }
            res.body[property].should.be.instanceof(Array);
          }
        }
        done();
      });
  });
});