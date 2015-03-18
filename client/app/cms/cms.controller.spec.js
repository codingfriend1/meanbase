'use strict';

describe('Controller: CmsCtrl', function () {

  // load the controller's module
  beforeEach(module('meanbaseApp'));

  var CmsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CmsCtrl = $controller('CmsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
