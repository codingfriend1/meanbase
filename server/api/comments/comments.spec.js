'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/comments', function() {

  it('should not return anything to unauthorized users', function(done) {
    request(app)
      .get('/api/comments')
      .expect(401)
      .expect('Content-Type', /html/)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});