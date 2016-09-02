
angular.module('meanbaseApp')
  .directive('sortable', function ($rootScope) {
    return {
      // templateUrl: 'components/sortable/sortable.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        if(!$rootScope.isLoggedIn) { return false; }

        var menu = element.scope().menu;
      	var wobbling = false;
    		scope.$watch('editMode', function(nv, ov) {
    			if(nv) {
    				element.addClass('mb-draggable');
    				element.addClass('wobble');
    				wobbling = true;
    				setTimeout(function() {
    					element.removeClass('wobble');
    					wobbling = false;
    				}, 2000);

    			} else {
    				if(wobbling) {
    					element.removeClass('wobble');
    					wobbling = false;
    				}
    			}
    		});

            if(menu && !menu.published) {
               element.addClass('unpublished-menu');
            }

    		element.bind('mouseover', function() {
    			if($rootScope.editMode) {
    				element.addClass('wobble');
    				wobbling = true;
    			}
    		});

    		element.bind('mouseout', function() {
    			if(wobbling) {
    				element.removeClass('wobble');
    				wobbling = false;
    			}
    		});
      }
    };
  });
