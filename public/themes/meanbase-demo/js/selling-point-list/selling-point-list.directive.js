angular.module('meanbaseApp')
  .directive('sellingPointList', function ($rootScope, endpoints, $compile, $timeout, $modal) {
    return {
      templateUrl: require('./selling-point-list.html'),
      restrict: 'EA',
      replace: true,
      link: function (scope, element, attrs) {
        if(!scope.listItem.data) {
          scope.listItem.data = {
            containerClass: '',
            items: []
          };
        }

        if(!scope.listItem.data.items) {
          scope.listItem.data.items = [];
        }

        scope.sellingPoints = scope.listItem.data;

        scope.point = {};

      	scope.openModal = function (point) {
      	  var modalInstance = $modal.open({
            templateUrl: require('./toggle-type.modal.html'),
      	    controller: function menuModal($scope, $modalInstance, point) {
              if(!point.left) { point.left = false; }
              $scope.left = point.left.toString();
              $scope.chooseLeft = function(left) {
                point.left = left === 'true';
                $modalInstance.dismiss();
              };
            },
            resolve: {
              point: function() {
                return point;
              }
            },
      	    size: 'md'
      	  });
        };
      }
    }
  });
