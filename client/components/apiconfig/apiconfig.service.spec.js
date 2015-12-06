'use strict';

describe('Service: apiconfig', function () {

  // load the service's module
  beforeEach(module('meanbaseApp'));

  // instantiate service
  var apiconfig;
  beforeEach(inject(function (_apiconfig_) {
    apiconfig = _apiconfig_;
  }));

  it('should do something', function () {
    expect(!!apiconfig).toBe(true);
  });

});
