'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('subscribe service', function() {
  it('registered the subscribes service', () => {
    assert.ok(app.service('subscribes'));
  });
});
