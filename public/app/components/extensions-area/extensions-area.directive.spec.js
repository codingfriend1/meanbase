'use strict';

describe('Directive: extensionsArea', function () {

  // load the directive's module and view
  beforeEach(module('meanbaseApp'));
  beforeEach(module('components/extensions-area/extensions-area.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<extensions-area></extensions-area>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the extensionsArea directive');
  }));
});