angular.module('meanbaseApp')
  .directive('mbSrc', function ($rootScope, endpoints, $timeout) {
    return {
      restrict: 'A',
      scope: {
        mbSrc: "@",
        size:"@",
        placeholdIt:'@'
      },
      link: function (scope, element, attrs) {

        var isImage = element[0].nodeName.toLowerCase() === 'img';

        function setUrls() {
          if(!scope.size) { scope.size = 'original'; }
          if(!scope.placeholdIt) { scope.placeholdIt = 'http://placehold.it/768x432'; }

          var url, alt;

          if($rootScope.page.images[scope.mbSrc]) {
            url = $rootScope.page.images[scope.mbSrc].url + scope.size + '.jpg';
            alt = $rootScope.page.images[scope.mbSrc].alt;
          } else {
            url = scope.placeholdIt;
          }

          if(isImage) {
            element.attr('src', url);
            if(alt) {
              element.attr('alt', alt);
            }
          } else {
            element.css({
              'background-image': 'url(' + url +')'
            });
          }
        }

        setUrls();

        scope.$onRootScope('cms.choseImages', function(e, gallery) {
          if(scope.mbSrc === gallery.gallerySlug) {
            $timeout(function() {
              $timeout(function() {
                setUrls();
              });
            });
          }
        });
      }
    }

  });
