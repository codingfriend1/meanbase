// Handles starting up and shutting down the inline text editors and syncing up changes with the model when edits are saved

'use strict';

angular.module('meanbaseApp')
  .directive('mbRecaptcha', function ($sanitize, $rootScope) {
    return {
      restrict: 'E',
      template: '<div vc-recaptcha ng-if="recaptchaClientKey" key="recaptchaClientKey" on-success="setResponse(response)"></div>',
      scope: {
        field: '=ngModel'
      },
      link: function (scope, element, attrs, ctrl) {
        scope.recaptchaClientKey = window.meanbaseGlobals.recaptchaClientKey;

        scope.setResponse = function(response) {
          scope.field = response;
        }
      }
    };
  });
