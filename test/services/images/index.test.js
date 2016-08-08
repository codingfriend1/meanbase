'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('images service', function() {
  it('registered the images service', () => {
    assert.ok(app.service('images'));
  });
});
