'use strict';

angular.module('meanbaseApp')
  .directive('imageSource', function ($rootScope) {
    return {
      templateUrl: 'components/image-source/image-source.html',
      restrict: 'EA',
      scope: {
      	imageSource: "@",
      	caption:"@",
      	placeholdIt:"@",
      	editMode: "=",
      	multiple:"@"
      },
      link: function (scope, element, attrs) {

      	if(scope.$eval(scope.imageSource) === -1) {
      		scope.imageSource = scope.imageSource || 'meanbase-image';
      	}

      	scope.caption = (scope.caption === true || 'true');
      	scope.multiple = (scope.multiple === true || 'true');

      	scope.images = [{
      		modifiedurl: scope.placeholdIt || 'http://placehold.it/300x300',
      		alt: "Placeholder Image displaying recommended size",
      		attribute: "placehold.it"
      	}];


      	if(scope.imageSource in $rootScope.page.images) {
      		scope.images = $rootScope.page.images[scope.imageSource];
      	}

    	  // Take the chosen image(s) and add them into this img
    		scope.$onRootScope('cms.choseImages', function(e, gallery) {
    	    if(scope.imageSource === gallery.gallerySlug) {
    	    		scope.images = gallery.images;
    	    	if(!scope.images) {
    	    		scope.images = [{
			      		modifiedurl: scope.placeholdIt || 'http://placehold.it/300x300',
			      		alt: "Placeholder Image displaying recommended size",
			      		attribute: "placehold.it"
			      	}];
    	    	}
    	      
    	    }
    		});
      }
    };
  });