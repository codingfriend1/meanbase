'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('shared-content service', function() {
  it('registered the shared-contents service', () => {
    assert.ok(app.service('shared-contents'));
  });
});
