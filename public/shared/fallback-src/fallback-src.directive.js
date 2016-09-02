angular.module('meanbaseApp')
  .directive('fallbackSrc', function () {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	if(attrs.fallbackSrc) {
	      	element.bind('error', function() {
		        angular.element(this).attr("src", attrs.fallbackSrc);
		      });
      	}
      }
    };
  });
