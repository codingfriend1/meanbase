
describe('Directive: validate', function () {

  // load the directive's module and view
  beforeEach(module('meanbaseApp'));
  beforeEach(module('components/validate/validate.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<validate></validate>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the validate directive');
  }));
});
