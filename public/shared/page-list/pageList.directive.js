angular.module('meanbaseApp')
  .directive('pageList', function ($rootScope, endpoints, $timeout) {
    return {
      template: '<div><ng-transclude></ng-transclude><div class="page-list-editor"></div></div>',
      restrict: 'AE',
      transclude: true,
      scope: true,
      link: function (scope, element, attrs) {
        // console.log("'hi'", 'hi');
        // if(!scope.pageList) {
        //   scope.pageList = [];
        // }
        //
        // var ngRepeatEl = $(element).find('[ng-repeat]');
        // var pageListEditor = $(element).find('.page-list-editor');
        //
        //
        // var clone = ngRepeatEl.clone();
        //
        // var clonedNgRepeat = clone.find('[ng-repeat]');
        // clonedNgRepeat.removeAttr('ng-repeat');
        //
        // console.log("clone", clone);
        //
        // clone.appendTo('.page-list-editor');




      }
    }
  });
