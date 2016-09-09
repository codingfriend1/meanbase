'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('import-export service', function() {
  it('registered the import-exports service', () => {
    assert.ok(app.service('import-exports'));
  });
});
