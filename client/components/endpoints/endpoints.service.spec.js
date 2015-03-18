'use strict';

describe('Service: endpoints', function () {

  // load the service's module
  beforeEach(module('meanbaseApp'));

  // instantiate service
  var endpoints;
  beforeEach(inject(function (_endpoints_) {
    endpoints = _endpoints_;
  }));

  it('should do something', function () {
    expect(!!endpoints).toBe(true);
  });

});
