

describe('Controller: MissingCtrl', function () {

  // load the controller's module
  beforeEach(module('meanbaseApp'));

  var MissingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MissingCtrl = $controller('MissingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
