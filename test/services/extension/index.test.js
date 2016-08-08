'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('extension service', function() {
  it('registered the extensions service', () => {
    assert.ok(app.service('extensions'));
  });
});
