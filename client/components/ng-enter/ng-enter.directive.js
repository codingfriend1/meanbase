'use strict';

angular.module('meanbaseApp')
  .directive('ngEnter', function () {
    return function (scope, element, attrs) {
    	console.log("element", element);
      element.bind("keydown keypress", function (event) {
        if(event.which === 13) {
          scope.$apply(function (){
              scope.$eval(attrs.ngEnter);
          });

          event.preventDefault();
        }
      });
    };
  });