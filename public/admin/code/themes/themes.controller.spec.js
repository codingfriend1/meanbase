describe('Controller: ThemesCtrl', function () {

  // load the controller's module
  beforeEach(module('meanbaseApp'));

  var ThemesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ThemesCtrl = $controller('ThemesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
