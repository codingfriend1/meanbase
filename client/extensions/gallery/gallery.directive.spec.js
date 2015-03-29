'use strict';

describe('Directive: gallery', function () {

  // load the directive's module and view
  beforeEach(module('meanbaseApp'));
  beforeEach(module('extensions/gallery/gallery.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<gallery></gallery>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the gallery directive');
  }));
});