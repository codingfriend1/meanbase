'use strict';

describe('Directive: singleImage', function () {

  // load the directive's module and view
  beforeEach(module('meanbaseApp'));
  beforeEach(module('components/image-source/image-source.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<image-source></image-source>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the singleImage directive');
  }));
});