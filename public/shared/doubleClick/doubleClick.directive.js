angular.module('meanbaseApp')
  .directive('doubleClick', function($timeout) {

    var CLICK_DELAY = 250
    var $ = angular.element

    return {
      priority: 1, // run before event directives
      restrict: 'A',
      link: function(scope, element, attrs) {
        var clickCount = 0
        var clickTimeout

        function doubleClick(e) {
          e.preventDefault()
          e.stopImmediatePropagation()
          $timeout.cancel(clickTimeout)
          clickCount = 0
          scope.$apply(function() { scope.$eval(attrs.doubleClick) })
        }

        function singleClick(clonedEvent) {
          clickCount = 0
          if (attrs.ngClick) scope.$apply(function() { scope.$eval(attrs.ngClick) })
          if (clonedEvent) element.trigger(clonedEvent)
        }

        function delaySingleClick(e) {
          var clonedEvent = $.Event('click', e)
          clonedEvent._delayedSingleClick = true
          e.preventDefault()
          e.stopImmediatePropagation()
          clickTimeout = $timeout(singleClick.bind(null, clonedEvent), CLICK_DELAY)
        }

        element.bind('click', function(e) {
          if (e._delayedSingleClick) return
          if (clickCount++) doubleClick(e)
          else delaySingleClick(e)
        })

      }
    }

  })
