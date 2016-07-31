'use strict';

describe('Directive: singleImage', function () {

  // load the directive's module and view
  beforeEach(module('meanbaseApp'));
  beforeEach(module('components/single-image/single-image.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<single-image></single-image>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the singleImage directive');
  }));
});