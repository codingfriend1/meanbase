angular.module('meanbaseApp')
  .directive('mbSrc', function ($rootScope, endpoints, $timeout) {
    return {
      restrict: 'A',
      scope: {
        mbSrc: "@",
        size:"@",
        belongsTo: "=",
        placeholdIt:'@',
        backgroundPrefix: '@'
      },
      link: function (scope, element, attrs) {

        var isImage = element.is('img') || element.find('img').length > 0;
        if(!scope.size) { scope.size = 'original'; }
        if(!scope.placeholdIt) { scope.placeholdIt = 'http://placehold.it/768x432'; }

        var currentUrl, on, key;

        function findOn() {
          if(attrs.belongsTo) {
            on = scope.belongsTo;
            if(!on) { on = {}; }
          } else {
            on = $rootScope.page.images;
            key = attrs.mbSrc;
          }
        }

        findOn();


        function setUrls() {

          var url, alt;
          if(on[scope.mbSrc]) {
            url = on[scope.mbSrc].url + scope.size + '.jpg';
            alt = on[scope.mbSrc].alt;
            currentUrl = on[scope.mbSrc].url;
          } else {
            if($rootScope.editMode) {
              url = scope.placeholdIt;
            } else {
              url  = '';
            }
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

        if(!$rootScope.isLoggedIn) { return false; }

        scope.$onRootScope('cms.updateView', function() {
          $timeout(function() {
            findOn();
            setUrls();
          });
        });

        scope.$onRootScope('cms.choseImages', function(e, gallery) {
          if(key) {
            if(key === gallery.gallerySlug) {
              $timeout(function() {
                $timeout(function() {
                  findOn()
                  setUrls()
                });
              });
            }
          } else {
            $timeout(function() {
              $timeout(function() {
                if(!currentUrl) {
                  findOn()
                  setUrls();
                } else if(currentUrl && !on[scope.mbSrc]) {
                  findOn()
                  setUrls();
                } else if(on[scope.mbSrc] && (on[scope.mbSrc].url + scope.size + '.jpg') !== currentUrl) {
                  findOn()
                  setUrls();
                }

              });
            });
          }
        });

      }
    }

  });
