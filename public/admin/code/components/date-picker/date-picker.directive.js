angular.module('meanbaseApp').directive('datePicker', function($window) {
  return {
    restrict: 'A',
    scope: {
      options: '='
    },
    link: function(scope, element, attrs) {
      var options = Object.assign({
        time: false
      }, scope.options)
      element.bootstrapMaterialDatePicker(options);
    }
  };

});
