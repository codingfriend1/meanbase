'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('themes service', function() {
  it('registered the themes service', () => {
    assert.ok(app.service('themes'));
  });
});
