'use strict';

angular.module('meanbaseApp')
  .directive('findImages', function ($rootScope, endpoints) {
    return {
      templateUrl: 'components/findImages/findImages.html',
      restrict: 'A',
      link: function (scope, element, attrs) {
        var media = new endpoints('media');

        var imageSelectorEl = angular.element('image-selector');

        scope.chooseImages = function() {
          imageSelectorEl.isolateScope().saveSelectedToGallery();
          if(attrs.callback) {
            var cb = scope.$eval(attrs.callback);
            cb(imageSelectorEl.isolateScope().getSelectedImages());
          }
          $rootScope.$emit('chose images', imageSelectorEl.isolateScope().getSelectedImages());
        };

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