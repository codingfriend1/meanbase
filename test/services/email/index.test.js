'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('email service', function() {
  it('registered the emails service', () => {
    assert.ok(app.service('emails'));
  });
});
