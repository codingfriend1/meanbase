'use strict';

describe('Controller: UsersCtrl', function () {

  // load the controller's module
  beforeEach(module('meanbaseApp'));

  var UsersCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsersCtrl = $controller('UsersCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
