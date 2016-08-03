angular.module('meanbaseApp').directive('mdl', function($timeout) {
  return {
    restrict: 'A',
    compile: function() {
      return {
        post: function (scope, element) {
          // var el = element.get(0);
          var el = element;
          $timeout(function() {
            componentHandler.upgradeAllRegistered();
          }, 0, false);
        }
      };
    },
  };
})
