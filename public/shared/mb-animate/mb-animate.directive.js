

angular.module('meanbaseApp')
  .directive('mbAnimate', function ($rootScope) {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        if(!$rootScope.isLoggedIn) { return false; }
        element.addClass('animated');
      	if(attrs.mbAnimationTrigger) {
      		scope.$watch(function() {
      			return attrs.mbAnimationTrigger;
      		}, function(nv, ov) {
            if(nv === ov) { return false; }
      			if(nv === 'true' || nv === true) {
      				if(attrs.mbAnimate) {
      					element.addClass(attrs.mbAnimate);
      					setTimeout(function() {
      						element.removeClass(attrs.mbAnimate);
      					}, 2000);
      				}
              if(attrs.mbDeAnimate) {
                element.removeClass(attrs.mbDeAnimate);
              }
      			} else {
              if(attrs.mbDeAnimate) {
                element.addClass(attrs.mbDeAnimate);
                setTimeout(function() {
                  element.removeClass(attrs.mbDeAnimate);
                }, 2000);
              }
      				element.removeClass(attrs.mbAnimate);
      			}
      		});
      	}
      }
    };
  });
