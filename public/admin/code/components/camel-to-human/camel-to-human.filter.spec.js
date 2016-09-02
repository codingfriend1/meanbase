describe('Filter: camelToHuman', function () {

  // load the filter's module
  beforeEach(module('meanbaseApp'));

  // initialize a new instance of the filter before each test
  var camelToHuman;
  beforeEach(inject(function ($filter) {
    camelToHuman = $filter('camelToHuman');
  }));

  it('should return the input prefixed with "camelToHuman filter:"', function () {
    var text = 'angularjs';
    expect(camelToHuman(text)).toBe('camelToHuman filter: ' + text);
  });

});
