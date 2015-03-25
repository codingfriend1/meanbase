'use strict';

describe('Controller: ArticleCtrl', function () {

  // load the controller's module
  beforeEach(module('meanbaseApp'));

  var ArticleCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArticleCtrl = $controller('ArticleCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
