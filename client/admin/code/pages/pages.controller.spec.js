'use strict';

describe('Controller: CommentsCtrl', function () {

  // load the controller's module
  beforeEach(module('meanbaseApp'));

  var CommentsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CommentsCtrl = $controller('CommentsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
