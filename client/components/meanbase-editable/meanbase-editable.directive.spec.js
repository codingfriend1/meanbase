'use strict';

describe('Directive: meanbase-editable', function () {

  // load the directive's module
  beforeEach(module('meanbaseApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<meanbase-editable></meanbase-editable>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the meanbase-editable directive');
  }));
});