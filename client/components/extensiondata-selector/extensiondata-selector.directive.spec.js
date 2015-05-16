'use strict';

describe('Directive: extensiondataSelector', function () {

  // load the directive's module and view
  beforeEach(module('meanbaseApp'));
  beforeEach(module('components/extensiondata-selector/extensiondata-selector.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<extensiondata-selector></extensiondata-selector>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the extensiondataSelector directive');
  }));
});