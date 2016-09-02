

angular.module('meanbaseApp')
  .directive('taglist', function ($rootScope) {
    return {
      templateUrl: require('./taglist.jade'),
      restrict: 'EA',
      scope: {
      	tags:"=ngModel"
      },
      link: function (scope, element, attrs) {

        if(!$rootScope.isLoggedIn) { return false; }

      	// Removes a template from the list
      	scope.deleteTag = function(tag) {
      		scope.tags.splice(scope.tags.indexOf(tag), 1);
      	};

      	// Get the text input element
      	var input = element.find('input');

      	input.bind("keydown keypress", function (event) {

      		// Remove error class every time a key is pressed
      		input[0].classList.remove('error');

      		// When enter or space is pressed
          if(event.which === 13 || event.which === 32) {

          	// Perform some simple validation
          	var re = new RegExp("[_a-zA-Z0-9\\-\\.]+");

          	if(re.test(input[0].value)) {

          		// If input text passes validation then push it to the templates list
          		scope.tags.push(input[0].value);
          		input[0].value = '';
          		scope.$apply();

          	} else {
          		// Otherwise add the error class
          		input[0].classList.add('error');
          	}
            event.preventDefault();

          }
        });
      }
    };
  });
