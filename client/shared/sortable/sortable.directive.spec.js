'use strict';

describe('Directive: sortable', function () {

  // load the directive's module and view
  beforeEach(module('meanbaseApp'));
  beforeEach(module('components/sortable/sortable.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sortable></sortable>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the sortable directive');
  }));
});