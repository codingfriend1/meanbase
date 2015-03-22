'use strict';

angular.module('meanbaseApp')
  .filter('camelToHuman', function () {
    return function(input) {
      return input.charAt(0).toLowerCase() + input.substr(1).replace(/[A-Z]/g, function myFunction(x){return ' ' + x.toLowerCase();
      });
    }
  });
