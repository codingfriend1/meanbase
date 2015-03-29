'use strict';

describe('Directive: taglist', function () {

  // load the directive's module and view
  beforeEach(module('meanbaseApp'));
  beforeEach(module('components/taglist/taglist.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<taglist></taglist>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the taglist directive');
  }));
});