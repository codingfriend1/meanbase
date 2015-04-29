'use strict';

// This directive popups up a modal to select images by and returns the selected images using the provided callback though the attribute "found-callback='functionName'"

angular.module('meanbaseApp')
  .directive('findImages', function ($rootScope, endpoints) {
    return {
      templateUrl: 'components/findImages/findImages.html',
      restrict: 'A',
      link: function (scope, element, attrs) {
        var media = new endpoints('media');

        var imageSelector = angular.element('image-selector').isolateScope();

        var cb;

        if(attrs.foundCallback) {
          cb = scope.$eval(attrs.foundCallback);
        }

        scope.chooseImages = function() {
          cb(imageSelector.getSelectedImages());
          $rootScope.$emit('chose images', imageSelector.getSelectedImages());
        };

        $rootScope.$onRootScope('cms.saveEdits', function() {
          imageSelector.saveSelectedToGallery();
        });

        $rootScope.$onRootScope('cms.discardEdits', function() {
          cb(imageSelector.getInitialImages());
        });

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
        
        var el = document.querySelector( '.morph-button' );
        
        new UIMorphingButton( el, {
          closeEl : '.icon-close',
          onBeforeOpen : function() {
            // don't allow to scroll
            noScroll();
          },
          onAfterOpen : function() {
            // can scroll again
            canScroll();
            // add class "noscroll" to body
            // classie.addClass( document.body, 'noscroll' );
            document.body.classList.add('noscroll');
            // add scroll class to main el
            // classie.addClass( el, 'scroll' );
            el.classList.add('scroll');
          },
          onBeforeClose : function() {
            // remove class "noscroll" to body
            // classie.removeClass( document.body, 'noscroll' );
            // remove scroll class from main el
            // classie.removeClass( el, 'scroll' );

            document.body.classList.remove('noscroll');
            el.classList.remove('scroll');

            // don't allow to scroll
            noScroll();
          },
          onAfterClose : function() {
            // can scroll again
            canScroll();
          }
        } );

      }
    };
  });