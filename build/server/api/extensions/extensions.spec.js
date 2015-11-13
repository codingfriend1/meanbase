'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/extensions/', function() {

  it('should not return anything to unauthorized users', function(done) {
    request(app)
      .get('/api/extensions')
      .expect(401)
      .expect('Content-Type', /html/)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});