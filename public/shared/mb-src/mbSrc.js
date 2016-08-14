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

          var url;

          if($rootScope.page.images[scope.mbSrc]) {
            url = $rootScope.page.images[scope.mbSrc].url + scope.size + '.jpg';
          } else {
            url = scope.placeholdIt;
          }

          if(isImage) {
            element.attr('src', url);
            if($rootScope.page.images[scope.mbSrc].alt) {
              element.attr('alt', $rootScope.page.images[scope.mbSrc].alt);
            }
          } else {
            element.css({
              'background-image': 'url(' + url +')'
            });
          }
        }

        setUrls();

        if($rootScope.page.images[scope.mbSrc]) {
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
    }

  });
