'use strict';

angular.module('meanbaseApp')
  .directive('findImages', function (endpoints) {
    return {
      templateUrl: 'components/findImages/findImages.html',
      restrict: 'A',
      link: function (scope, element, attrs) {
        var media = new endpoints('media');

        var gallerySlug = scope.$eval(attrs.findImages);

      	element.bind('click', function() {
      		// if(gallerySlug) {
        //     media.find({galleries: gallerySlug}).then(function(response) {

        //     });
        //   }
      	});
      }
    };
  });