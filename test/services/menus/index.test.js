'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('menus service', function() {
  it('registered the menus service', () => {
    assert.ok(app.service('menus'));
  });
});
