'use strict';

angular.module('meanbaseApp')
  .directive('animate', function () {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        element.addClass('animated');
      	if(attrs.animationTrigger) {
      		scope.$watch(function() {
      			return attrs.animationTrigger;
      		}, function(nv, ov) {
            if(nv === ov) { return false; }
      			if(nv === 'true' || nv === true) {
      				if(attrs.animate) {
      					element.addClass(attrs.animate);
      					setTimeout(function() {
      						element.removeClass(attrs.animate);
      					}, 2000);
      				}
              if(attrs.deAnimate) {
                element.removeClass(attrs.deAnimate);
              }
      			} else {
              if(attrs.deAnimate) {
                element.addClass(attrs.deAnimate);
                setTimeout(function() {
                  element.removeClass(attrs.deAnimate);
                }, 2000);
              }
      				element.removeClass(attrs.animate);
      			}
      		});
      	}
      }
    };
  });