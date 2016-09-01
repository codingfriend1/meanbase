angular.module('meanbaseApp')
  .directive('mbListRemove', function ($rootScope, endpoints, $timeout, api) {
    return {
      template: '<div ng-if="editMode" class="remove-from-list-btn"><i class="fa fa-times fa-lg"></i></div>',
      restrict: 'EA',
      scope: true,
      link: function (scope, element, attrs) {

        if(!$rootScope.isLoggedIn) { return false; }

        var list = scope.$parent.$eval(attrs.list);
        var item = scope.$parent.$eval(attrs.item);

        element.bind('click', function() {
          $timeout(function() {
            var index = list.indexOf(item);
            if(index !== -1) {
              list.splice(index, 1);

              console.log("item", item);
              api.custom.delete({belongsTo: item.label, key: item.key}).then(function(response) {
                console.log('response', response);
              }, function(err) {
                console.log('promise rejected', err);
              });
            }
          });

        });
      }
    }

  });
