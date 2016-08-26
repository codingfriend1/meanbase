'use strict';

describe('Directive: findImagesModal', function () {

  // load the directive's module and view
  beforeEach(module('meanbaseApp'));
  beforeEach(module('components/find-images-modal/find-images-modal.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<find-images-modal></find-images-modal>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the findImagesModal directive');
  }));
});