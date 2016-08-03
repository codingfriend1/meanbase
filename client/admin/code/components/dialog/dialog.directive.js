angular.module('meanbaseApp')
  .directive('dialogOpen', function ($rootScope, $timeout) {
    return {
      restrict: 'A',
      scope: {
      	dialogOpen:'='
      },
      link: function (scope, element, attrs) {
        var el = element.get(0);

        scope.$watch('dialogOpen', function(value, oldValue) {
          if(value) {
            console.log("value", value);
            $timeout(function() {
              el.showModal();
            });
          } else if(value !== undefined) {
            console.log('is not undefined');
            $timeout(function() {
              el.close();
            });
          }
        });
      } //link
    }; //return
  });
