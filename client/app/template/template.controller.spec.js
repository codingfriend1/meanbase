'use strict';

describe('Controller: TemplateControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('meanbaseApp'));

  var TemplateControllerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TemplateControllerCtrl = $controller('TemplateControllerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
