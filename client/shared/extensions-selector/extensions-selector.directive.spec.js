'use strict';

describe('Directive: extensionsSelector', function () {

  // load the directive's module and view
  beforeEach(module('meanbaseApp'));
  beforeEach(module('components/extensions-selector/extensions-selector.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<extensions-selector></extensions-selector>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the extensionsSelector directive');
  }));
});