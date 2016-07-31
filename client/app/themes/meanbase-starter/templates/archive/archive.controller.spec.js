'use strict';

describe('Controller: ArchiveCtrl', function () {

  // load the controller's module
  beforeEach(module('meanbaseApp'));

  var ArchiveCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArchiveCtrl = $controller('ArchiveCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
