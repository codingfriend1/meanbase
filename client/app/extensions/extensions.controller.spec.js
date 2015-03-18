'use strict';

describe('Controller: ExtensionsCtrl', function () {

  // load the controller's module
  beforeEach(module('meanbaseApp'));

  var ExtensionsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExtensionsCtrl = $controller('ExtensionsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
