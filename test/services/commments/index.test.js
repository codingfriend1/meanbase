'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('commments service', function() {
  it('registered the commments service', () => {
    assert.ok(app.service('commments'));
  });
});
