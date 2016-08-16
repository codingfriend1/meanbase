angular.module('meanbaseApp')
  .directive('mbSrc', function ($rootScope, endpoints, $timeout) {
    return {
      restrict: 'A',
      scope: {
        mbSrc: "@",
        size:"@",
        on: "=",
        placeholdIt:'@',
        backgroundPrefix: '@'
      },
      link: function (scope, element, attrs) {

        var isImage = element[0].nodeName.toLowerCase() === 'img';

        function setUrls() {
          if(!scope.size) { scope.size = 'original'; }
          if(!scope.placeholdIt) { scope.placeholdIt = 'http://placehold.it/768x432'; }

          var url, alt;

          var on;
          if(scope.on) {
            on = scope.on;
          } else {
            on = $rootScope.page.images;
          }

          if(on[scope.mbSrc]) {
            url = on[scope.mbSrc].url + scope.size + '.jpg';
            alt = on[scope.mbSrc].alt;
          } else {
            url = scope.placeholdIt;
          }

          if(isImage) {
            element.attr('src', url);
            if(alt) {
              element.attr('alt', alt);
            }
          } else {
            var backgroundUrl = scope.backgroundPrefix? scope.backgroundPrefix + ', url(' + url +')': 'url(' + url +')';
            element.css({
              'background-image': backgroundUrl
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
