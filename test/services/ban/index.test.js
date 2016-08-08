'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('ban service', function() {
  it('registered the bans service', () => {
    assert.ok(app.service('bans'));
  });
});
