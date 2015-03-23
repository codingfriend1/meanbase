'use strict';

describe('Directive: edit', function () {

  // load the directive's module
  beforeEach(module('meanbaseApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<edit></edit>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the edit directive');
  }));
});