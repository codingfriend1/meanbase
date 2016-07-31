'use strict';

angular.module('meanbaseApp')
  .directive('validate', function ($timeout) {
    return {
      templateUrl: 'components/validate/validate.html',
      restrict: 'EA',
      replace: true,
      scope: {},
      transclude: true,
      link: function (scope, element, attrs) {
      	var inputEl = angular.element(element[0].querySelector("input"));
      	if(element.hasClass('has-feedback')) {
      		var feedbackEl = angular.element(element[0].querySelector(".form-control-feedback")); 
      	}

      	scope.errorMessage = attrs.validate || '';
      	scope.requiredMessage = "This field is required.";

      	// Add the has-error or has-success class to this element if the form checks out or not
      	function updateValid() {
      		if(inputEl.hasClass('ng-invalid-required')) {
      			element.addClass('has-warning').removeClass('has-error').removeClass('has-success');
      			if(feedbackEl) {
      				feedbackEl.removeClass('glyphicon-remove').removeClass('glyphicon-ok').addClass('glyphicon-warning-sign');
      			}
      		} else if(inputEl.hasClass('ng-valid')) {
      			element.addClass('has-success').removeClass('has-error').removeClass('has-warning');
      			if(feedbackEl) {
      				feedbackEl.removeClass('glyphicon-remove').addClass('glyphicon-ok').removeClass('glyphicon-warning-sign');
      			}
      		} else {
      			element.removeClass('has-success').addClass('has-error').removeClass('has-warning');
      			if(feedbackEl) {
      				feedbackEl.addClass('glyphicon-remove').removeClass('glyphicon-ok').removeClass('glyphicon-warning-sign');
      			}
      		}
      	}

      	// Check the form initially
      	$timeout(function() {
      		updateValid();
      	}, 0, false);
      	
      	// Apply the correct classes every time the user enters a keystroke if they've already tabbed off of it once
      	inputEl.bind("keyup", function() {
      		if(inputEl.hasClass('ng-touched')) { updateValid(); }
      	});

      	// only apply the has-error class after the user leaves the text box
      	inputEl.bind('blur', function() { updateValid(); });
      }
    };
  });