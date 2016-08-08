'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('comments service', function() {
  it('registered the comments service', () => {
    assert.ok(app.service('comments'));
  });
});
