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
      	editMode: "="
      },
      link: function (scope, element, attrs) {

        scope.imageSource = scope.imageSource || 'image-1';
        scope.caption = (scope.caption === true || scope.caption === 'true');
        $rootScope.page.images = $rootScope.page.images || [];

        function findImageForSource() {
          for (var i = 0; i < $rootScope.page.images.length; i++) {
            if($rootScope.page.images[i].location === scope.imageSource) {
              scope.image = $rootScope.page.images[i];
              scope.image.modifiedurl = scope.image.url + 'origional.jpg';
            }
          };
        }

        findImageForSource();
        

        // Use a placeholder image if no images are found
        if(!scope.image) {
          scope.image = {
            modifiedurl: scope.placeholdIt || 'http://placehold.it/300x300',
            alt: "Placeholder Image displaying recommended size",
            attribute: "placehold.it"
          };
        }

    	  // Take the chosen image(s) and add them into this img
    		scope.$onRootScope('cms.choseImages', function(e, gallery) {
    	    if(scope.imageSource === gallery.gallerySlug) {
    	    		scope.image = gallery.images;
            if(scope.image) {
              scope.image.location = scope.imageSource;
              $rootScope.page.images.push(scope.image);
            } else {
    	    		scope.image = [{
			      		modifiedurl: scope.placeholdIt || 'http://placehold.it/300x300',
			      		alt: "Placeholder Image displaying recommended size",
			      		attribute: "placehold.it"
			      	}];
    	    	}
    	    }
    		});

        scope.$onRootScope('cms.discardEdits', function() {
          findImageForSource();
        });

      }
    };
  });