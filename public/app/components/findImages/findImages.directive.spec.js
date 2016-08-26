'use strict';

describe('Directive: findImages', function () {

  // load the directive's module and view
  beforeEach(module('meanbaseApp'));
  beforeEach(module('components/findImages/findImages.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<find-images></find-images>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the findImages directive');
  }));
});