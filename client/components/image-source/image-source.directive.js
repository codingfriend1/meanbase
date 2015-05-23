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

        // Safety check in case attributes are missing
        if(!scope.placeholdIt) { scope.placeholdIt = 'http://placehold.it/300x300'; }
        scope.imageSource = scope.imageSource || 'image-1';
        scope.caption = (scope.caption === true || scope.caption === 'true');
        $rootScope.page.images = $rootScope.page.images || {};
        var defaultImage = {
          modifiedurl: scope.placeholdIt || 'http://placehold.it/300x300',
          alt: "Placeholder Image displaying recommended size",
          attribute: "placehold.it"
        };
        if(!$rootScope.page.images[scope.imageSource]) {
          $rootScope.page.images[scope.imageSource] = defaultImage;
        }

        // Watch for changes on the page.images object (in case "discard" changed it)
        scope.$watch(function() {
          return $rootScope.page.images[scope.imageSource];
        }, function(newValue) {
          scope.image = newValue;
          if(!scope.image) { return false; }
          if(!scope.image.modifiedurl) {
            scope.image.modifiedurl = scope.image.url + 'origional.jpg';
          }
        });

    	  // Choose and set the image
    		scope.$onRootScope('cms.choseImages', function(e, gallery) {
    	    if(scope.imageSource === gallery.gallerySlug) {
            scope.image = (Array.isArray(gallery.images))? gallery.images[0]: gallery.images;
            if(scope.image) {
              scope.image.location = scope.imageSource;
              scope.image.modifiedurl = scope.image.origional;
              $rootScope.page.images[scope.imageSource] = scope.image;
            } else {
    	    		scope.image = defaultImage;
    	    	}
    	    }
    		});
      }
    };
  });