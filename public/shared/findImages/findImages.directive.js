'use strict';

// This directive popups up a modal to select images by
// It returns the selected images using the provided callback found-callback="functionName"
// A gallerySlug string must be passed into the find-images attribute

angular.module('meanbaseApp')
  .directive('findImagesFor', function ($rootScope, endpoints, $parse, $timeout) {
    return {
      templateUrl: require('./findImages.jade'),
      restrict: 'A',
      replace: true,
      scope: {
        findImagesFor: "@",
        multiple: "@"
      },
      link: function (scope, element, attrs) {

        if(!$rootScope.isLoggedIn) { return false; }

        scope.imageSelectorApi = {};

        scope.allOperations = true;

        var areChanges = false; //Used to detect if different images were selected and loaded into the gallery
        scope.titleDirections = 'Select Image';

        attrs.$observe('multiple', function() {
          scope.multiple = scope.$eval(attrs.multiple);
          if (scope.multiple === undefined) {
            delete scope.multiple;
          } else if(scope.multiple === true) {
            scope.titleDirections = 'Select Images';
          }
        });



        // If a gallery slug was passed into find-images-for="" then use it when emitting events else use meanbase-gallery
        scope.gallerySlug = attrs.findImagesFor || 'meanbase-gallery';

        // If the overlay was closed while saving then send the chosen images back to the requester and remember the selection that was just made
        scope.chooseImages = function() {
          var selectedImages = scope.imageSelectorApi.getSelectedImages();
          $rootScope.$emit('cms.choseImages', {gallerySlug:  scope.gallerySlug, images: selectedImages});
          scope.imageSelectorApi.rememberSelection();
          areChanges = true;
        };

        // If the overlay is closed without saving selection resort back to selection before overlay was opened
        scope.close = function() {
          scope.imageSelectorApi.forgetSelection();
          // areChanges should stay as it is because we forget the selection and no change to the gallery is made
        };

        // When the save button is hit on the cms headbar have image-selector add the gallery slug to the selected images
        scope.$onRootScope('cms.saveEdits', function() {
          if(areChanges) {
            scope.imageSelectorApi.publishSelected();
            areChanges = false;
          }
        });

        // If the discard button is hit on the cms headbar have image-selector reset the gallery images and
        scope.$onRootScope('cms.discardEdits', function() {
          if(areChanges) {
            var selectedImages = scope.imageSelectorApi.getInitialImages();
              $rootScope.$emit('cms.choseImages', {gallerySlug:  scope.gallerySlug, images: selectedImages});
            areChanges = false;
          }
        });



        /*
        *
        * Codrops Button Morph Affect
        *
        */
        function morphButtonAffect() {
          var docElem = window.document.documentElement, didScroll, scrollPosition;

          // trick to prevent scrolling when opening/closing button
          function noScrollFn() {
            window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 );
          }

          function noScroll() {
            window.removeEventListener( 'scroll', scrollHandler );
            window.addEventListener( 'scroll', noScrollFn );
          }

          function scrollFn() {
            window.addEventListener( 'scroll', scrollHandler );
          }

          function canScroll() {
            window.removeEventListener( 'scroll', noScrollFn );
            scrollFn();
          }

          function scrollHandler() {
            if( !didScroll ) {
              didScroll = true;
              setTimeout( function() { scrollPage(); }, 60 );
            }
          };

          function scrollPage() {
            scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
            didScroll = false;
          };

          scrollFn();

          // var el = document.querySelector( '.morph-button' );
          var el = element[0];

          new UIMorphingButton( element[0], {
            closeEl : '.icon-close',
            onBeforeOpen : function() {
              // don't allow to scroll
              noScroll();
            },
            onAfterOpen : function() {
              // can scroll again
              canScroll();
              document.body.classList.add('noscroll');
              element[0].classList.add('scroll');
            },
            onBeforeClose : function() {
              // remove class "noscroll" to body
              document.body.classList.remove('noscroll');
              element[0].classList.remove('scroll');

              // don't allow to scroll
              noScroll();
            },
            onAfterClose : function() {
              // can scroll again
              canScroll();
            }
          } );
        }

        morphButtonAffect();


      } // link
    }; // return
  }); //directive
