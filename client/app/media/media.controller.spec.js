'use strict';

describe('Controller: MediaCtrl', function () {

  // load the controller's module
  beforeEach(module('meanbaseApp'));

  var MediaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MediaCtrl = $controller('MediaCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
