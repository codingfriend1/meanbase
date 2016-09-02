describe('Controller: AnalyticsCtrl', function () {

  // load the controller's module
  beforeEach(module('meanbaseApp'));

  var AnalyticsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AnalyticsCtrl = $controller('AnalyticsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
