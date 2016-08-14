'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('custom service', function() {
  it('registered the customs service', () => {
    assert.ok(app.service('customs'));
  });
});
