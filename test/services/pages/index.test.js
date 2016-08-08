'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('pages service', function() {
  it('registered the pages service', () => {
    assert.ok(app.service('pages'));
  });
});
