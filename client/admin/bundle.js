/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*******************************!*\
  !*** ./client/admin/index.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	__webpack_require__(/*! ../shared/libraries/codrops/classie.js */ 1);
	
	__webpack_require__(/*! ../shared/app.js */ 2);
	
	__webpack_require__(/*! ../shared/account/signup/signup.controller.js */ 3);
	
	__webpack_require__(/*! ../shared/account/settings/settings.controller.js */ 4);
	
	__webpack_require__(/*! ../shared/account/login/login.controller.js */ 5);
	
	__webpack_require__(/*! ../shared/validate/validate.directive.js */ 6);
	
	__webpack_require__(/*! ../shared/taglist/taglist.directive.js */ 8);
	
	__webpack_require__(/*! ../shared/sortable/sortable.directive.js */ 10);
	
	__webpack_require__(/*! ../shared/single-image/single-image.directive.js */ 11);
	
	__webpack_require__(/*! ../shared/ng-enter/ng-enter.directive.js */ 13);
	
	__webpack_require__(/*! ../shared/navbar/navbar.controller.js */ 14);
	
	__webpack_require__(/*! ../shared/mongoose-error/mongoose-error.directive.js */ 15);
	
	__webpack_require__(/*! ../shared/modal/modal.service.js */ 16);
	
	__webpack_require__(/*! ../shared/missing/missing.js */ 17);
	
	__webpack_require__(/*! ../shared/missing/missing.controller.js */ 19);
	
	__webpack_require__(/*! ../shared/meanbase-editable/meanbase-editable.directive.js */ 20);
	
	__webpack_require__(/*! ../shared/meanbase-editable/meanbase-editable.directive.ckeditor.js */ 21);
	
	__webpack_require__(/*! ../shared/mb-animate/mb-animate.directive.js */ 22);
	
	__webpack_require__(/*! ../shared/main/main.js */ 23);
	
	__webpack_require__(/*! ../shared/main/main.controller.js */ 25);
	
	__webpack_require__(/*! ../shared/image-selector/image-selector.directive.js */ 28);
	
	__webpack_require__(/*! ../shared/helpers/helpers.service.js */ 30);
	
	__webpack_require__(/*! ../shared/findImages/findImages.directive.js */ 31);
	
	__webpack_require__(/*! ../shared/find-images-modal/find-images-modal.directive.js */ 33);
	
	__webpack_require__(/*! ../shared/fallback-src/fallback-src.directive.js */ 34);
	
	__webpack_require__(/*! ../shared/extensions-selector/extensions.modal.controller.js */ 35);
	
	__webpack_require__(/*! ../shared/extensions-selector/extensions-selector.directive.js */ 36);
	
	__webpack_require__(/*! ../shared/extensions-area/extensions-area.directive.js */ 39);
	
	__webpack_require__(/*! ../shared/endpoints/endpoints.service.js */ 41);
	
	__webpack_require__(/*! ../shared/dynamic-html/dynamic-html.directive.js */ 42);
	
	__webpack_require__(/*! ../shared/doubleClick/doubleClick.directive.js */ 43);
	
	__webpack_require__(/*! ../shared/cms.headbar/cms.headbar.controller.js */ 44);
	
	__webpack_require__(/*! ../shared/camel-to-human/camel-to-human.filter.js */ 46);
	
	__webpack_require__(/*! ../shared/auth/user.service.js */ 47);
	
	__webpack_require__(/*! ../shared/auth/auth.service.js */ 48);
	
	__webpack_require__(/*! ../shared/api/api.service.js */ 49);
	
	__webpack_require__(/*! ../shared/account/account.js */ 50);
	
	__webpack_require__(/*! ../shared/libraries/codrops/codrops-morph-buttons/codrops.morph.buttons.js */ 54);
	
	__webpack_require__(/*! ./code/analytics/import/import.js */ 55);
	
	__webpack_require__(/*! ./code/analytics/import/import.controller.js */ 56);
	
	__webpack_require__(/*! ./code/users/users.js */ 57);
	
	__webpack_require__(/*! ./code/users/users.controller.js */ 59);
	
	__webpack_require__(/*! ./code/themes/themes.js */ 60);
	
	__webpack_require__(/*! ./code/themes/themes.controller.js */ 62);
	
	__webpack_require__(/*! ./code/themes/theme.modal.controller.js */ 63);
	
	__webpack_require__(/*! ./code/media/media.js */ 64);
	
	__webpack_require__(/*! ./code/media/media.controller.js */ 66);
	
	__webpack_require__(/*! ./code/extensions/extensions.js */ 67);
	
	__webpack_require__(/*! ./code/extensions/extensions.controller.js */ 69);
	
	__webpack_require__(/*! ./code/comments/comments.js */ 70);
	
	__webpack_require__(/*! ./code/comments/comments.controller.js */ 72);
	
	__webpack_require__(/*! ./code/cms/cms.js */ 73);
	
	__webpack_require__(/*! ./code/cms/cms.controller.js */ 75);
	
	__webpack_require__(/*! ./code/analytics/google-analytics-embed-customizations.js */ 76);
	
	__webpack_require__(/*! ./code/analytics/analytics.js */ 77);
	
	__webpack_require__(/*! ./code/analytics/analytics.controller.js */ 79);
	
	__webpack_require__(/*! ./code/analytics/analytics.jade */ 78);
	
	__webpack_require__(/*! ./code/cms/cms.jade */ 74);
	
	__webpack_require__(/*! ./code/comments/comments.jade */ 71);
	
	__webpack_require__(/*! ./code/extensions/extensions.jade */ 68);
	
	__webpack_require__(/*! ./code/media/media.jade */ 65);
	
	__webpack_require__(/*! ./code/themes/themes.jade */ 61);
	
	__webpack_require__(/*! ./code/users/users.jade */ 58);
	
	__webpack_require__(/*! ./code/analytics/import/import.jade */ 80);
	
	__webpack_require__(/*! ../shared/cms.headbar/cms.headbar.jade */ 81);
	
	__webpack_require__(/*! ../shared/cms.headbar/editmodal.modal.jade */ 45);
	
	__webpack_require__(/*! ../shared/extensions-area/extensions-area.jade */ 40);
	
	__webpack_require__(/*! ../shared/extensions-selector/extensions-selector.jade */ 37);
	
	__webpack_require__(/*! ../shared/extensions-selector/extensions.modal.jade */ 38);
	
	__webpack_require__(/*! ../shared/findImages/findImages.jade */ 32);
	
	__webpack_require__(/*! ../shared/image-selector/image-selector.jade */ 29);
	
	__webpack_require__(/*! ../shared/main/editmenu.modal.jade */ 27);
	
	__webpack_require__(/*! ../shared/main/findImage.modal.jade */ 26);
	
	__webpack_require__(/*! ../shared/main/main.jade */ 24);
	
	__webpack_require__(/*! ../shared/missing/missing.jade */ 18);
	
	__webpack_require__(/*! ../shared/modal/modal.jade */ 82);
	
	__webpack_require__(/*! ../shared/navbar/navbar.jade */ 83);
	
	__webpack_require__(/*! ../shared/single-image/single-image.jade */ 12);
	
	__webpack_require__(/*! ../shared/sortable/sortable.jade */ 84);
	
	__webpack_require__(/*! ../shared/taglist/taglist.jade */ 9);
	
	__webpack_require__(/*! ../shared/validate/validate.jade */ 7);
	
	__webpack_require__(/*! ../shared/account/login/login.jade */ 51);
	
	__webpack_require__(/*! ../shared/account/settings/settings.jade */ 53);
	
	__webpack_require__(/*! ../shared/account/signup/signup.jade */ 52);
	
	__webpack_require__(/*! ./code/app.styl */ 85);
	
	__webpack_require__(/*! ./code/analytics/analytics.styl */ 89);
	
	__webpack_require__(/*! ./code/cms/cms.styl */ 91);
	
	__webpack_require__(/*! ./code/comments/comments.styl */ 93);
	
	__webpack_require__(/*! ./code/extensions/extensions.styl */ 95);
	
	__webpack_require__(/*! ./code/media/media.styl */ 97);
	
	__webpack_require__(/*! ./code/themes/themes.styl */ 99);
	
	__webpack_require__(/*! ./code/users/users.styl */ 101);
	
	__webpack_require__(/*! ./code/analytics/import/import.styl */ 103);
	
	__webpack_require__(/*! ../shared/cms.headbar/cms.headbar.styl */ 105);
	
	__webpack_require__(/*! ../shared/extensions-area/extensions-area.styl */ 107);
	
	__webpack_require__(/*! ../shared/extensions-selector/extensions-selector.styl */ 109);
	
	__webpack_require__(/*! ../shared/find-images-modal/find-images-modal.styl */ 111);
	
	__webpack_require__(/*! ../shared/findImages/findImages.styl */ 113);
	
	__webpack_require__(/*! ../shared/image-selector/image-selector.styl */ 115);
	
	__webpack_require__(/*! ../shared/main/main.styl */ 117);
	
	__webpack_require__(/*! ../shared/meanbase-editable/meanbase-editable.directive.styl */ 119);
	
	__webpack_require__(/*! ../shared/missing/missing.styl */ 123);
	
	__webpack_require__(/*! ../shared/modal/modal.styl */ 125);
	
	__webpack_require__(/*! ../shared/single-image/single-image.styl */ 127);
	
	__webpack_require__(/*! ../shared/sortable/sortable.styl */ 129);
	
	__webpack_require__(/*! ../shared/taglist/taglist.styl */ 131);
	
	__webpack_require__(/*! ../shared/validate/validate.styl */ 133);
	
	__webpack_require__(/*! ../shared/account/login/login.styl */ 135);

/***/ },
/* 1 */
/*!****************************************************!*\
  !*** ./client/shared/libraries/codrops/classie.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	/*!
	 * classie - class helper functions
	 * from bonzo https://github.com/ded/bonzo
	 * 
	 * classie.has( elem, 'my-class' ) -> true/false
	 * classie.add( elem, 'my-new-class' )
	 * classie.remove( elem, 'my-unwanted-class' )
	 * classie.toggle( elem, 'my-class' )
	 */
	
	/*jshint browser: true, strict: true, undef: true */
	/*global define: false */
	
	(function (window) {
	
	  'use strict';
	
	  // class helper functions from bonzo https://github.com/ded/bonzo
	
	  function classReg(className) {
	    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
	  }
	
	  // classList support for class management
	  // altho to be fair, the api sucks because it won't accept multiple classes at once
	  var hasClass, addClass, removeClass;
	
	  if ('classList' in document.documentElement) {
	    hasClass = function hasClass(elem, c) {
	      return elem.classList.contains(c);
	    };
	    addClass = function addClass(elem, c) {
	      elem.classList.add(c);
	    };
	    removeClass = function removeClass(elem, c) {
	      elem.classList.remove(c);
	    };
	  } else {
	    hasClass = function hasClass(elem, c) {
	      return classReg(c).test(elem.className);
	    };
	    addClass = function addClass(elem, c) {
	      if (!hasClass(elem, c)) {
	        elem.className = elem.className + ' ' + c;
	      }
	    };
	    removeClass = function removeClass(elem, c) {
	      elem.className = elem.className.replace(classReg(c), ' ');
	    };
	  }
	
	  function toggleClass(elem, c) {
	    var fn = hasClass(elem, c) ? removeClass : addClass;
	    fn(elem, c);
	  }
	
	  var classie = {
	    // full names
	    hasClass: hasClass,
	    addClass: addClass,
	    removeClass: removeClass,
	    toggleClass: toggleClass,
	    // short names
	    has: hasClass,
	    add: addClass,
	    remove: removeClass,
	    toggle: toggleClass
	  };
	
	  // transport
	  if (true) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (classie), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    // browser global
	    window.classie = classie;
	  }
	})(window);

/***/ },
/* 2 */
/*!******************************!*\
  !*** ./client/shared/app.js ***!
  \******************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'ngCropper', 'angularFileUpload', 'ngTouch', 'extensions', 'ng-sortable', 'toastr', 'relativeDate', 'ngAnalytics']).config(function ($stateProvider, $urlRouterProvider, $compileProvider, $locationProvider, $httpProvider, $urlMatcherFactoryProvider, $provide) {
	  $urlRouterProvider.otherwise('/');
	  $urlMatcherFactoryProvider.strictMode(false);
	
	  $locationProvider.hashPrefix('!');
	  $locationProvider.html5Mode(true);
	  $httpProvider.interceptors.push('authInterceptor');
	
	  $provide.decorator('$rootScope', ['$delegate', function ($delegate) {
	    $delegate.constructor.prototype.$onRootScope = function (name, listener) {
	      var unsubscribe = $delegate.$on(name, listener);
	      this.$on('$destroy', unsubscribe);
	    };
	    return $delegate;
	  }]);
	}).factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
	  return {
	    // Add authorization token to headers
	    request: function request(config) {
	      config.headers = config.headers || {};
	      if ($cookieStore.get('token')) {
	        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
	      }
	      return config;
	    }
	
	  };
	}).run(function ($rootScope, $location, Auth, ngAnalyticsService, api) {
	
	  api.settings.find({ name: 'clientID' }).success(function (res) {
	    if (!res[0] || !res[0].value) {
	      return false;
	    }
	    ngAnalyticsService.setClientId(res[0].value);
	  });
	
	  // Redirect to login if route requires auth and you're not logged in
	  $rootScope.$on('$stateChangeStart', function (event, next) {
	    Auth.isLoggedInAsync(function (loggedIn) {
	      if (next.authenticate && !loggedIn) {
	        $location.path('/login');
	      }
	    });
	
	    if (!next.hasPermission) return false;
	
	    Auth.hasPermission(next.hasPermission, function (hasPermission) {
	      if (!hasPermission) {
	        $location.path('/login');
	      }
	    });
	  });
	});

/***/ },
/* 3 */
/*!***********************************************************!*\
  !*** ./client/shared/account/signup/signup.controller.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').controller('SignupCtrl', function ($scope, Auth, $location, $window, $timeout, $rootScope) {
	  $scope.user = {};
	  $scope.errors = {};
	
	  $scope.register = function (form) {
	    $scope.submitted = true;
	
	    if (form.$valid) {
	      Auth.createUser({
	        name: $scope.user.name,
	        email: $scope.user.email,
	        password: $scope.user.password
	      }).then(function () {
	        // Account created, redirect to home
	        $timeout(function () {
	          $rootScope.isLoggedIn = Auth.isLoggedIn();
	          $location.path('/');
	        });
	      }).catch(function (err) {
	        err = err.data;
	        $scope.errors = {};
	
	        // Update validity of form fields that match the mongoose errors
	        angular.forEach(err.errors, function (error, field) {
	          form[field].$setValidity('mongoose', false);
	          $scope.errors[field] = error.message;
	        });
	      });
	    }
	  };
	
	  $scope.loginOauth = function (provider) {
	    $window.location.href = '/auth/' + provider;
	  };
	});

/***/ },
/* 4 */
/*!***************************************************************!*\
  !*** ./client/shared/account/settings/settings.controller.js ***!
  \***************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').controller('SettingsCtrl', function ($scope, User, Auth) {
	  $scope.errors = {};
	
	  $scope.changePassword = function (form) {
	    $scope.submitted = true;
	    if (form.$valid) {
	      Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword).then(function () {
	        $scope.message = 'Password successfully changed.';
	      }).catch(function () {
	        form.password.$setValidity('mongoose', false);
	        $scope.errors.other = 'Incorrect password';
	        $scope.message = '';
	      });
	    }
	  };
	});

/***/ },
/* 5 */
/*!*********************************************************!*\
  !*** ./client/shared/account/login/login.controller.js ***!
  \*********************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').controller('LoginCtrl', function ($scope, Auth, $location, $window, $rootScope, $timeout) {
	  $scope.user = {};
	  $scope.errors = {};
	
	  $scope.login = function (form) {
	    $scope.submitted = true;
	
	    if (form.$valid) {
	      Auth.login({
	        email: $scope.user.email,
	        password: $scope.user.password
	      }).then(function () {
	        // Logged in, redirect to home
	        $timeout(function () {
	          $rootScope.isLoggedIn = Auth.isLoggedIn();
	          $location.path('/');
	        });
	      }).catch(function (err) {
	        $scope.errors.other = err.message;
	      });
	    }
	  };
	
	  $scope.loginOauth = function (provider) {
	    $window.location.href = '/auth/' + provider;
	  };
	});

/***/ },
/* 6 */
/*!******************************************************!*\
  !*** ./client/shared/validate/validate.directive.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	angular.module('meanbaseApp').directive('validate', function ($timeout) {
	  return {
	    templateUrl: __webpack_require__(/*! ./validate.jade */ 7),
	    restrict: 'EA',
	    replace: true,
	    scope: {},
	    transclude: true,
	    link: function link(scope, element, attrs) {
	      var inputEl = angular.element(element[0].querySelector("input"));
	      if (element.hasClass('has-feedback')) {
	        var feedbackEl = angular.element(element[0].querySelector(".form-control-feedback"));
	      }
	
	      scope.errorMessage = attrs.validate || '';
	      scope.requiredMessage = "This field is required.";
	
	      // Add the has-error or has-success class to this element if the form checks out or not
	      function updateValid() {
	        if (inputEl.hasClass('ng-invalid-required')) {
	          element.addClass('has-warning').removeClass('has-error').removeClass('has-success');
	          if (feedbackEl) {
	            feedbackEl.removeClass('glyphicon-remove').removeClass('glyphicon-ok').addClass('glyphicon-warning-sign');
	          }
	        } else if (inputEl.hasClass('ng-valid')) {
	          element.addClass('has-success').removeClass('has-error').removeClass('has-warning');
	          if (feedbackEl) {
	            feedbackEl.removeClass('glyphicon-remove').addClass('glyphicon-ok').removeClass('glyphicon-warning-sign');
	          }
	        } else {
	          element.removeClass('has-success').addClass('has-error').removeClass('has-warning');
	          if (feedbackEl) {
	            feedbackEl.addClass('glyphicon-remove').removeClass('glyphicon-ok').removeClass('glyphicon-warning-sign');
	          }
	        }
	      }
	
	      // Check the form initially
	      $timeout(function () {
	        updateValid();
	      }, 0, false);
	
	      // Apply the correct classes every time the user enters a keystroke if they've already tabbed off of it once
	      inputEl.bind("keyup", function () {
	        if (inputEl.hasClass('ng-touched')) {
	          updateValid();
	        }
	      });
	
	      // only apply the has-error class after the user leaves the text box
	      inputEl.bind('blur', function () {
	        updateValid();
	      });
	    }
	  };
	});

/***/ },
/* 7 */
/*!**********************************************!*\
  !*** ./client/shared/validate/validate.jade ***!
  \**********************************************/
/***/ function(module, exports) {

	var path = 'shared/validate/validate.jade';
	var html = "<div><ng-transclude></ng-transclude><div class=\"help-block required\">This field is required.</div><div class=\"help-block error\">{{errorMessage}}</div></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 8 */
/*!****************************************************!*\
  !*** ./client/shared/taglist/taglist.directive.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	angular.module('meanbaseApp').directive('taglist', function () {
	  return {
	    templateUrl: __webpack_require__(/*! ./taglist.jade */ 9),
	    restrict: 'EA',
	    scope: {
	      tags: "=ngModel"
	    },
	    link: function link(scope, element, attrs) {
	
	      // Removes a template from the list
	      scope.deleteTag = function (tag) {
	        scope.tags.splice(scope.tags.indexOf(tag), 1);
	      };
	
	      // Get the text input element
	      var input = element.find('input');
	
	      input.bind("keydown keypress", function (event) {
	
	        // Remove error class every time a key is pressed
	        input[0].classList.remove('error');
	
	        // When enter or space is pressed
	        if (event.which === 13 || event.which === 32) {
	
	          // Perform some simple validation
	          var re = new RegExp("[_a-zA-Z0-9\\-\\.]+");
	
	          if (re.test(input[0].value)) {
	
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

/***/ },
/* 9 */
/*!********************************************!*\
  !*** ./client/shared/taglist/taglist.jade ***!
  \********************************************/
/***/ function(module, exports) {

	var path = 'shared/taglist/taglist.jade';
	var html = "<div class=\"tag-list\"><span ng-repeat=\"tag in tags\" ng-click=\"deleteTag(tag)\" class=\"tag\">{{tag}}<span class=\"remove\"></span></span><input type=\"Text\"></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 10 */
/*!******************************************************!*\
  !*** ./client/shared/sortable/sortable.directive.js ***!
  \******************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').directive('sortable', function ($rootScope) {
	  return {
	    // templateUrl: 'components/sortable/sortable.html',
	    restrict: 'EA',
	    link: function link(scope, element, attrs) {
	      var menu = element.scope().menu;
	      var wobbling = false;
	      scope.$watch('editMode', function (nv, ov) {
	        if (nv) {
	          element.addClass('mb-draggable');
	          element.addClass('wobble');
	          wobbling = true;
	          setTimeout(function () {
	            element.removeClass('wobble');
	            wobbling = false;
	          }, 2000);
	        } else {
	          if (wobbling) {
	            element.removeClass('wobble');
	            wobbling = false;
	          }
	        }
	      });
	
	      if (menu && !menu.published) {
	        element.addClass('unpublished-menu');
	      }
	
	      element.bind('mouseover', function () {
	        if ($rootScope.editMode) {
	          element.addClass('wobble');
	          wobbling = true;
	        }
	      });
	
	      element.bind('mouseout', function () {
	        if (wobbling) {
	          element.removeClass('wobble');
	          wobbling = false;
	        }
	      });
	    }
	  };
	});

/***/ },
/* 11 */
/*!**************************************************************!*\
  !*** ./client/shared/single-image/single-image.directive.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	angular.module('meanbaseApp').directive('singleImage', function ($rootScope, endpoints, $timeout, FileUploader, $cookieStore) {
	  return {
	    templateUrl: __webpack_require__(/*! ./single-image.jade */ 12),
	    restrict: 'EA',
	    scope: {
	      singleImage: "@",
	      caption: "@",
	      placeholdIt: "@",
	      imageClasses: "@"
	    },
	    compile: function compile(element, attrs) {
	      return {
	        pre: function pre(scope, element, attrs, controller, transcludeFn) {
	
	          scope.singleImage = scope.singleImage || 'image-1';
	
	          scope.editMode = $rootScope.editMode;
	
	          // If the user is authorized
	          if ($cookieStore.get('token')) {
	            // Make this area uploadable
	            scope.mediaUploader = new FileUploader({
	              url: '/api/media',
	              headers: {
	                'Authorization': 'Bearer ' + $cookieStore.get('token')
	              },
	              formData: [{ galleries: scope.singleImage }]
	            });
	
	            scope.mediaUploader.onCompleteAll = function () {
	              scope.mediaUploader.clearQueue();
	            };
	
	            scope.mediaUploader.onCompleteItem = function () {
	              $rootScope.$emit('cms.imagesUploaded');
	            };
	
	            scope.mediaUploader.onSuccessItem = function (item, response, status, headers) {
	              scope.image = response;
	              scope.image.location = scope.singleImage;
	              scope.image.modifiedurl = response.url + 'medium.jpg';
	              $rootScope.page.images[scope.singleImage] = scope.image;
	            };
	          }
	
	          scope.$watch('editMode', function (newValue, oldValue) {
	            if (newValue === oldValue) {
	              return false;
	            }
	            if (newValue) {
	              if (scope.mediaUploader) {
	                // If in edit mode upload the images passed in.
	                scope.mediaUploader.onAfterAddingAll = function () {
	                  scope.mediaUploader.uploadAll();
	                };
	              }
	            } else {
	              if (scope.mediaUploader) {
	                // Otherwise discard them
	                scope.mediaUploader.onAfterAddingAll = function () {
	                  scope.mediaUploader.clearQueue();
	                };
	              }
	            }
	          });
	        },
	        post: function post(scope, element, attrs, controller, transcludeFn) {
	          scope.groups = ['all', 'selected'];
	          scope.media = [];
	          var imageSnapshot;
	          var areChanges = false;
	
	          // Safety check in case attrs are missing
	          if (!scope.placeholdIt) {
	            scope.placeholdIt = 'http://placehold.it/300x300';
	          }
	          scope.caption = scope.caption === true || scope.caption === 'true';
	          $rootScope.page.images = $rootScope.page.images || {};
	          var defaultImage = {
	            modifiedurl: scope.placeholdIt || 'http://placehold.it/300x300',
	            alt: "Placeholder Image displaying recommended size",
	            attribute: "placehold.it"
	          };
	          if (!$rootScope.page.images[scope.singleImage]) {
	            $rootScope.page.images[scope.singleImage] = defaultImage;
	          }
	
	          // Watch for changes on the page.images object (in case "discard" changed it)
	          scope.$watch(function () {
	            return $rootScope.page.images[scope.singleImage];
	          }, function (newValue) {
	            scope.image = newValue;
	            if (!scope.image) {
	              return false;
	            }
	            if (!scope.image.modifiedurl) {
	              scope.image.modifiedurl = scope.image.url + 'origional.jpg';
	            }
	            scope.findImagesConfig.alreadySelected = newValue;
	          });
	
	          scope.findImagesConfig = {
	            multiple: false,
	            allOperations: false,
	            gallerySlug: scope.singleImage,
	            alreadySelected: $rootScope.page.images[scope.singleImage]
	          };
	
	          imageSnapshot = angular.copy($rootScope.page.images[scope.singleImage]);
	
	          // Choose and set the image
	          scope.$onRootScope('cms.choseImages', function (e, gallery) {
	            if (scope.singleImage === gallery.gallerySlug) {
	              scope.image = Array.isArray(gallery.images) ? gallery.images[0] : gallery.images;
	              if (scope.image) {
	                scope.image.location = scope.singleImage;
	                scope.image.modifiedurl = scope.image.origional;
	                $rootScope.page.images[scope.singleImage] = scope.image;
	              } else {
	                scope.image = defaultImage;
	                $rootScope.page.images[scope.singleImage] = scope.image;
	              }
	              areChanges = true;
	            }
	          });
	
	          // When the user saves their changes, set the new snapshot
	          scope.$onRootScope('cms.saveEdits', function () {
	            if (areChanges) {
	              imageSnapshot = angular.copy($rootScope.page.images[scope.singleImage]);
	              areChanges = false;
	            }
	          });
	
	          // If the user discards their changes reset to the snapshot
	          scope.$onRootScope('cms.discardEdits', function () {
	            scope.image = imageSnapshot;
	            $rootScope.page.images[scope.singleImage] = scope.image;
	          });
	        }
	      }; //return
	    } //compile
	  };
	});

/***/ },
/* 12 */
/*!******************************************************!*\
  !*** ./client/shared/single-image/single-image.jade ***!
  \******************************************************/
/***/ function(module, exports) {

	var path = 'shared/single-image/single-image.jade';
	var html = "<div class=\"img-responsive\"><img ng-if=\"!$root.editMode\" ng-src=\"{{image.modifiedurl}}\" alt=\"{{image.alt}}\" title=\"{{image.attribute}}\" ng-show=\"image\" fallback-src=\"{{placeholdIt}}\" ng-class=\"imageClasses\" class=\"img-responsive\"><img ng-if=\"$root.editMode\" ng-src=\"{{image.modifiedurl}}\" alt=\"{{image.alt}}\" title=\"{{image.attribute}}\" ng-show=\"image\" fallback-src=\"{{placeholdIt}}\" nv-file-drop=\"mediaUploader\" nv-file-over uploader=\"mediaUploader\" ng-class=\"imageClasses\" class=\"img-responsive\"><div ng-if=\"mediaUploader.isUploading\" class=\"progress image-upload-progress-bar\"><div role=\"progressbar\" ng-style=\"{ \'width\': mediaUploader.progress + \'%\' }\" class=\"progress-bar\"></div></div><div ng-if=\"caption\" class=\"caption\">{{image.alt}}</div></div><button find-images-modal find-images-config=\"findImagesConfig\" ng-if=\"$root.editMode\" class=\"btn btn-block btn-primary select-images-button\">Select Image</button>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 13 */
/*!******************************************************!*\
  !*** ./client/shared/ng-enter/ng-enter.directive.js ***!
  \******************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').directive('ngEnter', function () {
	  return function (scope, element, attrs) {
	    element.bind("keydown keypress", function (event) {
	      if (event.which === 13) {
	        scope.$apply(function () {
	          scope.$eval(attrs.ngEnter);
	        });
	
	        event.preventDefault();
	      }
	    });
	  };
	});

/***/ },
/* 14 */
/*!***************************************************!*\
  !*** ./client/shared/navbar/navbar.controller.js ***!
  \***************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').controller('NavbarCtrl', function ($scope, $location, Auth) {
	  // $scope.menu = [{
	  //   'title': 'Home',
	  //   'link': '/'
	  // }];
	
	  $scope.isCollapsed = true;
	  $scope.isLoggedIn = Auth.isLoggedIn;
	  $scope.isAdmin = Auth.isAdmin;
	  $scope.getCurrentUser = Auth.getCurrentUser;
	
	  $scope.logout = function () {
	    Auth.logout();
	    $location.path('/login');
	  };
	
	  $scope.isActive = function (route) {
	    return route === $location.path();
	  };
	});

/***/ },
/* 15 */
/*!******************************************************************!*\
  !*** ./client/shared/mongoose-error/mongoose-error.directive.js ***!
  \******************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Removes server error when user updates input
	 */
	
	angular.module('meanbaseApp').directive('mongooseError', function () {
	  return {
	    restrict: 'A',
	    require: 'ngModel',
	    link: function link(scope, element, attrs, ngModel) {
	      element.on('keydown', function () {
	        return ngModel.$setValidity('mongoose', true);
	      });
	    }
	  };
	});

/***/ },
/* 16 */
/*!**********************************************!*\
  !*** ./client/shared/modal/modal.service.js ***!
  \**********************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').factory('Modal', function ($rootScope, $modal) {
	  /**
	   * Opens a modal
	   * @param  {Object} scope      - an object to be merged with modal's scope
	   * @param  {String} modalClass - (optional) class(es) to be applied to the modal
	   * @return {Object}            - the instance $modal.open() returns
	   */
	  function openModal(scope, modalClass) {
	    var modalScope = $rootScope.$new();
	    scope = scope || {};
	    modalClass = modalClass || 'modal-default';
	
	    angular.extend(modalScope, scope);
	
	    return $modal.open({
	      templateUrl: 'components/modal/modal.html',
	      windowClass: modalClass,
	      scope: modalScope
	    });
	  }
	
	  // Public API here
	  return {
	
	    /* Confirmation modals */
	    confirm: {
	
	      /**
	       * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
	       * @param  {Function} del - callback, ran when delete is confirmed
	       * @return {Function}     - the function to open the modal (ex. myModalFn)
	       */
	      delete: function _delete(del) {
	        del = del || angular.noop;
	
	        /**
	         * Open a delete confirmation modal
	         * @param  {String} name   - name or info to show on modal
	         * @param  {All}           - any additional args are passed staight to del callback
	         */
	        return function () {
	          var args = Array.prototype.slice.call(arguments),
	              name = args.shift(),
	              deleteModal;
	
	          deleteModal = openModal({
	            modal: {
	              dismissable: true,
	              title: 'Confirm Delete',
	              html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
	              buttons: [{
	                classes: 'btn-danger',
	                text: 'Delete',
	                click: function click(e) {
	                  deleteModal.close(e);
	                }
	              }, {
	                classes: 'btn-default',
	                text: 'Cancel',
	                click: function click(e) {
	                  deleteModal.dismiss(e);
	                }
	              }]
	            }
	          }, 'modal-danger');
	
	          deleteModal.result.then(function (event) {
	            del.apply(event, args);
	          });
	        };
	      }
	    }
	  };
	});

/***/ },
/* 17 */
/*!******************************************!*\
  !*** ./client/shared/missing/missing.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	angular.module('meanbaseApp').config(function ($stateProvider) {
	  $stateProvider.state('main.missing', {
	    url: '/missing',
	    templateUrl: __webpack_require__(/*! ./missing.jade */ 18),
	    controller: 'MissingCtrl'
	  });
	});

/***/ },
/* 18 */
/*!********************************************!*\
  !*** ./client/shared/missing/missing.jade ***!
  \********************************************/
/***/ function(module, exports) {

	var path = 'shared/missing/missing.jade';
	var html = "<div ng-controller=\"NavbarCtrl\" class=\"navbar navbar-default navbar-static-top\"><div class=\"container\"><div class=\"navbar-header\"><button type=\"button\" ng-click=\"isCollapsed = !isCollapsed\" class=\"navbar-toggle\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"/\" class=\"navbar-brand\">home</a></div><div id=\"navbar-main\" collapse=\"isCollapsed\" class=\"navbar-collapse collapse\"><ul class=\"nav navbar-nav navbar-right\"><li ng-hide=\"isLoggedIn()\" ng-class=\"{active: isActive(&quot;/signup&quot;)}\"><a href=\"/signup\">Sign up</a></li><li ng-hide=\"isLoggedIn()\" ng-class=\"{active: isActive(&quot;/login&quot;)}\"><a href=\"/login\">Login</a></li><li ng-show=\"isLoggedIn()\"><p class=\"navbar-text\">Hello {{ getCurrentUser().name }}</p></li><li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive(&quot;/settings&quot;)}\"><a href=\"/settings\"><span class=\"glyphicon glyphicon-cog\"></span></a></li><li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive(&quot;/logout&quot;)}\"><a href=\"\" ng-click=\"logout()\">Logout</a></li></ul></div></div></div><div class=\"container meanbase-404\"><h1>Not found<span>:(</span></h1><p>Sorry, but the page you were trying to view does not exist.</p><p>It looks like this was the result of either:</p><ul><li>a mistyped address</li><li>an out-of-date link</li></ul><div class=\"text-center\"><a href=\"/\">Home</a></div></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 19 */
/*!*****************************************************!*\
  !*** ./client/shared/missing/missing.controller.js ***!
  \*****************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').controller('MissingCtrl', function ($scope) {});

/***/ },
/* 20 */
/*!************************************************************************!*\
  !*** ./client/shared/meanbase-editable/meanbase-editable.directive.js ***!
  \************************************************************************/
/***/ function(module, exports) {

	// Handles starting up and shutting down the inline text editors and syncing up changes with the model when edits are saved
	
	'use strict';
	
	angular.module('meanbaseApp').directive('meanbaseEditable', function ($sanitize, $rootScope) {
	  return {
	    restrict: 'EA',
	    scope: {
	      html: '=ngBindHtml',
	      config: '=config'
	    },
	    link: function link(scope, element, attrs) {
	
	      var el = jQuery(element);
	
	      // Sets up default configuration for our text editors
	      var config = {
	        autogrow: true,
	        fullscreenable: false,
	        btnsDef: {
	          // Customizables dropdowns
	          align: {
	            dropdown: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
	            ico: 'justifyLeft'
	          },
	          image: {
	            dropdown: ['insertImage', 'chooseImage'],
	            ico: 'insertImage'
	          },
	          lists: {
	            dropdown: ['unorderedList', 'orderedList'],
	            ico: 'unorderedList'
	          },
	          chooseImage: {
	            func: function func(params, tbw) {
	              el.trumbowyg('saveSelection');
	              scope.$parent.openImageModal({ multiple: false }, function (image) {
	                el.trumbowyg('restoreSelection');
	                var imageToInsert = new Image();
	                imageToInsert.src = image.small;
	                imageToInsert.alt = image.alt;
	                imageToInsert.class = 'img-responsive';
	                var sel = el.trumbowyg('getSelection');
	                sel.insertNode(imageToInsert);
	              });
	            },
	            ico: 'insertImage'
	          }
	        },
	        btns: ['viewHTML', '|', 'formatting', '|', 'align', '|', 'lists', '|', 'chooseImage']
	      };
	
	      var _snapshot;
	
	      function enableTextEditor() {
	        // Create the text editor instance. These events enable us to wrap the text in green outlines
	        el.trumbowyg(config).on('tbwfocus', function () {
	          trumbowygBox.addClass('hasFocus');
	        }).on('tbwblur', function () {
	          trumbowygBox.removeClass('hasFocus');
	        });
	
	        // Get the el we want to add the hasFocus class to
	        var trumbowygBox = el.parent('.trumbowyg-box');
	        angular.element(window).bind('click', trackMouse);
	
	        // Store the initial data in a snapshot in case we need to restore the inital data if the user cancels their changes
	        _snapshot = angular.copy(scope.html);
	
	        // We want to set the trumbowyg html to a copy of the inital value so if the extension drags around we retain it's html
	        el.trumbowyg('html', _snapshot);
	      } //enableTextEditor
	
	
	      // Start up the text editors when editMode is activated
	      if ($rootScope.editMode) {
	        enableTextEditor();
	      }
	
	      scope.$onRootScope('cms.editMode', function (event, value) {
	        if (value) {
	          enableTextEditor();
	        }
	      });
	
	      function trackMouse(event) {
	        var evt = $(event.target);
	        if (evt.is('[meanbase-editable]') || evt.parents('[meanbase-editable]').length > 0) {
	          var box = evt.parents('.trumbowyg-box');
	          var topPosition = box.offset().top + box.outerHeight() - event.pageY + 25;
	          var pane = box.find('ul.trumbowyg-button-pane');
	          pane.css('bottom', topPosition);
	        }
	      }
	
	      // When the user discards their edits, reset trumbowyg and ng-bind-html to the snapshot
	      scope.$onRootScope('cms.discardEdits', function () {
	        el.trumbowyg('html', _snapshot);
	        scope.html = _snapshot;
	        el.trumbowyg('destroy');
	        angular.element(window).unbind('click', trackMouse);
	      });
	
	      // When the user saves their changes, update the ng-bind-html with the trymbowyg html
	      scope.$onRootScope('cms.saveEdits', function () {
	        scope.html = el.trumbowyg('html');
	        el.trumbowyg('destroy');
	      });
	    } //link
	  }; //return
	});

/***/ },
/* 21 */
/*!*********************************************************************************!*\
  !*** ./client/shared/meanbase-editable/meanbase-editable.directive.ckeditor.js ***!
  \*********************************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').directive('editCKEditor', function ($sanitize) {
	  return {
	    restrict: 'EA',
	    scope: {
	      html: '=ngBindHtml',
	      editMode: '=edit',
	
	      // should contain discard() to undo edits
	      config: '=config'
	    },
	    link: function link(scope, element, attrs) {
	      var config = scope.config || {
	        language: 'en',
	        entities: false,
	        fullPage: true,
	        allowedContent: 'h1 h2 h3 p blockquote strong em;' + 'a[!href];' + 'img(left,right)[!src,alt,width,height];',
	        filebrowserBrowseUrl: '/ckeditor-browser',
	        filebrowserImageUploadUrl: '/api/media'
	      };
	
	      var ck = {},
	          snapshot;
	
	      if (!scope.html) {
	        scope.html = attrs.id ? attrs.id + ' editable area' : 'editable area';
	      }
	
	      function startUpCKEditor() {
	
	        element.attr('contenteditable', true);
	        // Create ck instance
	        ck = CKEDITOR.inline(element[0], config);
	
	        // Set the ck instances value to the value of ng-bind-html
	        ck.setData(scope.html);
	
	        // Store the initial data in a snapshot in case we need to restore the inital data if the user cancels their changes
	        snapshot = ck.getData();
	
	        ck.on('blur', function () {
	          console.log('blur');
	        });
	
	        CKEDITOR.on("currentInstance", function () {
	          console.log('change instance');
	        });
	
	        // Save images that are inserted in
	        ck.on('insertElement', function (evt) {
	          console.log('inserted element', ck);
	          ck.focusManager.blur();
	          ck.focusManager.blur();
	          ck.focusManager.blur();
	          // ck.getData();
	          // ck.updateElement();
	          // ck.setData(ck.getData());
	          // ck.focusManager.blur(true);
	        });
	      } //startUpCKEditor
	
	      function shutdownCkEditor() {
	        if (ck.destroy) {
	          ck.destroy();element.attr('contenteditable', false);
	        }
	      }
	
	      // Watch editMode to know when to start up and shut down ckeditor
	      scope.$watch('editMode', function (newValue, oldValue) {
	        if (newValue) {
	          startUpCKEditor();
	        } else {
	          shutdownCkEditor();
	        }
	      });
	
	      // scope.$onRootScope('blurEditors', function() {
	      //   ck.focusManager.forceBlur();
	      //   console.log('bluring editors');
	      // });
	
	      // When cms.headbar or any other script releases the event to discard edits, reset to snapshot
	      scope.$onRootScope('cms.discardEdits', function () {
	        ck.setData(scope.html);
	        // scope.html = snapshot;
	      });
	
	      // When the save edits event is fired on rootscope listen and save ckeditor data to html
	      scope.$onRootScope('cms.saveEdits', function () {
	        console.log('getting data');
	        scope.html = ck.getData();
	      });
	    } //link
	  }; //return
	});

/***/ },
/* 22 */
/*!**********************************************************!*\
  !*** ./client/shared/mb-animate/mb-animate.directive.js ***!
  \**********************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').directive('mbAnimate', function () {
	  return {
	    template: '<div></div>',
	    restrict: 'EA',
	    link: function link(scope, element, attrs) {
	      element.addClass('animated');
	      if (attrs.mbAnimationTrigger) {
	        scope.$watch(function () {
	          return attrs.mbAnimationTrigger;
	        }, function (nv, ov) {
	          if (nv === ov) {
	            return false;
	          }
	          if (nv === 'true' || nv === true) {
	            if (attrs.mbAnimate) {
	              element.addClass(attrs.mbAnimate);
	              setTimeout(function () {
	                element.removeClass(attrs.mbAnimate);
	              }, 2000);
	            }
	            if (attrs.mbDeAnimate) {
	              element.removeClass(attrs.mbDeAnimate);
	            }
	          } else {
	            if (attrs.mbDeAnimate) {
	              element.addClass(attrs.mbDeAnimate);
	              setTimeout(function () {
	                element.removeClass(attrs.mbDeAnimate);
	              }, 2000);
	            }
	            element.removeClass(attrs.mbAnimate);
	          }
	        });
	      }
	    }
	  };
	});

/***/ },
/* 23 */
/*!************************************!*\
  !*** ./client/shared/main/main.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	(function () {
	  // ###Controls the routes for the front end of the site
	  // - Defines a parent route for the front end (compared to /cms parent for backend)
	  // - All other routes beginning at root and not cms go to "main" children and search for a template url from the server
	
	  // ####Parent route for front end site.
	  // - **Important! Don't give this route a url** since we want the ability to have routes without a prefix (/)
	
	  angular.module('extensions', []);
	
	  angular.module('meanbaseApp').config(function ($stateProvider) {
	    $stateProvider.state('main', {
	      templateUrl: __webpack_require__(/*! ./main.jade */ 24),
	      controller: 'MainCtrl'
	    });
	  });
	
	  // ####Child Routes
	  // - Handles every kind of route that doesn't begin with cms
	  // - Contacts the server database to find which view to load
	  angular.module('meanbaseApp').config(function ($stateProvider) {
	    $stateProvider.state('main.page', {
	      url: '^/{page:(?!cms|login|signup|settings).*}',
	      templateProvider: ['endpoints', '$templateFactory', '$stateParams', '$q', '$state', '$rootScope', 'Auth', 'api', '$templateCache', function (endpoints, $templateFactory, $stateParams, $q, $state, $rootScope, Auth, api, $templateCache) {
	        // - Prepare a promise to return to templateProvider
	        var deferred = $q.defer();
	        // Let's check if the user is logged in
	        Auth.isLoggedInAsync(function (status) {
	          $rootScope.isLoggedIn = status;
	
	          // Get the current logged in user
	          $rootScope.currentUser = Auth.getCurrentUser();
	
	          var pages = api.publishedPages;
	          // - Instantiate a new endpoints service to communite with server database
	          if ($rootScope.currentUser && $rootScope.currentUser.permissions && $rootScope.currentUser.permissions.indexOf('editContent') > -1) {
	            pages = api.pages;
	          }
	
	          // - Find a page in the database with a url that matches the current url
	          pages.find({ url: '/' + $stateParams.page }).success(function (response) {
	            $rootScope.page = {
	              tabTitle: 404,
	              description: 'Could not find page',
	              extensions: {},
	              content: {},
	              url: 'missing'
	            };
	            // - If no page was found then redirect to a 404 page.
	            if (!response[0]) {
	              $state.go('main.missing');return false;
	            }
	
	            // Loop through the template mapping stored in themeTemplates.
	            // That variable came from the theme's theme.json file.
	            // It finds which template to load based on the template that came back for the page
	            // This is done to keep different themes' templates compatible
	            var mappedTemplate = response[0].template;
	            for (var property in meanbaseGlobals.themeTemplates) {
	              if (meanbaseGlobals.themeTemplates.hasOwnProperty(property)) {
	                if (meanbaseGlobals.themeTemplates[property].indexOf(response[0].template) > -1) {
	                  mappedTemplate = property;
	                  break;
	                }
	              }
	            }
	            // - Construct a url string from the theme name and template name to pass into $templateFactory
	            if (!window.meanbaseGlobals.themeTemplatePaths[mappedTemplate]) {
	              console.log('Could not find page template: ');
	              return $state.go('main.missing');
	            }
	
	            var templatePath = window.meanbaseGlobals.themeTemplatePaths[mappedTemplate].template;
	
	            if (!templatePath) {
	              console.log('Could not find page template: ', templatePath);
	              return $state.go('main.missing');
	            }
	
	            // - Save the rest of the page data on the meanbaseGlobals object for use in the rest of the app
	            // meanbaseGlobals.page =
	            $rootScope.page = response[0];
	            if ($rootScope.page.tabTitle) {
	              document.title = $rootScope.page.tabTitle;
	            }
	
	            if ($rootScope.page.description) {
	              jQuery('meta[name=description]').attr('content', $rootScope.page.description);
	            }
	            console.log("templatePath", templatePath);
	            var html = $templateCache.get(templatePath);
	            if (html) {
	              deferred.resolve(html);
	            } else {
	              $state.go('main.missing');
	            }
	          }).error(function (error) {
	            console.log('Could not request page template: ', error);
	            $state.go('main.missing');
	          });
	        });
	
	        return deferred.promise;
	      }]
	    });
	  });
	})();

/***/ },
/* 24 */
/*!**************************************!*\
  !*** ./client/shared/main/main.jade ***!
  \**************************************/
/***/ function(module, exports) {

	var path = 'shared/main/main.jade';
	var html = "<div ng-class=\"{loggedIn: isLoggedIn}\" class=\"meanbase-front\"><!--meanbase Head Tool Bar --><nav id=\"mb-headbar\" role=\"navigation\" ng-if=\"isLoggedIn\" ng-controller=\"cms.headbar.controller as headbar\" class=\"navbar navbar-default navbar-fixed-top navbar-inverse\"><div class=\"navbar-header\"><button ng-init=\"cmsHeabarClosed = true\" ng-click=\"cmsHeabarClosed = !cmsHeabarClosed\" class=\"navbar-toggle collapsed\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"/cms\" target=\"_self\" class=\"navbar-brand\">Manage Site</a></div><div id=\"mb-headbar-child\" collapse=\"cmsHeabarClosed\" class=\"navbar-collapse\"><ul class=\"nav navbar-nav\"><li ng-show=\"currentUser.permissions.indexOf(\'editContent\') &gt; -1\" class=\"dropdown\"><a data-toggle=\"dropdown\" role=\"button\" class=\"dropdown-toggle\">Create Page</a><ul role=\"menu\" class=\"dropdown-menu\"><li ng-repeat=\"template in themeTemplates\"><a href=\"#\" ng-click=\"headbar.createPage($event)\" ng-mouseover=\"headbar.showScreenshot(template)\" ng-mouseleave=\"headbar.hideScreenshot(template)\">{{template}}</a></li></ul></li><li ng-show=\"currentUser.permissions.indexOf(\'editContent\') &gt; -1\"><a ng-hide=\"editMode\" ng-click=\"headbar.toggleEdit()\">Edit</a><button ng-show=\"editMode\" ng-click=\"headbar.saveChanges()\" class=\"btn btn-success\">Save</button></li><li ng-show=\"editMode\"><button ng-click=\"headbar.editPageModal()\" class=\"btn btn-info\">Settings</button></li><li ng-show=\"editMode\"><button ng-click=\"headbar.discardChanges()\" class=\"btn btn-warning\">Discard</button></li><li ng-show=\"currentUser.permissions.indexOf(\'deleteContent\') &gt; -1 &amp;&amp; editMode\"><button ng-click=\"headbar.deletePage()\" class=\"btn btn-danger\">Delete page</button></li><li ng-show=\"currentUser.permissions.indexOf(\'publishContent\') &gt; -1 &amp;&amp; editMode\"><button ng-click=\"headbar.togglePublishPage()\" class=\"btn btn-primary\"><span ng-hide=\"page.published\">Publish</span><span ng-show=\"page.published\">Unpublish</span></button></li></ul><ul class=\"nav navbar-nav navbar-right\"><li class=\"dropdown\"><a data-toggle=\"dropdown\" role=\"button\" class=\"dropdown-toggle\">Hi, {{currentUser.name}} ({{currentUser.role}})</a><ul role=\"menu\" class=\"dropdown-menu dropdown-menu-right\"><li><a ng-click=\"logout()\">Log Out</a></li><li><a ui-sref=\"settings\">Account Settings</a></li></ul></li></ul></div></nav><div ui-view=\"\" ng-class=\"{\'fixed-header-stopper\': isLoggedIn}\" mb-animation-trigger=\"{{editMode}}\" mb-animate mb-de-animate=\"{{pageAnimation}}\" id=\"main-view\"><div class=\"mb-loading-screen text-center\"><h1><i class=\"fa fa-spinner fa-spin\"></i><span> Loading Template</span></h1></div></div></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 25 */
/*!***********************************************!*\
  !*** ./client/shared/main/main.controller.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	// #Main Controller
	// This controller is kind of a conglomeration of functionality needed for the CMS. Anything that needs to be accessable by every part of the front end goes here. By front end I mean everything the user sees but not the CMS admin pages.
	
	'use strict';
	
	(function () {
	  angular.module('meanbaseApp').controller('MainCtrl', MainCtrl);
	
	  // @ngInject
	  function MainCtrl($rootScope, $scope, $http, Auth, $location, endpoints, $modal, $sanitize, helpers, $timeout, toastr, api) {
	
	    // It's becoming a standard in meanbase prepare the api endpoints the controller will hit at the top of the file.
	
	    var server = {};
	    if ($rootScope.currentUser && $rootScope.currentUser.permissions && $rootScope.currentUser.permissions.indexOf('editContent') > -1) {
	      server.menus = api.menus;
	    } else {
	      server.menus = api.publishedMenus;
	    }
	
	    // // Let's check if the user is logged in
	    // $rootScope.isLoggedIn = Auth.isLoggedIn();
	
	    // // Get the current logged in user
	    // $scope.currentUser = Auth.getCurrentUser();
	
	    // A method that logs the user out
	    $scope.logout = function () {
	      Auth.logout();
	    };
	
	    // ###Shared Content
	    // What is shared content? Let's say you have an extension|plugin|widget|component|content, whatever you want to call it, on your page. By default it will only exist on that page. If you create another page, even when using the same template you won't see that extension. Shared data is a concept that let's you have the same extension on multiple pages just by naming the extension. The best part? All extensions with that name and type stay in sync, so when you make changes to an extension on one page all other instances of that extension are updated. It means you don't have to recreate the same information over and over again on every page you want that extension.
	
	    // ####Deleting Shared Content
	    // However, we need some way of knowing when to delete shared content, say when it's no longer being used? Upon every save, if an extension was removed from the page, we send it's shared content name to the server which will perform a check. If no other pages are using that shared content, it deletes it all together, however if some other page is still using that content, we do nothing. This variable keeps a record of extensions with names that were deleted for sending to the server.
	    $scope.sharedContentToCheckDelete = [];
	
	    // Get all the menus on the server.
	    server.menus.find({}).success(function (response) {
	      $rootScope.menus = response;
	    });
	
	    function getSharedContentFromServer() {
	      // Gets all existing shared content. Why not just content that's used by the page we are on? Because if the user is in edit mode and they want to add existing content they will need the full list of shared content to choose from.
	      api.sharedContent.find({}).success(function (data) {
	
	        // We need to define this for use even if no data was returned so it doesn't break code when we add properties to this object
	        $rootScope.sharedContent = {};
	
	        // We avoid running this code unnecessarily if no data was returned
	        if (helpers.isEmpty(data)) {
	          return false;
	        }
	
	        // The data from the server comes in as an array. We want to convert it to an object for speed increases throughout the app so we can refer to a sharedContent object by it's contentName directly instead of having to do a loop anytime we need acceess to it
	        $rootScope.sharedContent = helpers.arrayToObjectWithObject(data, 'contentName');
	
	        // See helpers.service.js. This is basically a for loop that goes through the extensions only on the current page
	        helpers.loopThroughPageExtensions(function (currentExtension) {
	
	          // If the extension has a name (uses shared content), then we want to update it's data with the shared content data
	          if (currentExtension.contentName && currentExtension.contentName !== '') {
	
	            // If the sharedContent for this extension is blank, we want to at least define the correct structure so it doesn't break code
	            if (!$rootScope.sharedContent[currentExtension.contentName]) {
	              $rootScope.sharedContent[currentExtension.contentName] = {
	                data: undefined,
	                config: undefined
	              };
	            }
	            currentExtension.data = $rootScope.sharedContent[currentExtension.contentName].data;
	            currentExtension.config = $rootScope.sharedContent[currentExtension.contentName].config;
	          }
	        });
	      });
	    }
	
	    getSharedContentFromServer();
	
	    // Rubaxa's library "sortable" and "ng-sortable" (the drag and drop capabilities) need a configuration to be passed in. Here we define it. Inside the ng-repeat, any item with a class of `.mb-draggable` will be able to be dragged.
	    //
	    $rootScope.menusConfig = {
	      group: 'menus',
	      ghostClass: "mb-draggable-ghost",
	      draggable: ".mb-draggable",
	      filter: ".ignore-draggable",
	      animation: 250,
	      scroll: true, // or HTMLElement
	      scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
	      scrollSpeed: 10 // px
	    };
	
	    // Since extensions are draggable we need to define those here too.
	    $rootScope.sortableExtensions = {
	      group: 'extensions',
	      ghostClass: "mb-draggable-ghost",
	      draggable: ".mb-draggable",
	      filter: ".ignore-draggable",
	      animation: 250,
	      scroll: true, // or HTMLElement
	      scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
	      scrollSpeed: 10 // px
	    };
	
	    // ###Client Side Validation
	    // We want to validate client side data before sending it to the server so the user can know what to correct. The server also validates the data.
	
	    // These regexes may we used throughout forms on the site
	    $rootScope.validators = {
	      isTitle: /^[A-Za-z0-9@:?&=.\/ _\-]*$/,
	      isURI: /(((http|https|ftp):\/\/([\w-\d]+\.)+[\w-\d]+){0,1}((\/|#)[\w~,;\-\.\/?%&+#=]*))/,
	      isFilePath: /^[0-9A-Za-z\/*_.\\\-]*$/,
	      isCSSClass: /^[A-Za-z0-9_\-*]*$/,
	      isAnchorTarget: /^[_blank|_self|_parent|_top]*$/,
	      isEmail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	      isText: /^$/,
	      isHTML: /^$/
	    };
	
	    // These error messages may be used to explain to the user why their input was invalid and match their corresponding regexes above
	    $rootScope.errorMessages = {
	      isTitle: 'Many only contain letters, numbers, and these symbols ( @ : ? & = . _ - ).',
	      isURI: "Must be a valid path, either a full address ('http://path.com') or a relative one '/path', '#hashPath'",
	      isFilePath: 'Must contain only letters, numbers, /, *, _, ., \\, and -',
	      isCSSClass: 'May only contain letters, numbers, _, -, and *',
	      isAnchorTarget: 'Must be either _blank, _self, _parent, or _top',
	      isEmail: 'Must be a valid email format',
	      isText: 'Must be safe text',
	      isHTML: 'Must be safe html',
	      isRequired: "This field is required."
	    };
	
	    // ###Snapshots
	    // What if the user hits edit, makes many changes and then decides they don't like those changes?
	
	    // We need some way of reseting the content back to what it was before. That's what snapshots do. We do an angular.copy() on all major pieces of data when the user hits edit and if the user then hits discard, we set that data to the initial copied value.
	    var snapshots = {};
	    $scope.$onRootScope('cms.editMode', function (event, editMode) {
	      // Rubaxa's library has the ability to be disabled.
	      // We only want draggable elements while in edit mode
	      $rootScope.menusConfig.disabled = !editMode;
	      $rootScope.sortableExtensions.disabled = !editMode;
	
	      if (editMode) {
	        snapshots.menus = angular.copy($rootScope.menus);
	        snapshots.page = angular.copy($rootScope.page);
	        snapshots.sharedContent = angular.copy($rootScope.sharedContent);
	
	        // In the admin pages, extensions may be disabled so they cannot be added to the page.
	        // Here we get only the active extensions so the admin can select extensions to add
	        api.extensions.find({ active: true }).success(function (res) {
	          $rootScope.extensions = res;
	          for (var i = 0; i < $rootScope.extensions.length; i++) {
	            if (!$rootScope.extensions[i].screenshot) {
	              $rootScope.extensions[i].screenshot = 'http://placehold.it/200x100';
	            }
	          }
	        });
	      }
	    });
	
	    // Every time we load a new page, we need to get the shared content all over again so we can sync any content on that page with changes that were made on a different page
	    $scope.$onRootScope('$stateChangeSuccess', function () {
	      getSharedContentFromServer();
	    });
	
	    // ###Save Edits!
	    // This is the event that listens for when the user clicks the save button after being in edit mode.
	    $scope.$onRootScope('cms.saveEdits', function () {
	
	      // We play a pulse animation on the page. We are using [daneden/animate.css](https://github.com/daneden/animate.css) so we could pass any of those values here
	      $scope.pageAnimation = 'pulse';
	
	      // #### Update the menus
	
	      // Update positions and locations of the menu items
	      $rootScope.menus = helpers.updatePositionData($rootScope.menus);
	
	      // Delete all the menus in the database,
	      // recreate all of them based off the client data stored in $rootScope.menus,
	      // Get the newly updated menus with their server-generated ids
	      helpers.removeEmptyProperties($rootScope.menus);
	
	      server.menus.delete({}).finally(function (deleteResponse) {
	        if (!helpers.isEmpty($rootScope.menus)) {
	          server.menus.create($rootScope.menus).success(function (createResponse) {
	            server.menus.find({}).success(function (response) {
	              $rootScope.menus = response;
	            });
	          });
	        }
	      });
	
	      // We use a timeout so that the meanbase-editable html changes have time to update their models before we save the page.
	      $timeout(function () {
	        if (!$rootScope.page._id) {
	          return false;
	        }
	
	        api.pages.update({ _id: $rootScope.page._id }, $rootScope.page).finally(function () {
	
	          // Since we have angular setting the browser tab title we want to update it in case it changed. Normally this is bad practice, but we have prerender in node pre-compiling these pages for search engine bots
	          if ($rootScope.page.tabTitle) {
	            document.title = $rootScope.page.tabTitle;
	          }
	
	          // Same with description
	          if ($rootScope.page.description) {
	            jQuery('meta[name=description]').attr('content', $rootScope.page.description);
	          }
	
	          // Here's where we try to delete shared content that was removed from this page.
	          if ($scope.sharedContentToCheckDelete.length > 0) {
	            api.sharedContent.delete({ contentName: { $in: $scope.sharedContentToCheckDelete } }).finally(function () {
	
	              // Get the latest content for the list next time the user want to add existing content
	              getSharedContentFromServer();
	
	              // Reset the array
	              $scope.sharedContentToCheckDelete = [];
	            });
	          } else {
	            getSharedContentFromServer();
	          }
	
	          // Let the user know their changes were saved
	          toastr.success('Changes saved');
	        }); //api.pages.update()
	
	        // We want to update the extension position data as well
	        $rootScope.page.extensions = helpers.updatePositionData($rootScope.page.extensions);
	
	        // **In this first loop, we update the shared content with the data from the extensions**
	        helpers.loopThroughPageExtensions(function (currentExtension) {
	          if (currentExtension.contentName && currentExtension.contentName !== '') {
	            if (!$rootScope.sharedContent[currentExtension.contentName]) {
	              $rootScope.sharedContent[currentExtension.contentName] = {};
	            }
	            $rootScope.sharedContent[currentExtension.contentName].contentName = currentExtension.contentName;
	            $rootScope.sharedContent[currentExtension.contentName].type = currentExtension.name;
	            $rootScope.sharedContent[currentExtension.contentName].data = currentExtension.data;
	            $rootScope.sharedContent[currentExtension.contentName].config = currentExtension.config;
	            $rootScope.sharedContent[currentExtension.contentName].screenshot = currentExtension.screenshot;
	
	            // Send the shared content back to the server
	            api.sharedContent.update({ contentName: currentExtension.contentName }, $rootScope.sharedContent[currentExtension.contentName]);
	          }
	        }); //helpers.loopThroughPageExtensions
	
	        // **In this second loop, we update the extensions with the data from shared content**
	        // This is so that extensions using the same data on the same page all stay in sync
	        helpers.loopThroughPageExtensions(function (currentExtension) {
	          if (currentExtension.contentName && currentExtension.contentName !== '') {
	            currentExtension.data = $rootScope.sharedContent[currentExtension.contentName].data;
	            currentExtension.config = $rootScope.sharedContent[currentExtension.contentName].config;
	          }
	        });
	      }); //$timeout
	    }); //saveEdits()
	
	    // ### Discard Edits
	    // When cms.headbar or any other script releases the event to discard edits, reset everything to the way it was when the user first clicked edit
	    $scope.$onRootScope('cms.discardEdits', function () {
	      $scope.pageAnimation = 'shake';
	
	      // We want to set the data to it's old initial snapshot
	      $rootScope.menus = snapshots.menus;
	      $rootScope.page = snapshots.page;
	      $rootScope.sharedContent = snapshots.sharedContent;
	
	      toastr.warning('Changes have been discarded');
	
	      // We also want to reset the shared content to delete check
	      $rootScope.sharedContentToCheckDelete = [];
	    });
	
	    // ### Image selector
	    // This is not the best place for this modal controller, but it handles opening and getting the images for the inline-text editor.
	    // This controls the image selector modal that opens with the inline text editor
	    $rootScope.openImageModal = function (_config, callback) {
	      var modalInstance = $modal.open({
	        templateUrl: __webpack_require__(/*! ./findImage.modal.jade */ 26),
	        controller: function controller($scope, $modalInstance, config) {
	          $scope.config = config;
	
	          config.allOperations = true;
	          $scope.imageSelectorApi = {};
	          var areChanges;
	
	          if ($scope.config.multiple) {
	            $scope.instructions = 'Choose Images';
	          } else {
	            $scope.instructions = 'Choose Image';
	          }
	
	          $modalInstance.opened.then(function () {
	            $timeout(function () {
	              $scope.imageSelectorApi.getAlreadySelected($scope.config.alreadySelected);
	            }, 0, true);
	          });
	          // $scope.allOperations = false;
	          $scope.chooseImages = function () {
	            areChanges = true;
	            var selectedImages = $scope.imageSelectorApi.getSelectedImages();
	            $modalInstance.close(selectedImages);
	          };
	        },
	        size: 'lg',
	        resolve: {
	          config: function config() {
	            return _config || {};
	          }
	        }
	      });
	
	      modalInstance.result.then(function (selectedImages) {
	        if (callback) {
	          callback(selectedImages);
	        }
	      });
	    };
	
	    // ### Publish Gallery Selection
	    // In meanbase, a gallery is simply a group of images. When images a selected with the image-selector and chosen, we need a way of saving that selection when the user hits save. This takes the images that were selected and the name of the slug (collection) and saves that slug to those images on the server.
	    $rootScope.publishGallerySelection = function (slug, gallerySelection) {
	      var imageArray = [];
	
	      // Get the visibile images' urls
	      for (var i = 0; i < gallerySelection.length; i++) {
	        gallerySelection[i].galleries.push(slug);
	        imageArray.push(gallerySelection[i].url);
	      };
	
	      // Remove this gallery slug from all the images that use it and then add it back to the appropriate images
	      // This strategy is quicker than checking which ones were added and removed
	      api.media.update({ galleries: slug }, { $pull: { galleries: slug } }).finally(function () {
	        if (imageArray.length < 1) return false;
	        api.media.update({ url: { $in: imageArray } }, { $push: { galleries: slug } });
	      });
	    };
	
	    // ###handleClick
	    // If the user is in edit mode, we prevent menus that use this function in their ng-click from navigating away and instead open the edit menu modal. If the user is not in edit mode, navigation functions normally.
	    $scope.handleClick = function ($event, _menuItem, href) {
	      if ($scope.editMode) {
	        $event.preventDefault();
	        var modalInstance = $modal.open({
	          templateUrl: __webpack_require__(/*! ./editmenu.modal.jade */ 27),
	          controller: menuModal,
	          size: 'md',
	          resolve: {
	            menuItem: function menuItem() {
	              return _menuItem;
	            },
	            isNewMenu: function isNewMenu() {
	              return false;
	            }
	          }
	        });
	      }
	      $location.path(href);
	    };
	
	    // ### Removing extensions
	    // This may not be the best location for this function, but it handles removing extensions when the user clicks the delete **delete** button on an extension
	    // Removes an extension from an extensible area
	    $scope.removeThisExtension = function (extension) {
	
	      // If `sharedContentToCheckDelete` does not already contain this extension `contentName` we want to add it to the array.
	      if (extension.contentName && $scope.sharedContentToCheckDelete.indexOf(extension.contentName) === -1) {
	        $scope.sharedContentToCheckDelete.push(extension.contentName);
	      }
	
	      // Since we are deleting an extension we want to make sure they are in the correct order in the array so we don't delete the wrong extension
	      $rootScope.page.extensions = helpers.updatePositionData($rootScope.page.extensions);
	
	      // Make sure we are deleting an existing extension and then remove it from $rootScope.page.extensions
	      if (extension && extension.group && extension.position !== undefined) {
	        $rootScope.page.extensions[extension.group].splice(extension.position, 1);
	      }
	    };
	
	    // ### Create new menu item
	    // This may not be the best location for this controller, but it handles opening the modal to create a new menu item
	    $scope.createMenuItem = function (group) {
	      if (!$rootScope.menus[group]) {
	        $rootScope.menus[group] = [];
	      }
	      var modalInstance = $modal.open({
	        templateUrl: 'editmenu.modal.html',
	        controller: menuModal,
	        size: 'md',
	        resolve: {
	          menuItem: function menuItem() {
	            return {
	              position: $rootScope.menus[group].length,
	              group: group,
	              title: '',
	              classes: '',
	              target: '',
	              url: ''
	            };
	          },
	          isNewMenu: function isNewMenu() {
	            return true;
	          }
	        }
	      });
	    };
	
	    // ### The Menu Modal Controller
	    // @ngInject
	    function menuModal($scope, $modalInstance, menuItem, isNewMenu) {
	
	      api.pages.find({}).success(function (response) {
	        // if(response) {
	        //   if(Array.isArray(response)) {
	        //     for(var idx = 0; idx < response.length; idx++) {
	        //       response[idx].url = '/' + response[idx].url;
	        //     }
	        //   } else {
	        //     response.url = '/' + response.url;
	        //   }
	        // }
	        $scope.pages = response;
	      });
	
	      // This is a little distinguishing check to see if this modal was opened from an existing menu item (to edit it) or was opened from the createMenuItem function to create a new menu from scratch
	      $scope.isNewMenu = isNewMenu;
	
	      // Since we don't want to be affecting our actual menu until we hit save we must make a copy of it.
	      $scope.menuItem = angular.copy(menuItem);
	
	      $scope.newMenuItem = function (editingMenuForm) {
	        // We want to make sure the data is valid before submitting it
	        if (editingMenuForm.$valid) {
	          if ($scope.menuItem._id) {
	            delete $scope.menuItem._id;
	          }
	
	          // If this menu group doesn't exist create it
	          if (!$rootScope.menus[$scope.menuItem.group]) {
	            $rootScope.menus[$scope.menuItem.group] = [];
	          }
	
	          // Add the menu item to the end of it's group's list
	          $scope.menuItem.position = $rootScope.menus[$scope.menuItem.group].length;
	          $rootScope.menus[$scope.menuItem.group].push($scope.menuItem);
	          $modalInstance.dismiss();
	        }
	      };
	
	      $scope.editMenuItem = function (editingMenuForm) {
	        // We want to make sure the changes are valid before submitting it
	        if (editingMenuForm.$valid) {
	          // menuItem is the menu that was passed in (the actual menu we want to modify). $scope.menuItem is the object that's being edited in the modal.
	          menuItem.title = $scope.menuItem.title || menuItem.title;
	          menuItem.url = $scope.menuItem.url || menuItem.url;
	          menuItem.classes = $scope.menuItem.classes;
	          menuItem.target = $scope.menuItem.target;
	          $modalInstance.dismiss();
	        }
	      };
	
	      $scope.removeMenuItem = function () {
	        // Update the position data so that we are sure we are deleting the correct menu item
	        $rootScope.menus = helpers.updatePositionData($rootScope.menus);
	
	        $rootScope.menus[menuItem.group].splice(menuItem.position, 1);
	        $modalInstance.dismiss();
	      };
	    }
	  }
	})();

/***/ },
/* 26 */
/*!*************************************************!*\
  !*** ./client/shared/main/findImage.modal.jade ***!
  \*************************************************/
/***/ function(module, exports) {

	var path = 'shared/main/findImage.modal.jade';
	var html = "<div id=\"findImage-modal\" class=\"extensiondata-selector\"><div class=\"modal-header\"><button ng-click=\"$dismiss()\" class=\"close\"><span aria-hidden=\"true\">×</span><span class=\"sr-only\">Close</span></button><h4 class=\"modal-title\">{{instructions}}</h4></div><div class=\"modal-body\"><image-selector api=\"imageSelectorApi\" image-selector-config=\"config\"></image-selector></div><div class=\"modal-footer\"><p class=\"double-tap-instructions\">Double tap to enlarge photos</p><div class=\"choose-close-buttons\"><button type=\"button\" ng-click=\"chooseImages()\" class=\"btn btn-success\">Choose</button><button type=\"button\" ng-click=\"$dismiss()\" class=\"btn btn-default\">Close</button></div></div></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 27 */
/*!************************************************!*\
  !*** ./client/shared/main/editmenu.modal.jade ***!
  \************************************************/
/***/ function(module, exports) {

	var path = 'shared/main/editmenu.modal.jade';
	var html = "<div class=\"modal-header\"><button type=\"button\" ng-click=\"$dismiss()\" class=\"close\"><span aria-hidden=\"true\">×</span><span class=\"sr-only\">Close</span></button><h4 id=\"editMenuItemLabel\" class=\"modal-title\">Edit Menu Item</h4></div><div class=\"modal-body\"><form novalidate name=\"editingMenuForm\" ng-submit=\"isNewMenu? newMenuItem(editingMenuForm): editMenuItem(editingMenuForm)\"><input type=\"submit\" class=\"hidden\"><div class=\"form-group\"><label>Url</label><input ng-model=\"menuItem.url\" name=\"url\" ng-pattern=\"validators.isURI\" required class=\"form-control\"><div ng-show=\"editingMenuForm.url.$error.required &amp;&amp; editingMenuForm.url.$dirty\" class=\"help-block required\">{{errorMessages.requiredMessage}}</div><div ng-show=\"editingMenuForm.url.$invalid &amp;&amp; editingMenuForm.url.$dirty\" class=\"help-block error\">{{errorMessages.isURI}}</div></div><div class=\"form-group\"><label>Get url from existing pages: </label><select ng-options=\"page.url as page.url for page in pages\" ng-model=\"menuItem.url\" class=\"form-control\"></select></div><div class=\"form-group\"><label>Title</label><input ng-model=\"menuItem.title\" name=\"title\" ng-pattern=\"validators.isTitle\" required class=\"form-control\"><div ng-show=\"editingMenuForm.title.$error.required &amp;&amp; editingMenuForm.title.$dirty\" class=\"help-block required\">{{errorMessages.requiredMessage}}</div><div ng-show=\"editingMenuForm.title.$invalid &amp;&amp; editingMenuForm.title.$dirty\" class=\"help-block error\">{{errorMessages.isTitle}}</div></div><div class=\"form-group\"><label>CSS Classes</label><input ng-model=\"menuItem.classes\" name=\"classes\" ng-pattern=\"validators.isCSSClass\" class=\"form-control\"><div ng-show=\"editingMenuForm.classes.$error.required &amp;&amp; editingMenuForm.classes.$dirty\" class=\"help-block required\">{{errorMessages.requiredMessage}}</div><div ng-show=\"editingMenuForm.classes.$invalid &amp;&amp; editingMenuForm.classes.$dirty\" class=\"help-block error\">{{errorMessages.isCSSClass}}</div></div><div class=\"form-group\"><label>How should the link navigate?</label><select ng-model=\"menuItem.target\" class=\"form-control\"><option value=\"\">Update the current page without a refresh</option><option value=\"_self\">Reload the whole web page</option><option value=\"_blank\">Open link in a new browser tab</option></select></div></form></div><div class=\"modal-footer\"><button ng-click=\"removeMenuItem()\" ng-hide=\"isNewMenu\" class=\"btn btn-danger\">Delete</button><button type=\"submit\" ng-click=\"editMenuItem(editingMenuForm)\" ng-hide=\"isNewMenu\" ng-class=\"{disabled: editingMenuForm.$invalid}\" class=\"btn btn-success\">Save</button><button type=\"submit\" ng-click=\"newMenuItem(editingMenuForm)\" ng-class=\"{disabled: editingMenuForm.$invalid}\" class=\"btn btn-primary\">Save As New</button><button type=\"button\" ng-click=\"$dismiss()\" class=\"btn btn-default\">Close</button></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 28 */
/*!******************************************************************!*\
  !*** ./client/shared/image-selector/image-selector.directive.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @overview A gallery that allows users to select, organize, delete, and browser photos
	 * @author Jon Paul Miles <milesjonpaul@gmail.com>
	 */
	
	angular.module('meanbaseApp').directive('imageSelector', function ($cookieStore, Cropper, endpoints, $compile, $timeout, $rootScope, FileUploader, toastr, api, helpers) {
	  return {
	    templateUrl: __webpack_require__(/*! ./image-selector.jade */ 29),
	    restrict: 'EA',
	    scope: {
	      config: "=imageSelectorConfig",
	      api: "="
	    },
	    link: function link(scope, element, attrs) {
	      scope.API = {};
	
	      // Stores all interactive elements in the dom object
	      var dom = {
	        fullscreenContainer: angular.element('.fullscreen-master-container'),
	        mainFullsizeBox: angular.element('.fullsize-box.main'),
	        nextImageTag: null, //is the next image in sequence when moving right
	        previousImageTag: null //is the previous image in sequence when moving left
	      };
	
	      // This isn't site wide globals just globals to this file
	      var globals = {
	        direction: '',
	        nextImage: null,
	        previousImage: null,
	        multiple: false,
	        fullsizeImageIndex: null,
	        _fullscreenImage: null
	      };
	
	      // Creates albums or groups from all the images returned from the server
	      // only does this when directive is loaded
	      function getGroups() {
	        // Get media groups
	        scope.groups = ['all', 'selected'];
	        for (var i = 0; i < scope.media.length; i++) {
	          //Loop through each media
	          for (var x = 0; x < scope.media[i].groups.length; x++) {
	            //Loop through each group in media
	            if (scope.groups.indexOf(scope.media[i].groups[x]) === -1) {
	              //Already exists?
	              scope.groups.push(scope.media[i].groups[x]); //else add to groups array
	            }
	          }
	        }
	        if (scope.groups.indexOf(scope.selectedGroup) === -1) {
	          scope.selectedGroup = 'all';
	        }
	      }
	
	      scope.API.getAlreadySelected = function (alreadySelected) {
	        $timeout(function () {
	          scope.selectedImages = [];
	          if (alreadySelected) {
	            if (!Array.isArray(alreadySelected)) {
	              alreadySelected = [alreadySelected];
	            }
	            for (var idx = 0; idx < alreadySelected.length; idx++) {
	              if (scope.media.length > 0) {
	                for (var idx2 = 0; idx2 < scope.media.length; idx2++) {
	                  if (scope.media[idx2]._id === alreadySelected[idx]._id) {
	                    scope.selectedImages.push(scope.media[idx2]);
	                  }
	                }
	              }
	            }
	          }
	        });
	      };
	
	      // Saves changes caption, albums, and owner to the database
	      function saveImageEdits() {
	        if (!scope.fullscreenImage || !scope.fullscreenImage._id) return false;
	
	        var groupsArraysMatch = scope.fullscreenImage.groups.sort().join(',') === globals._fullscreenImage.groups.sort().join(',');
	        var galleriesArraysMatch = scope.fullscreenImage.galleries.sort().join(',') === globals._fullscreenImage.galleries.sort().join(',');
	
	        if (globals._fullscreenImage.alt === scope.fullscreenImage.alt && globals._fullscreenImage.attribute === scope.fullscreenImage.attribute && groupsArraysMatch && galleriesArraysMatch) {
	          return false;
	        }
	        api.media.update({ _id: scope.fullscreenImage._id }, scope.fullscreenImage);
	      }
	
	      // When the slider has finished it's animated slide then function the switchImages function
	      dom.mainFullsizeBox.bind('transitionend', switchImages);
	
	      function switchImages() {
	
	        // Inform our controls that we are currently moving
	        globals.transitioning = false;
	
	        // Remove the current binding since we are about to destory this element and redefine it
	        dom.mainFullsizeBox.unbind('transitionend', switchImages);
	        dom.mainFullsizeBox.remove();
	
	        if (globals.direction === 'left') {
	          // The new mainFullsizeBox is now the image that just finished sliding in
	          dom.mainFullsizeBox = dom.previousImageTag;
	
	          // Bind transitionend to this element
	          dom.mainFullsizeBox.bind('transitionend', switchImages);
	
	          // Decrease the index
	          globals.fullsizeImageIndex--;
	        } else if (globals.direction === 'right') {
	          // Repeat of above but for right instead
	          dom.mainFullsizeBox = dom.nextImageTag;
	          dom.mainFullsizeBox.bind('transitionend', switchImages);
	          globals.fullsizeImageIndex++;
	        }
	
	        // Store the image data snapshot in case we don't save our changes
	        globals._fullscreenImage = angular.copy(scope.fullscreenImage);
	      }
	
	      // Returns the image that comes before the current fullscreen image
	      function findPrevious(currentIndex) {
	        globals.previousImage = angular.element('.image-thumbnail').eq(currentIndex - 1).find('img');
	
	        if (globals.previousImage.length > 0) {
	          // Returns scope data object of image
	          return globals.previousImage.scope().item;
	        }
	        return {};
	      }
	
	      // Returns the image that comes after the current fullscreen image
	      function findNext(currentIndex) {
	
	        // Using the index of the currently viewed image, find the image that comes afterwards
	        globals.nextImage = angular.element('.image-thumbnail').eq(currentIndex + 1).find('img');
	
	        if (globals.nextImage.length > 0) {
	          // Returns scope data object of image
	          return globals.nextImage.scope().item;
	        }
	        return {};
	      }
	
	      // Find all media
	      function getMedia() {
	        api.media.find({}).success(function (media) {
	          scope.media = media;
	
	          // Take the image path from the server and choose the appropriate image to display
	          for (var i = 0; i < scope.media.length; i++) {
	            scope.media[i].thumbnail = scope.media[i].url + 'thumbnail.jpg';
	            scope.media[i].small = scope.media[i].url + 'small.jpg';
	            scope.media[i].medium = scope.media[i].url + 'medium.jpg';
	            scope.media[i].large = scope.media[i].url + 'large.jpg';
	            scope.media[i].origional = scope.media[i].url + 'origional.jpg';
	          };
	
	          getGroups();
	          scope.API.getAlreadySelected(scope.config.alreadySelected);
	        });
	      }
	
	      getMedia();
	
	      scope.$onRootScope('cms.imagesUploaded', function () {
	        getMedia();
	      });
	
	      scope.fullscreen = false;
	      scope.groups = ['all', 'selected'];
	      scope.selectedGroup = scope.groups[0];
	      scope.selectedImages = [];
	      scope.longTermSelection = [];
	      scope.shortTermSelection = [];
	
	      // Sets up fields to search by
	      scope.mediaFilter = '';
	      scope.filterMedia = function (media) {
	        return (media.url + media.alt + media.attribute + media.groups.toString()).toLowerCase().indexOf(scope.mediaFilter.toLowerCase()) >= 0;
	      };
	
	      // Filter by album or group
	      scope.filterByAlbum = function (media) {
	        if (scope.selectedGroup === 'all') return true;
	        if (scope.selectedGroup === 'selected' && scope.selectedImages.indexOf(media) > -1) {
	          return true;
	        }
	        return media.groups.indexOf(scope.selectedGroup) >= 0;
	      };
	
	      // Makes the clicked image fullsize
	      scope.expand = function ($event, image, $index) {
	        if (scope.fullscreen) {
	          return scope.exitFullscreen();
	        }
	        // Store the index position of the fullscreen image
	        globals.fullsizeImageIndex = $index;
	
	        // Set the fullscreen image to the image that was clicked on
	        scope.fullscreenImage = image;
	
	        scope.firstImageUrl = scope.fullscreenImage.small;
	
	        $compile(dom.mainFullsizeBox)(scope);
	        globals._fullscreenImage = angular.copy(scope.fullscreenImage);
	
	        scope.fullscreen = true;
	      };
	
	      // Exits fullsize image
	      scope.exitFullscreen = function () {
	        saveImageEdits();
	        scope.fullscreen = false;
	      };
	
	      // Slide to the next image
	      scope.next = function () {
	
	        // If the slider is already sliding don't run this click
	        if (globals.transitioning) return false;
	
	        // Check if we are at the end of beginning of the images and so move the currentIndex to the beginning
	        if (globals.fullsizeImageIndex >= scope.media.length - 1) {
	          globals.fullsizeImageIndex = -1;
	        }
	
	        // inform our transitionend what direction we've moved
	        globals.direction = 'right';
	
	        // Save any changes made to captions, alt, and albums
	        saveImageEdits();
	
	        // Set the new fullscreen image
	        scope.fullscreenImage = findNext(globals.fullsizeImageIndex);
	
	        // Create a new image element to the right of the current fullscreen image
	        dom.nextImageTag = angular.element('<div class="fullsize-box right"><img ng-src="' + scope.fullscreenImage.small + '" class="fullscreen-image"></div>');
	        dom.fullscreenContainer.append(dom.nextImageTag);
	        $compile(dom.nextImageTag)(scope);
	
	        // Has to go in a timeout so the '.right' class has time to set initial position
	        // That way when the 'center' class is added it will slide to the middle
	        $timeout(function () {
	          dom.nextImageTag.removeClass('right').addClass('center main');
	          dom.mainFullsizeBox.addClass('left').removeClass('main center');
	        });
	
	        globals.transitioning = true;
	      };
	
	      // Slide to the previous image
	      scope.prev = function () {
	        if (globals.transitioning) return false;
	        if (globals.fullsizeImageIndex <= 0) {
	          globals.fullsizeImageIndex = scope.media.length;
	        }
	
	        globals.direction = 'left';
	
	        saveImageEdits();
	
	        scope.fullscreenImage = findPrevious(globals.fullsizeImageIndex);
	        dom.previousImageTag = angular.element('<div class="fullsize-box left"><img ng-src="' + scope.fullscreenImage.small + '" class="fullscreen-image"></div>');
	        dom.fullscreenContainer.append(dom.previousImageTag);
	        $compile(dom.previousImageTag)(scope);
	
	        $timeout(function () {
	          dom.previousImageTag.removeClass('left').addClass('center main');
	          dom.mainFullsizeBox.addClass('right').removeClass('main center');
	        });
	
	        globals.transitioning = true;
	      };
	
	      document.onkeydown = function (e) {
	
	        // Check if keys right and left are coming from an input field or that the altKey is pressed
	        // If not then slide the slider in the appropriate direction
	        if (e.target.tagName !== 'INPUT' || e.altKey) {
	          if (e.keyCode === 37) {
	            //left
	            e.preventDefault();
	            scope.prev();
	          } else if (e.keyCode === 39) {
	            //right
	            e.preventDefault();
	            scope.next();
	          }
	        }
	      };
	
	      scope.downloadSelected = function () {
	        // Get the visibile images' urls
	        for (var i = 0; i < scope.selectedImages.length; i++) {
	          var path = scope.selectedImages[i].url + scope.selectedImages[i].filename;
	          var name = scope.selectedImages[i].url.match(/([^\/]*)\/*$/)[1];
	          helpers.downloadURI(path, name);
	        };
	      };
	
	      scope.deleteOne = function (image) {
	        // Delete image
	        if (image.url) {
	          api.media.delete({ url: image.url }).then(function () {
	            scope.fullscreen = false;
	            scope.media.splice(scope.media.indexOf(image), 1);
	          });
	        }
	      };
	
	      scope.selectImage = function (e, item) {
	        // If image is not selected
	        if (scope.selectedImages.indexOf(item) === -1) {
	          //Image is not selected
	          if (!scope.config.multiple) {
	            scope.selectedImages = [];
	          };
	          if (e.shiftKey || e.metaKey) {
	            var startingPosition = scope.media.indexOf(scope.selectedImages[scope.selectedImages.length - 1]);
	            var endingPosition = scope.media.indexOf(item);
	            if (startingPosition > -1 && endingPosition > -1) {
	              scope.selectedImages = scope.selectedImages.concat(scope.media.slice(startingPosition, endingPosition));
	            } else {
	              scope.selectedImages.push(item);
	            }
	          }
	          scope.selectedImages.push(item);
	        } else {
	          scope.selectedImages.splice(scope.selectedImages.indexOf(item), 1);
	        }
	      };
	
	      scope.allSelected = false;
	
	      scope.selectAllVisible = function ($event) {
	        if (scope.selectedImages.length >= scope.filteredMedia.length) {
	          scope.selectedImages = [];
	          scope.allSelected = false;
	        } else {
	          scope.selectedImages = [];
	          scope.selectedImages = scope.selectedImages.concat(scope.filteredMedia);
	          scope.allSelected = true;
	        }
	      };
	
	      scope.API.getSelectedImages = function () {
	        if (!scope.config.multiple) {
	          return scope.selectedImages[0];
	        } else {
	          return scope.selectedImages;
	        }
	      };
	
	      scope.deleteAllVisible = function () {
	        var urlArray = [];
	
	        // Get the visibile images' urls
	        for (var i = 0; i < scope.filteredMedia.length; i++) {
	          urlArray.push(scope.filteredMedia[i].url);
	        };
	
	        if (urlArray.length < 1) return false;
	
	        // Delete those images
	        api.media.delete({ url: { $in: urlArray } }).then(function () {
	          for (var i = 0; i < scope.filteredMedia.length; i++) {
	            scope.media.splice(scope.media.indexOf(scope.filteredMedia[i]), 1);
	          }
	        });
	      };
	
	      scope.deleteSelected = function () {
	        var urlArray = [];
	
	        // Get the visibile images' urls
	        for (var i = 0; i < scope.selectedImages.length; i++) {
	          urlArray.push(scope.selectedImages[i].url);
	        };
	
	        if (urlArray.length < 1) return false;
	
	        // Delete those images
	        api.media.delete({ url: { $in: urlArray } }).then(function () {
	          for (var i = 0; i < scope.selectedImages.length; i++) {
	            scope.media.splice(scope.media.indexOf(scope.selectedImages[i]), 1);
	          }
	        });
	      };
	
	      scope.hasToken = $cookieStore.get('token');
	      if (scope.hasToken) {
	        var uploader = scope.mediaUploader = new FileUploader({
	          url: '/api/media',
	          headers: {
	            'Authorization': 'Bearer ' + $cookieStore.get('token')
	          },
	          autoUpload: true
	        });
	      }
	
	      uploader.onCompleteAll = function () {
	        toastr.success('Images successfully saved');
	        uploader.clearQueue();
	      };
	
	      uploader.onCompleteItem = function () {
	        $rootScope.$emit('cms.imagesUploaded');
	      };
	
	      scope.groupSelected = function () {
	        var prompt = window.prompt('Album Name?');
	        var re = new RegExp("[_a-zA-Z0-9\\-\\.]+");
	
	        if (!prompt || !re.test(prompt)) return false;
	
	        var urlArray = [];
	
	        // Get the visibile images' urls
	        for (var i = 0; i < scope.selectedImages.length; i++) {
	          urlArray.push(scope.selectedImages[i].url);
	        };
	
	        if (urlArray.length < 1) return false;
	
	        // Update those images
	        api.media.update({ url: { $in: urlArray } }, { $push: { groups: prompt } }).then(function () {
	          for (var i = 0; i < scope.selectedImages.length; i++) {
	            if (scope.selectedImages[i].groups.indexOf(prompt) === -1) {
	              scope.selectedImages[i].groups.push(prompt);
	            }
	          }
	          scope.selectedGroup = prompt;
	          getGroups();
	        });
	      };
	      getMedia();
	
	      scope.ungroupSelected = function () {
	
	        var urlArray = [];
	
	        // Get the visibile images' urls
	        for (var i = 0; i < scope.selectedImages.length; i++) {
	          urlArray.push(scope.selectedImages[i].url);
	        }
	
	        if (!scope.selectedGroup || scope.selectedGroup === 'all' || scope.selectedGroup === 'selected') {
	          return false;
	        }
	        if (urlArray.length < 1) {
	          return false;
	        };
	
	        // Update those images
	        api.media.update({ url: { $in: urlArray } }, { $pull: { groups: scope.selectedGroup } }).then(function () {
	          for (var i = 0; i < scope.selectedImages.length; i++) {
	            if (scope.selectedImages[i].groups.indexOf(scope.selectedGroup) !== -1) {
	              scope.selectedImages[i].groups.splice(scope.selectedGroup, 1);
	            }
	          }
	          getGroups();
	        });
	      };
	
	      // Clean up our event listeners when we leave this page
	      scope.$on('$destroy', function () {
	        dom.mainFullsizeBox.unbind('transitionend', switchImages);
	      });
	
	      if (scope.api) {
	        scope.api = angular.extend(scope.api, scope.API);
	      }
	    }
	  };
	});

/***/ },
/* 29 */
/*!**********************************************************!*\
  !*** ./client/shared/image-selector/image-selector.jade ***!
  \**********************************************************/
/***/ function(module, exports) {

	var path = 'shared/image-selector/image-selector.jade';
	var html = "<div class=\"image-selector\"><div class=\"headbar\"><div ng-show=\"!fullscreen\"><div ng-show=\"config.allOperations\" class=\"mass-edit-buttons\"><div ng-if=\"hasToken\" class=\"import-photos\"><div title=\"Upload photos\" class=\"form-group text-center\"><input type=\"file\" nv-file-select multiple uploader=\"mediaUploader\" class=\"form-control\"></div></div><button ng-click=\"downloadSelected()\" ng-show=\"media.length &gt; 0\" class=\"btn download-selected\">Download Selected</button><button ng-click=\"deleteAllVisible()\" ng-show=\"media.length &gt; 0\" class=\"btn delete-visible\">Delete All Visible</button><button ng-click=\"deleteSelected()\" ng-show=\"media.length &gt; 0\" class=\"btn delete-selected\">Delete Selected</button><button ng-click=\"groupSelected()\" ng-show=\"media.length &gt; 0\" class=\"btn group-selected\">Group Selected</button><button ng-click=\"ungroupSelected()\" ng-show=\"media.length &gt; 0\" class=\"btn ungroup-selected\">Ungroup Selected</button></div><div ng-click=\"selectAllVisible()\" class=\"select-all pull-left\"><i ng-class=\"{\'fa-circle-o\': !allSelected, \'fa-check\': allSelected}\" class=\"fa\"></i></div><div class=\"album-left pull-left\"><select ng-options=\"group for group in groups\" ng-model=\"selectedGroup\" class=\"form-control\"></select></div><div class=\"right-leftover\"><div class=\"form-group\"><div class=\"input-group\"><div class=\"input-group-addon\"><i class=\"fa fa-search\"></i></div><input placeholder=\"Search Media\" ng-model=\"mediaFilter\" class=\"form-control\"></div></div></div></div><div ng-show=\"fullscreen\" class=\"row\"><div class=\"col-sm-12\"><div class=\"btn-spacing pull-left\"><button ng-click=\"cropMode=true\" ng-hide=\"cropMode\" class=\"btn btn-primary fa fa-crop\"> Crop</button><button ng-click=\"deleteOne(fullscreenImage)\" class=\"btn btn-danger fa fa-trash\"> Delete</button></div><i ng-click=\"exitFullscreen()\" class=\"exit-fullscreen fa fa-times pull-right\"></i></div></div></div><div class=\"body\"><div class=\"row\"><div ng-show=\"!fullscreen\" class=\"col-sm-12\"><div ng-show=\"media.length === 0\" class=\"help-block\">There are no images to show.</div><div ng-repeat=\"item in (filteredMedia = (media | filter:filterMedia| filter:filterByAlbum))\" ng-click=\"selectImage($event, item)\" class=\"image-grid-4\"><div double-click=\"expand($event, item, $index)\" class=\"image-thumbnail\"><i ng-class=\"{selected: selectedImages.indexOf(item) !== -1}\" class=\"fa fa-circle-o select-button\"></i><img ng-src=\"{{item.thumbnail}}\" ng-swipe-right=\"prev()\" ng-swipe-left=\"next()\"></div></div></div><div ng-show=\"fullscreen\" ng-swipe-right=\"prev()\" ng-swipe-left=\"next()\" ng-click=\"selectImage($event, fullscreenImage)\" class=\"col-sm-12\"><div double-click=\"expand($event, item, $index)\" class=\"fullscreen-master-container\"><i ng-class=\"{selected: selectedImages.indexOf(fullscreenImage) !== -1}\" class=\"fa fa-circle-o select-button\"></i><i ng-click=\"prev(); $event.stopPropagation();\" class=\"previous-image-button fa fa-chevron-left\"></i><i ng-click=\"next(); $event.stopPropagation();\" class=\"fa fa-chevron-right next-image-button\"></i><div class=\"fullsize-box main\"><img ng-src=\"{{firstImageUrl}}\" class=\"fullscreen-image\"></div></div></div></div></div><div ng-show=\"fullscreen\" class=\"image-details\"><div class=\"row\"><div class=\"col-sm-12\"><div validate=\"{{errorMessages.isTitle}}\" class=\"form-group has-feedback\"><div class=\"input-group\"><div class=\"input-group-addon\">Caption</div><input placeholder=\"Alt or Caption\" ng-model=\"fullscreenImage.alt\" ng-pattern=\"validators.isTitle\" class=\"form-control\"><span class=\"glyphicon glyphicon-ok form-control-feedback\"></span></div></div></div></div><div class=\"row\"><div class=\"col-sm-4\"><div validate=\"{{errorMessages.isTitle}}\" class=\"form-group has-feedback\"><div class=\"input-group\"><div title=\"Credit the author\" class=\"input-group-addon\">Citation</div><input placeholder=\"Credit to author\" ng-model=\"fullscreenImage.attribute\" ng-pattern=\"validators.isTitle\" class=\"form-control\"><span class=\"glyphicon glyphicon-ok form-control-feedback\"></span></div></div></div><div class=\"col-sm-8 text-left\"><label class=\"set-albums\">Albums</label><taglist ng-model=\"fullscreenImage.groups\"></taglist></div><div class=\"col-sm-12\"><label class=\"set-albums\">Galleries</label><taglist ng-model=\"fullscreenImage.galleries\"></taglist></div></div></div></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 30 */
/*!**************************************************!*\
  !*** ./client/shared/helpers/helpers.service.js ***!
  \**************************************************/
/***/ function(module, exports) {

	// This service contains various helper functions used in common tasks all around the CMS
	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	angular.module('meanbaseApp').service('helpers', function ($rootScope) {
	
	  var self = this;
	  // ### Convert Array to Object with Array
	  // helpers.arrayToObjectWithArray() receives an array of objects and converts them into and object of arrays with the property name being the value of the string property that was passed into `itemToBecomeProperty`
	  this.arrayToObjectWithArray = function (array, itemToBecomeProperty) {
	    if (!array || !itemToBecomeProperty) {
	      return array;
	    }
	    if (!Array.isArray(array)) {
	      array = [array];
	    }
	
	    var returnObject = {};
	    for (var ii = 0; ii < array.length; ii++) {
	
	      // Get the value of the property in `itemToBecomeProperty`
	      var specialProperty = array[ii][itemToBecomeProperty];
	      if (specialProperty) {
	
	        // If a property on the overall object with that value doesn't exist create it as an array
	        if (returnObject[specialProperty] === undefined) {
	          returnObject[specialProperty] = [];
	        }
	
	        // If the array item has it's `itemToBecomeProperty` value as an object property push this object into that property array
	        returnObject[specialProperty].push(array[ii]);
	      }
	    } //for
	
	    return returnObject;
	  };
	
	  this.hasPermission = function (permission) {
	    if ($rootScope.currentUser && $rootScope.currentUser.permissions && $rootScope.currentUser.permissions.indexOf(permission) > -1) {
	      return true;
	    }
	    return false;
	  };
	
	  this.downloadURI = function (uri, name) {
	    var link = document.createElement("a");
	    link.download = name;
	    link.href = uri;
	    link.click();
	  };
	
	  // ### Convert Array to Object
	  // helpers.arrayToObjectWithObject() receives an array of objects and converts it into an object containing objects using the property name itemToBecomeProperty. For example let say we pass in this array and the itemToBecomeProperty is `contentName`:
	
	  // **Before**
	  // ```javascript
	  // [
	  //    {"contentName":"shared","type":"panel"},
	  //    {"contentName":"yes","type":"panel"},
	  //    {"contentName":"yepper","type":"search-form"}
	  // ]```
	
	  // **After**
	  // ```javascript
	  // {
	  //    "shared":{"contentName":"shared","type":"panel"},
	  //    "yes":{"contentName":"yes","type":"panel"},
	  //    "yepper":{"contentName":"yepper","type":"search-form"}
	  //}```
	
	  // We want to use this for speed increases throughout the app so we can refer to an object by a property name instead of having to do a loop anytime we need acceess to these objects
	
	  this.arrayToObjectWithObject = function (array, itemToBecomeProperty) {
	    if (!array || !itemToBecomeProperty) {
	      return array;
	    }
	    if (!Array.isArray(array)) {
	      array = [array];
	    }
	
	    var returnObject = {};
	    for (var ii = 0; ii < array.length; ii++) {
	      var specialProperty = array[ii][itemToBecomeProperty];
	      if (specialProperty) {
	        returnObject[specialProperty] = array[ii];
	      }
	    } //for
	    return returnObject;
	  };
	
	  this.arrayToObjectWithValue = function (array, itemToBecomeProperty, itemToBecomeValue) {
	    if (!array || !itemToBecomeProperty) {
	      return array;
	    }
	    if (!Array.isArray(array)) {
	      array = [array];
	    }
	
	    var returnObject = {};
	    for (var ii = 0; ii < array.length; ii++) {
	      var specialProperty = array[ii][itemToBecomeProperty];
	      if (specialProperty) {
	        returnObject[specialProperty] = array[ii].itemToBecomeValue;
	      }
	    } //for
	    return returnObject;
	  };
	
	  // ### Convert Object to Array
	  // helpers.objectToArray() accepts an object and loops through it's properties and pushes their values into an array which is returned
	  this.objectToArray = function (data) {
	    if (!data || data === null || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
	      return data;
	    }
	    var returnArray = [];
	    for (var property in data) {
	      if (data.hasOwnProperty(property)) {
	        returnArray = returnArray.concat(data[property]);
	      }
	    }
	    return returnArray;
	  };
	
	  // ### Loop through page extensions
	  // helpers.loopThroughPageExtensions() does a for loop through all the extensions on the current page and runs a callback function on each iteration passing in the current extension being iterated on
	  this.loopThroughPageExtensions = function (fn) {
	    if (!$rootScope.page || !$rootScope.page.extensions) {
	      return false;
	    }
	    for (var property in $rootScope.page.extensions) {
	      if ($rootScope.page.extensions.hasOwnProperty(property)) {
	        for (var idx = 0; idx < $rootScope.page.extensions[property].length; idx++) {
	          var currentExtension = $rootScope.page.extensions[property][idx];
	          fn(currentExtension);
	        }
	      }
	    }
	  };
	
	  // ### Loop through site menus
	  this.loopThroughMenus = function (fn) {
	    for (var group in $rootScope.menus) {
	      if ($rootScope.menus.hasOwnProperty(group)) {
	        for (var i = 0; i < $rootScope.menus[group].length; i++) {
	          fn($rootScope.menus[group][i]);
	        }
	      }
	    }
	  };
	
	  // ### Check if object or array is empty
	  // helpers.isEmpty receives an object or array and returns true if it doesn't exist or has zero length or properties
	  this.isEmpty = function (obj) {
	    if (!obj) return true;
	    if (Array.isArray(obj)) {
	      return obj.length < 1;
	    } else if (Object.prototype.toString.call(obj) === "[object Object]") {
	      return Object.keys(obj).length === 0;
	    }
	  };
	
	  this.removeEmptyProperties = function (map) {
	    for (var key in map) {
	      if (map.hasOwnProperty(key)) {
	        if (self.isEmpty(map[key])) {
	          delete map[key];
	        }
	      }
	    }
	  };
	
	  // ### Generate Select Drop Down Options
	  // helpers.generateSelectOptions() receives an array of strings which it converts into an array of objects, each containing a label and value property. It also allows you to add functions to filter what the values of those labels and values will be. This is currently only used on the CMS comments controller to help generate the list of pages that currently have comments on them.
	  this.generateSelectOptions = function (model, labelFilter, valueFilter) {
	    var modifiedModel = [];
	    for (var i = 0; i < model.length; i++) {
	      modifiedModel[i] = {};
	      if (model[i] === 'all' || model[i].label === 'all') {
	        modifiedModel[i] = { label: 'all', value: '' };
	      } else {
	        modifiedModel[i] = { label: model[i], value: model[i] };
	        if (labelFilter) {
	          modifiedModel[i].label = labelFilter(model[i]);
	        }
	        if (valueFilter) {
	          modifiedModel[i].value = valueFilter(model[i]);
	        }
	      }
	    };
	
	    return modifiedModel;
	  };
	
	  // ###Update Position Data
	  // Draggable elements have group and position properties that identify their location on the page so the server knows which places to load the content when the page first loads. Before the page is saved or items are deleted or added we need to update those position properties.
	
	  // `draggableGroups` is an object with properties representing the group name and having an array of objects that are in that group
	  // They are in that format because we ran helpers.arrayToObjectWithArray so they would be easier to work with
	  this.updatePositionData = function (draggableGroupsObject) {
	    for (var group in draggableGroupsObject) {
	      if (draggableGroupsObject.hasOwnProperty(group)) {
	        for (var i = 0; i < draggableGroupsObject[group].length; i++) {
	          draggableGroupsObject[group][i].group = group;
	          draggableGroupsObject[group][i].position = i;
	        }
	      }
	    }
	    return draggableGroupsObject;
	  };
	});

/***/ },
/* 31 */
/*!**********************************************************!*\
  !*** ./client/shared/findImages/findImages.directive.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// This directive popups up a modal to select images by
	// It returns the selected images using the provided callback found-callback="functionName"
	// A gallerySlug string must be passed into the find-images attribute
	
	angular.module('meanbaseApp').directive('findImagesFor', function ($rootScope, endpoints, $parse, $timeout) {
	  return {
	    templateUrl: __webpack_require__(/*! ./findImages.jade */ 32),
	    restrict: 'A',
	    replace: true,
	    scope: {
	      findImagesFor: "@",
	      multiple: "@"
	    },
	    link: function link(scope, element, attrs) {
	
	      scope.imageSelectorApi = {};
	
	      scope.allOperations = true;
	
	      var areChanges = false; //Used to detect if different images were selected and loaded into the gallery
	      scope.titleDirections = 'Select Image';
	
	      attrs.$observe('multiple', function () {
	        scope.multiple = scope.$eval(attrs.multiple);
	        if (scope.multiple === undefined) {
	          delete scope.multiple;
	        } else if (scope.multiple === true) {
	          scope.titleDirections = 'Select Images';
	        }
	      });
	
	      // If a gallery slug was passed into find-images-for="" then use it when emitting events else use meanbase-gallery
	      scope.gallerySlug = attrs.findImagesFor || 'meanbase-gallery';
	
	      // If the overlay was closed while saving then send the chosen images back to the requester and remember the selection that was just made
	      scope.chooseImages = function () {
	        var selectedImages = scope.imageSelectorApi.getSelectedImages();
	        $rootScope.$emit('cms.choseImages', { gallerySlug: scope.gallerySlug, images: selectedImages });
	        scope.imageSelectorApi.rememberSelection();
	        areChanges = true;
	      };
	
	      // If the overlay is closed without saving selection resort back to selection before overlay was opened
	      scope.close = function () {
	        scope.imageSelectorApi.forgetSelection();
	        // areChanges should stay as it is because we forget the selection and no change to the gallery is made
	      };
	
	      // When the save button is hit on the cms headbar have image-selector add the gallery slug to the selected images
	      scope.$onRootScope('cms.saveEdits', function () {
	        if (areChanges) {
	          scope.imageSelectorApi.publishSelected();
	          areChanges = false;
	        }
	      });
	
	      // If the discard button is hit on the cms headbar have image-selector reset the gallery images and
	      scope.$onRootScope('cms.discardEdits', function () {
	        if (areChanges) {
	          var selectedImages = scope.imageSelectorApi.getInitialImages();
	          $rootScope.$emit('cms.choseImages', { gallerySlug: scope.gallerySlug, images: selectedImages });
	          areChanges = false;
	        }
	      });
	
	      /*
	      *
	      * Codrops Button Morph Affect
	      *
	      */
	      function morphButtonAffect() {
	        var docElem = window.document.documentElement,
	            didScroll,
	            scrollPosition;
	
	        // trick to prevent scrolling when opening/closing button
	        function noScrollFn() {
	          window.scrollTo(scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0);
	        }
	
	        function noScroll() {
	          window.removeEventListener('scroll', scrollHandler);
	          window.addEventListener('scroll', noScrollFn);
	        }
	
	        function scrollFn() {
	          window.addEventListener('scroll', scrollHandler);
	        }
	
	        function canScroll() {
	          window.removeEventListener('scroll', noScrollFn);
	          scrollFn();
	        }
	
	        function scrollHandler() {
	          if (!didScroll) {
	            didScroll = true;
	            setTimeout(function () {
	              scrollPage();
	            }, 60);
	          }
	        };
	
	        function scrollPage() {
	          scrollPosition = { x: window.pageXOffset || docElem.scrollLeft, y: window.pageYOffset || docElem.scrollTop };
	          didScroll = false;
	        };
	
	        scrollFn();
	
	        // var el = document.querySelector( '.morph-button' );
	        var el = element[0];
	
	        new UIMorphingButton(element[0], {
	          closeEl: '.icon-close',
	          onBeforeOpen: function onBeforeOpen() {
	            // don't allow to scroll
	            noScroll();
	          },
	          onAfterOpen: function onAfterOpen() {
	            // can scroll again
	            canScroll();
	            document.body.classList.add('noscroll');
	            element[0].classList.add('scroll');
	          },
	          onBeforeClose: function onBeforeClose() {
	            // remove class "noscroll" to body
	            document.body.classList.remove('noscroll');
	            element[0].classList.remove('scroll');
	
	            // don't allow to scroll
	            noScroll();
	          },
	          onAfterClose: function onAfterClose() {
	            // can scroll again
	            canScroll();
	          }
	        });
	      }
	
	      morphButtonAffect();
	    } // link
	  }; // return
	}); //directive

/***/ },
/* 32 */
/*!**************************************************!*\
  !*** ./client/shared/findImages/findImages.jade ***!
  \**************************************************/
/***/ function(module, exports) {

	var path = 'shared/findImages/findImages.jade';
	var html = "<div class=\"morph-button morph-button-overlay morph-button-fixed\"><button type=\"button\"><i class=\"fa fa-image fa-lg\">{{titleDirections}}</i></button><div class=\"morph-content\"><div><div class=\"content-style-overlay\"><button ng-click=\"chooseImages()\" class=\"btn btn-warning btn-lg choose-images-button icon-close\">{{titleDirections}}</button><i ng-click=\"close()\" class=\"fa fa-times fa-2x escape pull-right icon-close\"></i><image-selector multiple=\"multiple\" api=\"imageSelectorApi\" gallery-slug=\"gallerySlug\" all-operations=\"allOperations\"></image-selector></div></div></div></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 33 */
/*!************************************************************************!*\
  !*** ./client/shared/find-images-modal/find-images-modal.directive.js ***!
  \************************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').directive('findImagesModal', function ($rootScope) {
	  return {
	    // templateUrl: 'components/find-images-modal/find-images-modal.html',
	    restrict: 'EA',
	    scope: true,
	    link: function link(scope, element, attrs) {
	      var config = scope.findImagesConfig;
	      element.bind('click', function () {
	        // openImageModal is defined in main.controller
	        $rootScope.openImageModal(config, function (selectedImages) {
	          $rootScope.$emit('cms.choseImages', { gallerySlug: config.gallerySlug, images: selectedImages });
	        });
	      });
	    }
	  };
	});

/***/ },
/* 34 */
/*!**************************************************************!*\
  !*** ./client/shared/fallback-src/fallback-src.directive.js ***!
  \**************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').directive('fallbackSrc', function () {
	  return {
	    template: '<div></div>',
	    restrict: 'EA',
	    link: function link(scope, element, attrs) {
	      if (attrs.fallbackSrc) {
	        element.bind('error', function () {
	          angular.element(this).attr("src", attrs.fallbackSrc);
	        });
	      }
	    }
	  };
	});

/***/ },
/* 35 */
/*!**************************************************************************!*\
  !*** ./client/shared/extensions-selector/extensions.modal.controller.js ***!
  \**************************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').controller('extensions.modal.controller', function ($scope, endpoints, $modalInstance, $timeout) {
		$scope.chosenContent = [];
	
		$scope.searchExtensions = {};
		$scope.findShared = '';
	
		$scope.chooseExtensions = function () {
			if ($scope.chosenContent.length < 1) {
				return false;
			}
			$modalInstance.close($scope.chosenContent);
		};
	
		// Declaring event listeners is generally bad practice in controllers, but in this case the listener needs to be created and deleted with the controller and must be applied to the document
		document.onkeydown = function (evt) {
			evt = evt || window.event;
			if (evt.keyCode === 13) {
				//13 === enter key
				$scope.chooseExtensions();
			}
		};
	
		$scope.toggleChecked = function (content, $event) {
			if (!content) {
				return false;
			}
	
			// Check if the object is already in chosenContent and if so grab it's index (because we are going to remove it)
			var alreadySelected = -1;
			for (var i = 0; i < $scope.chosenContent.length; i++) {
				if ($scope.chosenContent[i]._id === content._id) {
					alreadySelected = i;
				}
			};
			if (alreadySelected > -1) {
				$scope.chosenContent.splice(alreadySelected, 1);
				angular.element($event.currentTarget).find('.checkbox').removeClass('fa-check').addClass('fa-square-o');
			} else {
				var content2;
				if (content.type) {
					for (i = 0; i < $scope.extensions.length; i++) {
						if ($scope.extensions[i].name === content.type) {
							var extension = angular.copy($scope.extensions[i]);
							content = angular.copy(content);
							extension.contentName = content.contentName;
							extension.name = content.type;
							content2 = angular.extend(extension, content);
						}
					};
				} else {
					content2 = content;
				}
				if (content2) {
					content = content2;
					$scope.chosenContent.push(content);
					angular.element($event.currentTarget).find('.checkbox').addClass('fa-check').removeClass('fa-square-o');
				}
			}
		};
	
		// Cleans up document enter listener
		$scope.$on('$destroy', function () {
			document.onkeydown = null;
		});
	});

/***/ },
/* 36 */
/*!****************************************************************************!*\
  !*** ./client/shared/extensions-selector/extensions-selector.directive.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	angular.module('meanbaseApp').directive('extensionsSelector', function (endpoints, $modal, $rootScope, $timeout) {
	  return {
	    templateUrl: __webpack_require__(/*! ./extensions-selector.jade */ 37),
	    restrict: 'A',
	    link: function link(scope, element, attrs) {
	      var modalInstance;
	      scope.openModal = function () {
	        modalInstance = $modal.open({
	          templateUrl: __webpack_require__(/*! ./extensions.modal.jade */ 38),
	          controller: 'extensions.modal.controller',
	          size: 'md'
	        });
	
	        modalInstance.result.then(function (chosenExtensions) {
	          if (!$rootScope.page || !$rootScope.page.url || !chosenExtensions || attrs.extensionsSelector < 1) {
	            return false;
	          }
	          if (!$rootScope.page.extensions[attrs.extensionsSelector]) {
	            $rootScope.page.extensions[attrs.extensionsSelector] = [];
	          }
	          var extensionsResponse = [];
	          for (var i = 0; i < chosenExtensions.length; i++) {
	            var extension = {
	              group: attrs.extensionsSelector,
	              position: $rootScope.page.extensions[attrs.extensionsSelector].length - 1 < 0 ? 0 : $rootScope.page.extensions[attrs.extensionsSelector].length - 1,
	              text: chosenExtensions[i].text,
	              contentName: chosenExtensions[i].contentName,
	              name: chosenExtensions[i].name,
	              config: chosenExtensions[i].config,
	              data: chosenExtensions[i].data
	            };
	            extensionsResponse.push(extension);
	          };
	
	          $rootScope.page.extensions[attrs.extensionsSelector] = $rootScope.page.extensions[attrs.extensionsSelector].concat(extensionsResponse);
	
	          modalInstance = null;
	        });
	      };
	    }
	  };
	});

/***/ },
/* 37 */
/*!********************************************************************!*\
  !*** ./client/shared/extensions-selector/extensions-selector.jade ***!
  \********************************************************************/
/***/ function(module, exports) {

	var path = 'shared/extensions-selector/extensions-selector.jade';
	var html = "<button ng-click=\"openModal()\" ng-if=\"$root.editMode\" class=\"btn btn-success btn-block\"><i class=\"fa fa-plus fa-lg\"></i></button>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 38 */
/*!*****************************************************************!*\
  !*** ./client/shared/extensions-selector/extensions.modal.jade ***!
  \*****************************************************************/
/***/ function(module, exports) {

	var path = 'shared/extensions-selector/extensions.modal.jade';
	var html = "<div id=\"extensions-modal\" class=\"extensions-selector\"><div class=\"modal-header\"><button ng-click=\"$dismiss()\" class=\"close\"><span aria-hidden=\"true\">×</span><span class=\"sr-only\">Close</span></button><h4 class=\"modal-title\"><i class=\"fa fa-plus fa-lg\"> </i> Choose Content</h4></div><div class=\"modal-body\"><tabset justified=\"true\"><tab heading=\"Choose new content\"><div class=\"extensions-selector\"><div class=\"form-group\"><div class=\"input-group\"><div class=\"input-group-addon\"><i class=\"fa fa-search\"></i></div><input type=\"text\" placeholder=\"search content\" ng-model=\"searchExtensions.name\" class=\"form-control\"></div></div><div class=\"extensions-list scrollable-body\"><div ng-repeat=\"ext in extensions | filter:searchExtensions\" ng-click=\"toggleChecked(ext, $event)\" class=\"list-item\"><img ng-src=\"{{ext.screenshot}}\" class=\"list-image\"><h4 class=\"list-title\">{{ext.name}}</h4><i ng-class=\"{\'fa-check\': chosenContent.indexOf(ext) &gt; -1, \'fa-square-o\': chosenContent.indexOf(ext) == -1}\" class=\"fa checkbox\"></i></div></div></div></tab><tab heading=\"Choose from existing content\"><div class=\"extensions-selector\"><div class=\"form-group\"><div class=\"input-group\"><div class=\"input-group-addon\"><i class=\"fa fa-search\"></i></div><input type=\"text\" placeholder=\"search existing content\" ng-model=\"findShared\" class=\"form-control\"></div></div><div class=\"scrollable-body\"><div ng-repeat=\"(key, content) in sharedContent\" ng-click=\"toggleChecked(content, $event)\" ng-hide=\"content.contentName.indexOf(findShared) &amp;&amp; content.type.indexOf(findShared)\" class=\"list-item\"><h4 class=\"list-title\">{{content.type}}: {{content.contentName}}</h4><i class=\"fa pull-right checkbox fa-square-o\"></i></div></div></div></tab></tabset></div><div class=\"modal-footer\"><button type=\"button\" ng-click=\"chooseExtensions()\" class=\"btn btn-success\">Choose</button><button type=\"button\" ng-click=\"$dismiss()\" class=\"btn btn-default\">Close</button></div></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 39 */
/*!********************************************************************!*\
  !*** ./client/shared/extensions-area/extensions-area.directive.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	angular.module('meanbaseApp').directive('extensionsArea', function ($rootScope) {
	  return {
	    templateUrl: __webpack_require__(/*! ./extensions-area.jade */ 40),
	    restrict: 'A',
	    scope: true,
	    link: function link(scope, element, attrs) {
	      if (attrs.extensionsArea) {
	        scope.removeThisExtension = scope.$parent.removeThisExtension;
	        scope.areaName = attrs.extensionsArea || 'extensions-1';
	        if (!$rootScope.page.extensions[scope.areaName]) {
	          $rootScope.page.extensions[scope.areaName] = [];
	        }
	      }
	    }
	  };
	});

/***/ },
/* 40 */
/*!************************************************************!*\
  !*** ./client/shared/extensions-area/extensions-area.jade ***!
  \************************************************************/
/***/ function(module, exports) {

	var path = 'shared/extensions-area/extensions-area.jade';
	var html = "<div ng-sortable=\"sortableExtensions\" ng-class=\"{\'mb-drag-to-room\': editMode &amp;&amp; page.extensions[areaName].length === 0}\"><div ng-repeat=\"extension in page.extensions[areaName]\" dynamic-html=\"extension.text\" ng-class=\"{\'mb-draggable\': editMode}\"><div ng-show=\"editMode\" class=\"universal-extension-edit-buttons\"><div class=\"form-group\"><div class=\"input-group\"><div class=\"input-group-addon\">Name</div><input type=\"text\" placeholder=\"What is the shared name for this content?\" ng-model=\"extension.contentName\" ng-pattern=\"validators.isTitle\" class=\"form-control\"></div></div><button ng-click=\"removeThisExtension(extension)\" class=\"btn btn-danger remove-extension-button\"><i class=\"fa fa-trash fa-lg\"> </i> Delete</button></div></div></div><div extensions-selector=\"{{areaName}}\"></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 41 */
/*!******************************************************!*\
  !*** ./client/shared/endpoints/endpoints.service.js ***!
  \******************************************************/
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * @overview 	A sevice that sends get, post, put, and delete requests to the server through http. Allows raw mongoDB queries to be passed to the server. The user creates a new instance of the endpoints service providing an endpoint url to reach and calls api methods on that instance.
	 * @author Jon Paul Miles <milesjonpaul@gmail.com>
	 * @version 1.0.0
	 * @license MIT
	 * @example `var menus = new endpoints('menus');  
	 * var replaceMenu = {
	 * 	url: '/new-url', 
	 * 	classes: 'another-class', 
	 * 	target:'_self'
	 * };
	 * //Pass in raw mongoDB queries
	 * menus.update({url: '/about'}, replaceMenu).success(cb);`
	 */
	
	(function () {
		angular.module('meanbaseApp').factory('endpoints', function ($http, toastr) {
	
			/**
	   * Sets up a rest endpoint for the given url so create, find, update, and delete can be performed on it. Calls generic error handler `errorHandler()` if error.
	   * @constructor
	   * @param  {string} endpoint The URL of the server endpoint to reach. `/api/` prefix is already assumed.
	   * @return {nothing}
	   */
			function endpoints(endpoint) {
				this.endpoint = endpoint || '';
	
				if (endpoint.indexOf('http://') > -1 || endpoint.indexOf('https://') > -1) {
					this.url = endpoint; // If the url is a full address then don't modify it
				} else {
					// else prefix it with /api/ so it calls our server api
					this.url = '/api/' + this.endpoint;
				}
			}
	
			/**
	   * Adds content in the server database for the endpoint passed into the constructor function. Calls generic error handler `errorHandler()` if error.
	   * @param  {object} content the item to be added to the database
	   * @return {promise}         An object or array of items that were created
	   */
			endpoints.prototype.create = function (content) {
				var self = this;
				return $http.post(this.url, content).error(function (data, status, headers, config) {
					self.errorHandler(data, status, headers, config);
				});
			};
	
			/**
	   * Gets data matching the query. Calls generic error handler `errorHandler()` if error.
	   * @param  {object} identifier Raw mongoDB query
	   * @return {promise}            An object or array of items matching the query
	   */
			endpoints.prototype.find = function (identifier) {
				var self = this;
				return $http.get(this.url, { params: { where: identifier } }).error(function (data, status, headers, config) {
					self.errorHandler(data, status, headers, config);
				});
			};
	
			/**
	   * Updates data in the server database identified with a mongoDB query with the replacement data passed in. Calls generic error handler `errorHandler()` if error.
	   * @param  {object} identifier  Raw mongoDB query
	   * @param  {object} replacement Whatever data you want to replace the found data with
	   * @return {promise}             Number of items that were updated
	   */
			endpoints.prototype.update = function (identifier, replacement) {
				var self = this;
				return $http.put(this.url, { identifier: identifier, replacement: replacement }).error(function (data, status, headers, config) {
					self.errorHandler(data, status, headers, config);
				});
			};
	
			/**
	   * Deletes data from the server database that matches the mongoDB query passed in. Calls generic error handler `errorHandler()` if error.
	   * @param  {object} identifier Raw mongoDB query
	   * @return {promise}            http response object
	   */
			endpoints.prototype.delete = function (identifier) {
				var self = this;
				return $http.delete(this.url, {
					params: { where: identifier },
					headers: { "Content-Type": "application/json;charset=utf-8" }
				}).error(function (data, status, headers, config) {
					self.errorHandler(data, status, headers, config);
				});
			};
	
			/**
	   * Returns one item from the server that has the mongoDB _id passed in. Calls generic error handler `errorHandler()` if error.
	   * @param  {string} id The _id value of the object to retrieve
	   * @return {promise}    Object that has that id
	   */
			endpoints.prototype.findOne = function (id) {
				var self = this;
				return $http.get(this.url + '/' + id).error(function (data, status, headers, config) {
					self.errorHandler(data, status, headers, config);
				});
			};
	
			/**
	   * Updates one item in the database that has the _id passed in with the information in replacement. Calls generic error handler `errorHandler()` if error.
	   * @param  {string} id          The `_id` of the mongoDB object
	   * @param  {object} replacement The content to replace the found object with
	   * @return {promise}             Number of items replaced
	   */
			endpoints.prototype.updateOne = function (id, replacement) {
				var self = this;
				return $http.put(this.url + '/' + id, replacement).error(function (data, status, headers, config) {
					self.errorHandler(data, status, headers, config);
				});
			};
	
			/**
	   * Deletes one item from the server database that has the _id that was passed in. Calls generic error handler `errorHandler()` if error.
	   * @param  {string} id The _id of the mongoDB object to delete
	   * @return {promise}    http response object
	   */
			endpoints.prototype.deleteOne = function (id) {
				var self = this;
				return $http.delete(this.url + '/' + id).error(function (data, status, headers, config) {
					self.errorHandler(data, status, headers, config);
				});
			};
	
			/**
	  * Generic error handler as a catch all. Tests that an html page didn't return. If so it prints out a console.log with the error. If the error is a mongoose validation error then it prints out the value of the property that was invalid in a toastr.  Otherwise we give a generic response saying the server is having trouble with... the 'menus' or whatever endpoint was passed in. If the server does return an html page then we just say the server is having trouble with the particular endpoint
	  * @param  {object|array} data    Response from the server
	  * @param  {Number} status  Status Code received from server
	  * @param  {[type]} headers Headers received from server
	  * @param  {object} config  Describes the request made to the server
	  * @return {nothing}
	  */
			endpoints.prototype.errorHandler = function (data, status, headers, config) {
				var category = this.endpoint;
				if (!/<[a-z][\s\S]*>/i.test(data)) {
					console.log('Server API call to "' + category + '" failed. ', data);
					var response = '';
					if (data.message && data.message === 'Validation failed') {
						for (var field in data.errors) {
							if (data.errors.hasOwnProperty(field)) {
								if (data.errors[field].value && data.errors[field].value.length < 50) {
									response += data.errors[field].value + ' is invalid.';
								}
							}
						}
						toastr.warning("Some of the form information was invalid. " + response);
					} else {
						toastr.error('Hmmmm, the server is having trouble with the ' + category + '.');
					}
				} else {
					console.log('api request error.');
					if (status !== 404) {
						toastr.error('Hmmmm, there server is having trouble with the ' + category + '.');
					}
				}
			};
	
			return endpoints;
		});
	})();

/***/ },
/* 42 */
/*!**************************************************************!*\
  !*** ./client/shared/dynamic-html/dynamic-html.directive.js ***!
  \**************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').directive('dynamicHtml', function ($compile) {
	  return {
	    restrict: 'A',
	    link: function link(scope, element, attrs) {
	      scope.$watch(attrs.dynamicHtml, function (html) {
	        element.prepend(html);
	        $compile(element.contents())(scope);
	      });
	    }
	  };
	});

/***/ },
/* 43 */
/*!************************************************************!*\
  !*** ./client/shared/doubleClick/doubleClick.directive.js ***!
  \************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').directive('doubleClick', function ($timeout) {
	
	  var CLICK_DELAY = 250;
	  var $ = angular.element;
	
	  return {
	    priority: 1, // run before event directives
	    restrict: 'A',
	    link: function link(scope, element, attrs) {
	      var clickCount = 0;
	      var clickTimeout;
	
	      function doubleClick(e) {
	        e.preventDefault();
	        e.stopImmediatePropagation();
	        $timeout.cancel(clickTimeout);
	        clickCount = 0;
	        scope.$apply(function () {
	          scope.$eval(attrs.doubleClick);
	        });
	      }
	
	      function singleClick(clonedEvent) {
	        clickCount = 0;
	        if (attrs.ngClick) scope.$apply(function () {
	          scope.$eval(attrs.ngClick);
	        });
	        if (clonedEvent) element.trigger(clonedEvent);
	      }
	
	      function delaySingleClick(e) {
	        var clonedEvent = $.Event('click', e);
	        clonedEvent._delayedSingleClick = true;
	        e.preventDefault();
	        e.stopImmediatePropagation();
	        clickTimeout = $timeout(singleClick.bind(null, clonedEvent), CLICK_DELAY);
	      }
	
	      element.bind('click', function (e) {
	        if (e._delayedSingleClick) return;
	        if (clickCount++) doubleClick(e);else delaySingleClick(e);
	      });
	    }
	  };
	});

/***/ },
/* 44 */
/*!*************************************************************!*\
  !*** ./client/shared/cms.headbar/cms.headbar.controller.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	(function () {
		angular.module('meanbaseApp').controller('cms.headbar.controller', HeadbarController);
	
		// @ngInject
		function HeadbarController($scope, $rootScope, endpoints, $state, $location, $modal, $timeout, helpers, toastr, api) {
			$scope.themeTemplates = Object.getOwnPropertyNames(window.meanbaseGlobals.themeTemplates);
			var self = this;
	
			//  ###editMode
			// The big daddy power house **editMode**! This variable is used all throughout the app to enable edits to be made on the content. We don't want this to be true until we hit the edit button in the admin top menu.
			$rootScope.editMode = false;
	
			// Used to disable navigation while in edit mode
			$scope.ableToNavigate = true;
	
			// Prevent the user from navigating away while in edit mode until they save or discard their changes.
			$scope.$onRootScope('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
				if (!$scope.ableToNavigate) {
					event.preventDefault();
					toastr.info('Please save or discard your changes before navigating.');
				}
			});
	
			// Toggles the all powerful editMode, emits an event so the rest of the app can make changes
			this.toggleEdit = function (boole) {
				if (boole !== undefined) {
					$rootScope.editMode = boole;
				} else {
					$rootScope.editMode = !$rootScope.editMode;
				}
				$rootScope.$emit('cms.editMode', $rootScope.editMode);
	
				// We want to disable navigation while in edit mode, so the user doesn't accidently click away and loose their changes
				$scope.ableToNavigate = !$rootScope.editMode;
			};
	
			// Creates a new page and prompts the user for a url
			this.createPage = function (e) {
				// Prepare new page default text based on url
				var url = prompt('url');
				if (url === null) {
					return false;
				}
				this.toggleEdit(false);
				// Prepares some default values for the page
				prepareDefaultPage(url, e);
			};
	
			// This opens the modal for changing page properties such as tabTitle and page description.
			this.editPageModal = function () {
				var modalInstance = $modal.open({
					templateUrl: __webpack_require__(/*! ./editmodal.modal.jade */ 45),
					controller: function controller($scope, $modalInstance) {
						$scope.cancel = function () {
							$modalInstance.dismiss('cancel');
						};
					},
					size: 'md'
				});
			};
	
			this.saveChanges = function () {
				this.toggleEdit();
				// This event calls the edit directive to save it's values and the main.controller to erase and rewrite all the menus
				$rootScope.$emit('cms.saveEdits', $rootScope.page);
			};
	
			this.discardChanges = function () {
				this.toggleEdit();
	
				// Event event that alerts all editable parts to discard those changes including the edit directive
				$rootScope.$emit('cms.discardEdits');
			};
	
			this.deletePage = function () {
				this.toggleEdit();
				if (!$rootScope.page._id) {
					return false;
				}
	
				// Delete page
				api.pages.delete({ _id: $rootScope.page._id }).then(function () {
					// Delete menu with the same url
					var url;
					if ($rootScope.page.url.charAt(0) !== '/') {
						url = '/' + $rootScope.page.url;
					} else {
						url = $rootScope.page.url;
					}
					api.menus.delete({ url: url }).finally(function () {
						// Replenish menus
						api.menus.find({}).success(function (response) {
							$rootScope.menus = response;
						});
					});
	
					$location.url('/');
				});
			};
	
			this.togglePublishPage = function () {
				if (!$rootScope.page._id) {
					return false;
				}
				$rootScope.page.published = !$rootScope.page.published;
				var pageUrl = $rootScope.page.url;
				if ($rootScope.page.url.charAt(0) !== '/') {
					pageUrl = '/' + pageUrl;
				}
				helpers.loopThroughMenus(function (item) {
					if (item.url === pageUrl) {
						item.published = $rootScope.page.published;
					}
				});
				if ($rootScope.page.published) {
					toastr.clear();
					toastr.success('Visitors can now see this page.');
				} else {
					toastr.warning('Only users with permission to edit pages can see this page.');
				}
	
				this.toggleEdit();
				$rootScope.$emit('cms.saveEdits', $rootScope.page);
			};
	
			this.currentScreenshot = null;
	
			this.showScreenshot = function (template) {
				if (!window.meanbaseGlobals.themeTemplatePaths[template]) {
					return false;
				}
				var screenshot = window.meanbaseGlobals.themeTemplatePaths[template].screenshot;
				if (screenshot) {
					this.currentScreenshot = document.createElement("div");
					this.currentScreenshot.classList.add('template-screenshot-backdrop');
					var image = new Image();
					image.src = screenshot;
					image.onerror = function () {
						self.hideScreenshot(template);
					};
					image.alt = template + ' screenshot';
					image.classList.add('template-screenshot');
					this.currentScreenshot.appendChild(image);
					document.body.appendChild(this.currentScreenshot);
				}
			};
	
			this.hideScreenshot = function (template) {
				if (this.currentScreenshot) {
					document.body.removeChild(this.currentScreenshot);
				}
			};
	
			function prepareDefaultPage(url, e) {
				// Prepare page default text based on url
				url = url.replace(/[ ]/g, "-");
				var menuTitle = url.replace(/[_-]/g, " ");
				var placeholderTitle = menuTitle.replace(/(^| )(\w)/g, function (x) {
					return x.toUpperCase();
				});
				if (url.charAt(0) == '/') {
					placeholderTitle = url.substr(1);
				} else {
					url = '/' + url;
				}
	
				// Prepare the template
				var newPage = {
					author: $scope.currentUser.name,
					editability: $scope.currentUser.role,
					visibility: $scope.currentUser.role,
					url: url,
					tabTitle: placeholderTitle,
					template: $(e.currentTarget).text(),
					title: placeholderTitle,
					summary: "Summary of " + placeholderTitle + ".",
					description: "The description that will show up on facebook feeds and google searches.",
					updated: Date.now()
				};
	
				var newMenu = {
					title: menuTitle,
					url: url,
					location: 'main',
					position: $scope.menus.main.length,
					classes: '',
					target: '',
					published: false
				};
	
				// Save new page to database and reroute to it's new url
				api.pages.create(newPage).then(function (response) {
					// Save new menu to database
					api.menus.create(newMenu).then(function (response) {
						$scope.menus.main.push(newMenu);
					});
					$timeout(function () {
						$location.url(url);
					}, 0, false);
				});
			}
		}
	})();

/***/ },
/* 45 */
/*!********************************************************!*\
  !*** ./client/shared/cms.headbar/editmodal.modal.jade ***!
  \********************************************************/
/***/ function(module, exports) {

	var path = 'shared/cms.headbar/editmodal.modal.jade';
	var html = "<div class=\"modal-header\"><button type=\"button\" ng-click=\"cancel()\" class=\"close\"><span aria-hidden=\"true\">×</span><span class=\"sr-only\">Close</span></button><h4 class=\"modal-title\">Page Settings</h4></div><div class=\"modal-body\"><div validate=\"{{errorMessages.isTitle}}\" class=\"form-group has-feedback\"><label>Google Search Title</label><input type=\"text\" ng-model=\"page.tabTitle\" ng-pattern=\"validators.isTitle\" class=\"form-control\"><span class=\"glyphicon glyphicon-ok form-control-feedback\"></span></div><div validate=\"{{errorMessages.URI}}\" class=\"form-group has-feedback\"><label>URL address</label><div class=\"input-group\"><span class=\"input-group-addon\">/</span><input type=\"text\" ng-model=\"page.url\" ng-pattern=\"validators.isURI\" class=\"form-control\"><span class=\"glyphicon glyphicon-ok form-control-feedback\"></span></div></div><div class=\"form-group\"><label>Facebook and Google Page Description</label><textarea rows=\"5\" ng-model=\"page.description\" class=\"form-control\"></textarea></div><div class=\"row\"><div class=\"col-sm-6\"><p class=\"h5\">Created</p><p>{{page.created}}</p></div><div class=\"col-sm-6\"><p class=\"h5\">Updated</p><p>{{page.updated}}</p></div></div></div><div class=\"modal-footer\"><div class=\"col-sm-9\"><p class=\"h6 text-left\">(The headbar save and discard buttons will store changes)</p></div><div class=\"col-sm-3\"><button type=\"button\" ng-click=\"cancel()\" class=\"btn btn-default\">Close</button></div></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 46 */
/*!***************************************************************!*\
  !*** ./client/shared/camel-to-human/camel-to-human.filter.js ***!
  \***************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').filter('camelToHuman', function () {
	  return function (input) {
	    return input.charAt(0).toLowerCase() + input.substr(1).replace(/[A-Z]/g, function (x) {
	      return ' ' + x.toLowerCase();
	    });
	  };
	});

/***/ },
/* 47 */
/*!********************************************!*\
  !*** ./client/shared/auth/user.service.js ***!
  \********************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').factory('User', function ($resource) {
	  return $resource('/api/users/:id/:controller', {
	    id: '@_id'
	  }, {
	    changePassword: {
	      method: 'PUT',
	      params: {
	        controller: 'password'
	      }
	    },
	    get: {
	      method: 'GET',
	      params: {
	        id: 'me'
	      }
	    }
	  });
	});

/***/ },
/* 48 */
/*!********************************************!*\
  !*** ./client/shared/auth/auth.service.js ***!
  \********************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
	  var currentUser = {};
	  if ($cookieStore.get('token')) {
	    currentUser = User.get();
	  }
	
	  return {
	
	    /**
	     * Authenticate user and save token
	     *
	     * @param  {Object}   user     - login info
	     * @param  {Function} callback - optional
	     * @return {Promise}
	     */
	    login: function login(user, callback) {
	      var cb = callback || angular.noop;
	      var deferred = $q.defer();
	
	      $http.post('/auth/local', {
	        email: user.email,
	        password: user.password
	      }).success(function (data) {
	        $rootScope.isLoggedIn = true;
	        $cookieStore.put('token', data.token);
	        currentUser = User.get();
	        deferred.resolve(data);
	        return cb();
	      }).error(function (err) {
	        this.logout();
	        deferred.reject(err);
	        return cb(err);
	      }.bind(this));
	
	      return deferred.promise;
	    },
	
	    /**
	     * Delete access token and user info
	     *
	     * @param  {Function}
	     */
	    logout: function logout() {
	      $cookieStore.remove('token');
	      currentUser = {};
	      $rootScope.isLoggedIn = false;
	    },
	
	    /**
	     * Create a new user
	     *
	     * @param  {Object}   user     - user info
	     * @param  {Function} callback - optional
	     * @return {Promise}
	     */
	    createUser: function createUser(user, callback) {
	      var cb = callback || angular.noop;
	
	      return User.save(user, function (data) {
	        $cookieStore.put('token', data.token);
	        currentUser = User.get();
	        $rootScope.isLoggedIn = true;
	        return cb(user);
	      }, function (err) {
	        this.logout();
	        return cb(err);
	      }.bind(this)).$promise;
	    },
	
	    /**
	     * Change password
	     *
	     * @param  {String}   oldPassword
	     * @param  {String}   newPassword
	     * @param  {Function} callback    - optional
	     * @return {Promise}
	     */
	    changePassword: function changePassword(oldPassword, newPassword, callback) {
	      var cb = callback || angular.noop;
	
	      return User.changePassword({ id: currentUser._id }, {
	        oldPassword: oldPassword,
	        newPassword: newPassword
	      }, function (user) {
	        return cb(user);
	      }, function (err) {
	        return cb(err);
	      }).$promise;
	    },
	
	    /**
	     * Gets all available info on authenticated user
	     *
	     * @return {Object} user
	     */
	    getCurrentUser: function getCurrentUser() {
	      return currentUser;
	    },
	
	    /**
	     * Check if a user is logged in
	     *
	     * @return {Boolean}
	     */
	    isLoggedIn: function isLoggedIn() {
	      return currentUser.hasOwnProperty('role');
	    },
	
	    /**
	     * Waits for currentUser to resolve before checking if user is logged in
	     */
	    isLoggedInAsync: function isLoggedInAsync(cb) {
	      if (currentUser.hasOwnProperty('$promise')) {
	        currentUser.$promise.then(function () {
	          cb(true);
	        }).catch(function () {
	          cb(false);
	        });
	      } else if (currentUser.hasOwnProperty('role')) {
	        cb(true);
	      } else {
	        cb(false);
	      }
	    },
	
	    // Check if the user's role has the correct permission
	    hasPermission: function hasPermission(permissionName, cb) {
	      if (currentUser.hasOwnProperty('$promise')) {
	        currentUser.$promise.then(function () {
	          if (!currentUser.hasOwnProperty('permissions')) {
	            cb(false);return false;
	          }
	          // If user's role is in meanbaseGlobals.roles then check roles to see if user has permission
	          // Or if user has allPrivilages
	          if (currentUser.permissions.indexOf(permissionName) > -1 || currentUser.permissions.indexOf('allPrivilages') > -1) {
	            cb(true);
	          } else {
	            cb(false);
	          }
	        }).catch(function () {
	          cb(false);
	        });
	      } else if (currentUser.hasOwnProperty('permissions')) {
	        // If user's role is in meanbaseGlobals.roles then check roles to see if user has permission
	        // Or if user has allPrivilages
	        if (currentUser.permissions.indexOf(permissionName) > -1 || currentUser.permissions.indexOf('allPrivilages') > -1) {
	          cb(true);
	        } else {
	          cb(false);
	        }
	      } else {
	        cb(false);
	      }
	    },
	
	    /**
	     * Check if a user is an admin
	     *
	     * @return {Boolean}
	     */
	    isAdmin: function isAdmin() {
	      return currentUser.role === 'admin';
	    },
	
	    /**
	     * Get auth token
	     */
	    getToken: function getToken() {
	      return $cookieStore.get('token');
	    }
	  };
	});

/***/ },
/* 49 */
/*!******************************************!*\
  !*** ./client/shared/api/api.service.js ***!
  \******************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').service('api', function (endpoints) {
	
	  var api = {
	    publishedPages: new endpoints('pages/published'),
	    searchPages: new endpoints('pages/search'),
	    searchPublishedPages: new endpoints('pages/published/search'),
	    pages: new endpoints('pages'),
	    approvedComments: new endpoints('comments/approved'),
	    comments: new endpoints('comments'),
	    bannedMembers: new endpoints('comments/ban'),
	    publishedMenus: new endpoints('menus/published'),
	    menus: new endpoints('menus'),
	    sharedContent: new endpoints("shared-content"),
	    extensions: new endpoints('extension'),
	    themes: new endpoints('themes'),
	    media: new endpoints('media'),
	    settings: new endpoints('settings'),
	    import: new endpoints('import'),
	    developmentMode: new endpoints('development-mode'),
	    roles: new endpoints('roles'),
	    users: new endpoints('users')
	  };
	
	  return api;
	});

/***/ },
/* 50 */
/*!******************************************!*\
  !*** ./client/shared/account/account.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	angular.module('meanbaseApp').config(function ($stateProvider) {
	  $stateProvider.state('login', {
	    url: '/login',
	    templateUrl: __webpack_require__(/*! ./login/login.jade */ 51),
	    controller: 'LoginCtrl'
	  }).state('signup', {
	    url: '/signup',
	    templateUrl: __webpack_require__(/*! ./signup/signup.jade */ 52),
	    controller: 'SignupCtrl'
	  }).state('settings', {
	    url: '/settings',
	    templateUrl: __webpack_require__(/*! ./settings/settings.jade */ 53),
	    controller: 'SettingsCtrl',
	    authenticate: true
	  });
	});

/***/ },
/* 51 */
/*!************************************************!*\
  !*** ./client/shared/account/login/login.jade ***!
  \************************************************/
/***/ function(module, exports) {

	var path = 'shared/account/login/login.jade';
	var html = "<div ng-include=\"&quot;shared/navbar/navbar.html&quot;\"></div><div class=\"container\"><div class=\"row\"><div class=\"col-sm-12\"><h1>Login</h1><p>Accounts are reset on server restart from<code>server/config/seed.js</code>. Default account is<code>test@test.com</code>/<code>test</code></p></div><div class=\"col-sm-12\"><form name=\"form\" ng-submit=\"login(form)\" novalidate=\"\" class=\"form\"><div class=\"form-group\"><label>Email</label><input type=\"text\" name=\"email\" ng-model=\"user.email\" class=\"form-control\"></div><div class=\"form-group\"><label>Password</label><input type=\"password\" name=\"password\" ng-model=\"user.password\" class=\"form-control\"></div><div class=\"form-group has-error\"><p ng-show=\"form.email.$error.required &amp;&amp; form.password.$error.required &amp;&amp; submitted\" class=\"help-block\">Please enter your email and password.</p><p class=\"help-block\">{{ errors.other }}</p></div><div><button type=\"submit\" class=\"btn btn-inverse btn-lg btn-login\">Login</button> <a href=\"/signup\" class=\"btn btn-default btn-lg btn-register\">Register</a></div><hr><div><a href=\"\" ng-click=\"loginOauth(&quot;facebook&quot;)\" class=\"btn btn-facebook\"><i class=\"fa fa-facebook\"></i> Connect with Facebook</a> <a href=\"\" ng-click=\"loginOauth(&quot;google&quot;)\" class=\"btn btn-google-plus\"><i class=\"fa fa-google-plus\"></i> Connect with Google+</a> <a href=\"\" ng-click=\"loginOauth(&quot;twitter&quot;)\" class=\"btn btn-twitter\"><i class=\"fa fa-twitter\"></i> Connect with Twitter</a></div></form></div></div><hr></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 52 */
/*!**************************************************!*\
  !*** ./client/shared/account/signup/signup.jade ***!
  \**************************************************/
/***/ function(module, exports) {

	var path = 'shared/account/signup/signup.jade';
	var html = "<div ng-controller=\"NavbarCtrl\" class=\"navbar navbar-default navbar-static-top\"><div class=\"container\"><div class=\"navbar-header\"><button type=\"button\" ng-click=\"isCollapsed = !isCollapsed\" class=\"navbar-toggle\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"/\" class=\"navbar-brand\">home</a></div><div id=\"navbar-main\" collapse=\"isCollapsed\" class=\"navbar-collapse collapse\"><ul class=\"nav navbar-nav navbar-right\"><li ng-hide=\"isLoggedIn()\" ng-class=\"{active: isActive(&quot;/signup&quot;)}\"><a href=\"/signup\">Sign up</a></li><li ng-hide=\"isLoggedIn()\" ng-class=\"{active: isActive(&quot;/login&quot;)}\"><a href=\"/login\">Login</a></li><li ng-show=\"isLoggedIn()\"><p class=\"navbar-text\">Hello {{ getCurrentUser().name }}</p></li><li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive(&quot;/settings&quot;)}\"><a href=\"/settings\"><span class=\"glyphicon glyphicon-cog\"></span></a></li><li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive(&quot;/logout&quot;)}\"><a href=\"\" ng-click=\"logout()\">Logout</a></li></ul></div></div></div><div class=\"container\"><div class=\"row\"><div class=\"col-sm-12\"><h1>Sign up</h1></div><div class=\"col-sm-12\"><form name=\"form\" ng-submit=\"register(form)\" novalidate=\"\" class=\"form\"><div ng-class=\"{ &quot;has-success&quot;: form.name.$valid &amp;&amp; submitted,        &quot;has-error&quot;: form.name.$invalid &amp;&amp; submitted }\" class=\"form-group\"><label>Name</label><input type=\"text\" name=\"name\" ng-model=\"user.name\" required=\"\" class=\"form-control\"><p ng-show=\"form.name.$error.required &amp;&amp; submitted\" class=\"help-block\">A name is required</p></div><div ng-class=\"{ &quot;has-success&quot;: form.email.$valid &amp;&amp; submitted,        &quot;has-error&quot;: form.email.$invalid &amp;&amp; submitted }\" class=\"form-group\"><label>Email</label><input type=\"email\" name=\"email\" ng-model=\"user.email\" required=\"\" mongoose-error=\"\" class=\"form-control\"><p ng-show=\"form.email.$error.email &amp;&amp; submitted\" class=\"help-block\">Doesn\'t look like a valid email.</p><p ng-show=\"form.email.$error.required &amp;&amp; submitted\" class=\"help-block\">What\'s your email address?</p><p ng-show=\"form.email.$error.mongoose\" class=\"help-block\">{{ errors.email }}</p></div><div ng-class=\"{ &quot;has-success&quot;: form.password.$valid &amp;&amp; submitted,        &quot;has-error&quot;: form.password.$invalid &amp;&amp; submitted }\" class=\"form-group\"><label>Password</label><input type=\"password\" name=\"password\" ng-model=\"user.password\" ng-minlength=\"3\" required=\"\" mongoose-error=\"\" class=\"form-control\"><p ng-show=\"(form.password.$error.minlength || form.password.$error.required) &amp;&amp; submitted\" class=\"help-block\">Password must be at least 3 characters.</p><p ng-show=\"form.password.$error.mongoose\" class=\"help-block\">{{ errors.password }}</p></div><div><button type=\"submit\" class=\"btn btn-inverse btn-lg btn-login\">Sign up</button> <a href=\"/login\" class=\"btn btn-default btn-lg btn-register\">Login</a></div><hr><div><a href=\"\" ng-click=\"loginOauth(&quot;facebook&quot;)\" class=\"btn btn-facebook\"><i class=\"fa fa-facebook\"></i> Connect with Facebook</a> <a href=\"\" ng-click=\"loginOauth(&quot;google&quot;)\" class=\"btn btn-google-plus\"><i class=\"fa fa-google-plus\"></i> Connect with Google+</a> <a href=\"\" ng-click=\"loginOauth(&quot;twitter&quot;)\" class=\"btn btn-twitter\"><i class=\"fa fa-twitter\"></i> Connect with Twitter</a></div></form></div></div><hr></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 53 */
/*!******************************************************!*\
  !*** ./client/shared/account/settings/settings.jade ***!
  \******************************************************/
/***/ function(module, exports) {

	var path = 'shared/account/settings/settings.jade';
	var html = "<div ng-controller=\"NavbarCtrl\" class=\"navbar navbar-default navbar-static-top\"><div class=\"container\"><div class=\"navbar-header\"><button type=\"button\" ng-click=\"isCollapsed = !isCollapsed\" class=\"navbar-toggle\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"/\" class=\"navbar-brand\">home</a></div><div id=\"navbar-main\" collapse=\"isCollapsed\" class=\"navbar-collapse collapse\"><ul class=\"nav navbar-nav navbar-right\"><li ng-hide=\"isLoggedIn()\" ng-class=\"{active: isActive(&quot;/signup&quot;)}\"><a href=\"/signup\">Sign up</a></li><li ng-hide=\"isLoggedIn()\" ng-class=\"{active: isActive(&quot;/login&quot;)}\"><a href=\"/login\">Login</a></li><li ng-show=\"isLoggedIn()\"><p class=\"navbar-text\">Hello {{ getCurrentUser().name }}</p></li><li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive(&quot;/settings&quot;)}\"><a href=\"/settings\"><span class=\"glyphicon glyphicon-cog\"></span></a></li><li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive(&quot;/logout&quot;)}\"><a href=\"\" ng-click=\"logout()\">Logout</a></li></ul></div></div></div><div class=\"container\"><div class=\"row\"><div class=\"col-sm-12\"><h1>Change Password</h1></div><div class=\"col-sm-12\"><form name=\"form\" ng-submit=\"changePassword(form)\" novalidate=\"\" class=\"form\"><div class=\"form-group\"><label>Current Password</label><input type=\"password\" name=\"password\" ng-model=\"user.oldPassword\" mongoose-error=\"\" class=\"form-control\"><p ng-show=\"form.password.$error.mongoose\" class=\"help-block\">{{ errors.other }}</p></div><div class=\"form-group\"><label>New Password</label><input type=\"password\" name=\"newPassword\" ng-model=\"user.newPassword\" ng-minlength=\"3\" required=\"\" class=\"form-control\"><p ng-show=\"(form.newPassword.$error.minlength || form.newPassword.$error.required) &amp;&amp; (form.newPassword.$dirty || submitted)\" class=\"help-block\">Password must be at least 3 characters.</p></div><p class=\"help-block\"> {{ message }}</p><button type=\"submit\" class=\"btn btn-lg btn-primary\">Save changes</button></form></div></div></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 54 */
/*!****************************************************************************************!*\
  !*** ./client/shared/libraries/codrops/codrops-morph-buttons/codrops.morph.buttons.js ***!
  \****************************************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * uiMorphingButton_fixed.js v1.0.0
	 * http://www.codrops.com
	 *
	 * Licensed under the MIT license.
	 * http://www.opensource.org/licenses/mit-license.php
	 * 
	 * Copyright 2014, Codrops
	 * http://www.codrops.com
	 */
	;(function (window) {
	
		'use strict';
	
		var transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		    transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
		    support = { transitions: Modernizr.csstransitions };
	
		function extend(a, b) {
			for (var key in b) {
				if (b.hasOwnProperty(key)) {
					a[key] = b[key];
				}
			}
			return a;
		}
	
		function UIMorphingButton(el, options) {
			this.el = el;
			this.options = extend({}, this.options);
			extend(this.options, options);
			this._init();
		}
	
		UIMorphingButton.prototype.options = {
			closeEl: '',
			onBeforeOpen: function onBeforeOpen() {
				return false;
			},
			onAfterOpen: function onAfterOpen() {
				return false;
			},
			onBeforeClose: function onBeforeClose() {
				return false;
			},
			onAfterClose: function onAfterClose() {
				return false;
			}
		};
	
		UIMorphingButton.prototype._init = function () {
			// the button
			this.button = this.el.querySelector('button');
			// state
			this.expanded = false;
			// content el
			this.contentEl = this.el.querySelector('.morph-content');
			// init events
			this._initEvents();
		};
	
		UIMorphingButton.prototype._initEvents = function () {
			var self = this;
			// open
			this.button.addEventListener('click', function () {
				self.toggle();
			});
			// close
			if (this.options.closeEl !== '') {
				var closeEl = this.el.querySelectorAll(this.options.closeEl);
				if (closeEl) {
					for (var i = 0; i < closeEl.length; i++) {
						closeEl[i].addEventListener('click', function () {
							self.toggle();
						});
					};
				}
			}
		};
	
		UIMorphingButton.prototype.toggle = function () {
			if (this.isAnimating) return false;
	
			// callback
			if (this.expanded) {
				this.options.onBeforeClose();
			} else {
				// add class active (solves z-index problem when more than one button is in the page)
				// classie.addClass( this.el, 'active' );
				this.el.classList.add('active');
				this.options.onBeforeOpen();
			}
	
			this.isAnimating = true;
	
			var self = this,
			    onEndTransitionFn = function onEndTransitionFn(ev) {
				if (ev.target !== this) return false;
	
				if (support.transitions) {
					// open: first opacity then width/height/left/top
					// close: first width/height/left/top then opacity
					if (self.expanded && ev.propertyName !== 'opacity' || !self.expanded && ev.propertyName !== 'width' && ev.propertyName !== 'height' && ev.propertyName !== 'left' && ev.propertyName !== 'top') {
						return false;
					}
					this.removeEventListener(transEndEventName, onEndTransitionFn);
				}
				self.isAnimating = false;
	
				// callback
				if (self.expanded) {
					// remove class active (after closing)
					// classie.removeClass( self.el, 'active' );
					self.el.classList.remove('active');
					self.options.onAfterClose();
				} else {
					self.options.onAfterOpen();
				}
	
				self.expanded = !self.expanded;
			};
	
			if (support.transitions) {
				this.contentEl.addEventListener(transEndEventName, onEndTransitionFn);
			} else {
				onEndTransitionFn();
			}
	
			// set the left and top values of the contentEl (same like the button)
			var buttonPos = this.button.getBoundingClientRect();
			// need to reset
			// classie.addClass( this.contentEl, 'no-transition' );
			this.contentEl.classList.add('no-transition');
			this.contentEl.style.left = 'auto';
			this.contentEl.style.top = 'auto';
	
			// add/remove class "open" to the button wraper
			setTimeout(function () {
				self.contentEl.style.left = buttonPos.left + 'px';
				self.contentEl.style.top = buttonPos.top + 'px';
	
				if (self.expanded) {
					self.contentEl.classList.remove('no-transition');
					// classie.removeClass( self.contentEl, 'no-transition' );
					// classie.removeClass( self.el, 'open' );
					self.el.classList.remove('open');
				} else {
					setTimeout(function () {
						// classie.removeClass( self.contentEl, 'no-transition' );
						self.contentEl.classList.remove('no-transition');
						// classie.addClass( self.el, 'open' ); 
						self.el.classList.add('open');
					}, 25);
				}
			}, 25);
		};
	
		// add to global namespace
		window.UIMorphingButton = UIMorphingButton;
	})(window);

/***/ },
/* 55 */
/*!******************************************************!*\
  !*** ./client/admin/code/analytics/import/import.js ***!
  \******************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').config(function ($stateProvider) {
	  $stateProvider.state('cms.import', {
	    url: '/import',
	    templateUrl: 'app/import/import.html',
	    controller: 'ImportCtrl',
	    hasPermission: "importExportData",
	    icon: 'fa-upload'
	  });
	});

/***/ },
/* 56 */
/*!*****************************************************************!*\
  !*** ./client/admin/code/analytics/import/import.controller.js ***!
  \*****************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').controller('ImportCtrl', function ($modal, $scope, endpoints, FileUploader, $cookieStore, toastr, $rootScope) {
	  $scope.$parent.pageTitle = 'Import Data from Wordpress';
	
	  if ($cookieStore.get('token')) {
	    var uploader = $scope.uploader = new FileUploader({
	      url: '/api/import',
	      headers: {
	        'Authorization': 'Bearer ' + $cookieStore.get('token')
	      },
	      autoUpload: true
	    });
	  }
	
	  uploader.onCompleteAll = function (e) {
	    uploader.clearQueue();
	  };
	
	  uploader.onSuccessItem = function () {
	    toastr.success('Data successfully imported. Check out your new content!');
	  };
	
	  uploader.onErrorItem = function (item, response, status, headers) {
	    toastr.error("Sorry, we could not import that data.");
	  };
	});

/***/ },
/* 57 */
/*!******************************************!*\
  !*** ./client/admin/code/users/users.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	angular.module('meanbaseApp').config(function ($stateProvider) {
	  $stateProvider.state('cms.users', {
	    url: '/users',
	    templateUrl: __webpack_require__(/*! ./users.jade */ 58),
	    controller: 'UsersCtrl',
	    controllerAs: 'stateCtrl',
	    hasPermission: 'manageUsers',
	    icon: 'fa-users'
	  });
	});

/***/ },
/* 58 */
/*!********************************************!*\
  !*** ./client/admin/code/users/users.jade ***!
  \********************************************/
/***/ function(module, exports) {

	var path = 'admin/code/users/users.jade';
	var html = "<h3>Roles and Privilages</h3><div id=\"users\" class=\"panel-dark\"><div class=\"panel-head\"><div class=\"row\"><div class=\"col-sm-6 col-xs-3\"><select ng-options=\"role as role.role for role in roles track by role.role\" ng-model=\"selectedRole\" class=\"panel-select\"></select></div><div class=\"col-sm-6 col-xs-9 text-right\"><button ng-click=\"deleteRole()\" ng-disabled=\"selectedRole.role === \'basic\' || selectedRole.role === \'admin\'\" class=\"btn btn-danger\">Delete</button><button ng-click=\"createRole()\" class=\"btn btn-primary\">New Role</button><button ng-click=\"updateRole()\" ng-disabled=\"selectedRole.role === \'admin\'\" class=\"btn btn-success\">Save</button></div></div></div><div class=\"panel-body\"><div ng-repeat=\"(permissionName, permissionValue) in selectedRole.permissions\" class=\"form-group\"><input id=\"{{permissionName}}\" type=\"checkbox\" ng-model=\"selectedRole.permissions[permissionName]\" ng-checked=\"permissionValue\" class=\"checkbox\"><label for=\"{{permissionName}}\">{{permissionName | camelToHuman}}</label></div></div></div><h3>Users</h3><div class=\"form-group\"><input type=\"text\" placeholder=\"filter users\" ng-model=\"userFilter\" class=\"form-control\"></div><accordion close-others=\"true\"><accordion-group ng-repeat=\"user in users | filter:filterUsers\" is-open=\"status.open\" class=\"panel-primary panel\"><accordion-heading ng-click=\"status.open=!status.open\" class=\"panel-heading\"><span>{{user.name}} </span><i ng-class=\"{\'glyphicon-chevron-down\': status.open, \'glyphicon-chevron-right\': !status.open}\" class=\"pull-right glyphicon panel-chevron\"></i><span class=\"pull-right\">{{user.role}} </span></accordion-heading><div class=\"panel-body equal\"><div class=\"row\"><div class=\"col-md-6\"><div class=\"form-group\"><label>Username</label><input type=\"text\" ng-model=\"user.name\" class=\"form-control\"></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label>Email</label><input type=\"text\" ng-model=\"user.email\" class=\"form-control\"></div></div></div><div class=\"row\"><div class=\"col-sm-3 col-xs-6\"><div class=\"form-group\"><p class=\"h5\">Allow User:</p><select ng-model=\"user.role\" class=\"panel-select\"><option ng-repeat=\"role in roles\" ng-selected=\"role.role == user.role\">{{role.role}}</option></select></div></div><div class=\"col-sm-4 col-xs-6\"><div class=\"form-group\"><p class=\"h5\">Account Enabled</p><label class=\"mb-toggle-switch\"><input type=\"checkbox\" ng-model=\"user.enabled\" ng-checked=\"user.enabled\"><span class=\"mb-switch\"></span></label></div></div><div class=\"col-sm-5 col-xs-12 text-right\"><button ng-click=\"deleteUser(user, $index)\" ng-disabled=\"user.role === \'admin\'\" class=\"btn btn-danger\">Delete</button><button ng-click=\"updateUser(user)\" class=\"btn btn-success\">Update</button></div></div></div></accordion-group></accordion>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 59 */
/*!*****************************************************!*\
  !*** ./client/admin/code/users/users.controller.js ***!
  \*****************************************************/
/***/ function(module, exports) {

	'use strict';
	
	(function () {
		angular.module('meanbaseApp').controller('UsersCtrl', UsersCtrl);
	
		UsersCtrl.$inject = ['$scope', 'endpoints', 'toastr', 'api'];
		function UsersCtrl($scope, endpoints, toastr, api) {
	
			$scope.$parent.pageTitle = "Users and Permissions";
	
			// Get all roles and their permissions and set the roles panel selected role to the first one
			api.roles.find({}).success(function (roles) {
				$scope.roles = roles;
				$scope.selectedRole = $scope.roles[0];
			});
	
			// Get all users
			api.users.find({}).success(function (users) {
				$scope.users = users;
			});
	
			// Create a new role
			$scope.createRole = function () {
				var pass = true;
				var roleName = prompt('Role Name?');
				if (!roleName || !$scope.selectedRole) {
					return false;
				}
				for (var i = 0; i < $scope.roles.length; i++) {
					if ($scope.roles[i].role === roleName) {
						toastr.warning('That role already exists just modify it.');
						pass = false;
						return false;
					}
				}
				if (!pass) {
					return false;
				}
	
				var newRole = { role: roleName, permissions: angular.copy($scope.selectedRole.permissions) };
	
				api.roles.create(newRole).success(function (response) {
					if (Array.isArray(response) && response[0]) {
						$scope.roles.push(response[0]);
						$scope.selectedRole = response[0];
					}
	
					toastr.clear();
					toastr.success('Created new role: ' + roleName);
				});
			};
	
			// Update a role
			$scope.updateRole = function (roleForm) {
				if (!$scope.selectedRole || $scope.selectedRole.role === 'admin') {
					return false;
				}
				api.roles.update({ _id: $scope.selectedRole._id }, { permissions: $scope.selectedRole.permissions }).then(function (response) {
					toastr.clear();
					toastr.success('Updated ' + $scope.selectedRole.role + ' role.');
				});
			};
	
			// Delete a role and move the users of that role to 'basic'
			$scope.deleteRole = function () {
				var confirmed = confirm('Are you sure you want to delete ' + $scope.selectedRole.role + '? All users currently using this role will be switched to basic.');
				if (!confirmed) return false;
				if (!$scope.selectedRole || $scope.selectedRole.role === 'basic' || $scope.selectedRole.role === 'admin') {
					return false;
				}
	
				api.users.update({ role: $scope.selectedRole.role }, { role: 'basic' }).then(function (response) {
					toastr.clear();
					toastr.warning('Moved users with ' + $scope.selectedRole.role + ' over to basic');
				}).finally(function (response) {
					api.roles.delete({ role: $scope.selectedRole.role }).then(function (response) {
						toastr.success('Deleted ' + $scope.selectedRole.role + ' role.');
						$scope.roles.splice($scope.roles.indexOf($scope.selectedRole), 1);
						$scope.selectedRole = $scope.roles[0];
					});
				});
			};
	
			// Update a user
			$scope.updateUser = function (user) {
				var newInfo = {};
				angular.copy(user, newInfo);
				if (!user) return false;
				api.users.update({ _id: user._id }, newInfo).then(function (response) {
					toastr.clear();
					toastr.success('Updated user: ' + user.name);
				});
			};
	
			// Delete a user
			$scope.deleteUser = function (user, index) {
				if (!user) return false;
				api.users.deleteOne(user._id).then(function (response) {
					toastr.clear();
					toastr.success('Deleted user: ' + user.name);
					$scope.users.splice(index, 1);
				});
			};
	
			$scope.userFilter = '';
			$scope.filterUsers = function (user) {
				return (user.name + user.email + user.role + user.lastVisited).toLowerCase().indexOf($scope.userFilter.toLowerCase()) >= 0;
			};
		}
	})();

/***/ },
/* 60 */
/*!********************************************!*\
  !*** ./client/admin/code/themes/themes.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	angular.module('meanbaseApp').config(function ($stateProvider) {
	  $stateProvider.state('cms.themes', {
	    url: '/themes',
	    templateUrl: __webpack_require__(/*! ./themes.jade */ 61),
	    controller: 'ThemesCtrl',
	    hasPermission: 'changeSiteSettings',
	    icon: 'fa-paint-brush'
	  });
	});

/***/ },
/* 61 */
/*!**********************************************!*\
  !*** ./client/admin/code/themes/themes.jade ***!
  \**********************************************/
/***/ function(module, exports) {

	var path = 'admin/code/themes/themes.jade';
	var html = "<p>Choose the look and feel of your site</p><div class=\"alert alert-success\"><strong>For Developers:</strong> A theme must have page templates. Those are the structure your page has without or without any content. A template must have a valid template name, followed by a -template.html or -template.jade, such as \"no-sidebar-template.jade\". A theme must also have a screenshot for the theme and a theme.json file with the author, email, website, title, and description. It may optionally also have a styles.html and scripts.html that will be included in the master index.html page when the theme is loaded or activated.</div><div nv-file-drop=\"uploader\" multiple uploader=\"uploader\" class=\"drop-zone text-center form-inline\"><p>Drop theme <strong>zip, gz, bz2,</strong> or <strong>tar</strong> file here to upload or</p><div class=\"form-group text-center\"><input type=\"file\" nv-file-select multiple uploader=\"uploader\" class=\"form-control\"></div><div class=\"progress\"><div role=\"progressbar\" ng-style=\"{ \'width\': uploader.progress + \'%\' }\" class=\"progress-bar\"></div></div></div><div class=\"row\"><div ng-repeat=\"theme in themes\" class=\"col-md-4 col-sm-6\"><h4>{{theme.title}} </h4><img ng-src=\"{{theme.preview}}\" fallback-src=\"http://placehold.it/500x300\" ng-click=\"openModal(theme)\" class=\"img-responsive img-thumbnail\"><div class=\"text-center\"><p ng-if=\"theme.active\" class=\"mb-active-theme bg-success\">Currently in use</p><p ng-if=\"!theme.active\" class=\"mb-active-theme bg-warning\">Not being used</p></div></div></div><div class=\"form-group checkbox\"><label><input type=\"checkbox\" ng-model=\"themeDevelopmentMode\" ng-click=\"switchModes()\">Enable Theme Development Mode</label><p class=\"help-block\">This mode will watch the scripts.html and styles.html of the active theme for changes and will recompile the main index page with the new scripts and styles that were added in. You must still refresh the browser in between changes.</p></div><script type=\"text/ng-template\" id=\"theme.modal.html\"><div class=\"modal-header\"><button type=\"button\" ng-click=\"cancel()\" class=\"close\"><span aria-hidden=\"true\">×</span><span class=\"sr-only\">Close</span></button><h4 id=\"theme-{{$index}}\" class=\"modal-title\">{{theme.title}}</h4></div><div class=\"modal-body\"><div class=\"mb-theme-controls a-left\"><div validate=\"{{errorMessages.isTitle}}\" class=\"form-group has-feedback\"><label>Author</label><input type=\"text\" ng-model=\"theme.author\" ng-pattern=\"validators.isTitle\" required class=\"form-control\"><span class=\"glyphicon glyphicon-ok form-control-feedback\"></span></div><div validate=\"{{errorMessages.isEmail}}\" class=\"form-group has-feedback\"><label>Email</label><input type=\"text\" ng-model=\"theme.email\" ng-pattern=\"validators.isEmail\" required class=\"form-control\"><span class=\"glyphicon glyphicon-ok form-control-feedback\"></span></div><div validate=\"{{errorMessages.isURI}}\" class=\"form-group has-feedback\"><label>Website</label><input type=\"text\" ng-model=\"theme.website\" ng-pattern=\"validators.isURI\" class=\"form-control\"><span class=\"glyphicon glyphicon-ok form-control-feedback\"></span></div><div class=\"form-group\"><label>Description</label><textarea class=\"form-control\">{{theme.description}}</textarea></div><p ng-if=\"theme.active\" class=\"mb-active-theme bg-success\">Currently in use</p><p ng-if=\"!theme.active\" class=\"mb-active-theme bg-warning\">Not being used</p><hr><h4>Template Mapping</h4><p class=\"help-text\">Different themes support different templates. So what happens if you save a page using the \"Awesome\" theme\'s super duper template but then you switch to a boring theme that only has the \"boring-template\". This allows you to connect those templates so you can choose how the content from the previous theme gets displayed in the new theme. Just add the template names from the old theme as tags to the new theme templates.</p><label class=\"your-templates-label\">Supported Templates</label><label class=\"template-field-label\">Incoming Templates</label><div ng-repeat=\"(template, tags) in templates\" class=\"form-group\"><label class=\"template-label\">{{template}}</label><taglist ng-model=\"templates[template]\"></taglist></div></div></div><div class=\"modal-footer\"><button ng-disabled=\"theme.active\" ng-click=\"deleteTheme(theme)\" data-dismiss=\"modal\" class=\"btn btn-danger\">Delete</button><button type=\"button\" ng-click=\"updateTheme()\" data-dismiss=\"modal\" class=\"btn btn-warning\">Update</button><button ng-disabled=\"theme.active\" ng-click=\"activateTheme()\" data-dismiss=\"modal\" class=\"btn btn-success\">Use this theme</button><button type=\"button\" ng-click=\"cancel()\" class=\"btn btn-default\">Close</button></div></script>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 62 */
/*!*******************************************************!*\
  !*** ./client/admin/code/themes/themes.controller.js ***!
  \*******************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').controller('ThemesCtrl', function ($scope, endpoints, $modal, FileUploader, $cookieStore, $rootScope, toastr, api) {
	
	  $scope.$parent.pageTitle = 'Themes';
	
	  $scope.themeDevelopmentMode = false;
	  api.developmentMode.find({}).success(function (response) {
	    $scope.themeDevelopmentMode = response;
	  });
	
	  if ($cookieStore.get('token')) {
	    var uploader = $scope.uploader = new FileUploader({
	      url: '/api/themes/upload',
	      headers: {
	        'Authorization': 'Bearer ' + $cookieStore.get('token')
	      },
	      autoUpload: true
	    });
	  }
	
	  uploader.onCompleteAll = function (e) {
	    uploader.clearQueue();
	  };
	
	  uploader.onSuccessItem = function () {
	    $rootScope.$emit('cms.themeUploaded');
	    toastr.success('Theme successfully uploaded! Refreshing page to compile code.');
	    api.themes.find({}).success(function (themes) {
	      $scope.themes = themes;
	    });
	  };
	
	  uploader.onErrorItem = function (item, response, status, headers) {
	    toastr.error("Could not upload theme. " + status + ": " + response);
	  };
	
	  api.themes.find({}).success(function (themes) {
	    $scope.themes = themes;
	    for (var i = 0; i < $scope.themes.length; i++) {
	      if (!$scope.themes[i].preview) {
	        $scope.themes[i].preview = 'http://placehold.it/500x300';
	      }
	    }
	  });
	
	  $scope.openModal = function (_theme) {
	    var modalInstance = $modal.open({
	      templateUrl: 'theme.modal.html',
	      controller: 'theme.modal.controller',
	      size: 'lg',
	      resolve: {
	        theme: function theme() {
	          return _theme;
	        }
	      }
	    });
	
	    modalInstance.result.then(function (action) {
	      if (action === 'deleted') {
	        $scope.themes.splice($scope.themes.indexOf(_theme), 1);
	      }
	    });
	  };
	
	  $scope.switchModes = function () {
	    api.developmentMode.create({ theme: $scope.themeDevelopmentMode }).then(function () {
	      if ($scope.themeDevelopmentMode) {
	        toastr.success("Meanbase is now watching the active theme's scripts.html and styles.html for changes.");
	      } else {
	        toastr.warning('Meanbase is no longer watching for changes in scripts and styles html.');
	      }
	    });
	  };
	
	  $scope.$onRootScope('deleted theme', function (theme) {
	    $scope.themeDevelopmentMode = false;
	  });
	
	  $scope.$onRootScope('activated theme', function (theme) {
	    $scope.themeDevelopmentMode = false;
	  });
	});

/***/ },
/* 63 */
/*!************************************************************!*\
  !*** ./client/admin/code/themes/theme.modal.controller.js ***!
  \************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').controller('theme.modal.controller', function ($scope, theme, $modalInstance, $http, endpoints, toastr, $rootScope, api) {
	
	  $scope.theme = theme;
	
	  $scope.templates = $scope.theme.templates;
	
	  $scope.ok = function () {
	    $modalInstance.close($scope.theme);
	  };
	
	  $scope.activateTheme = function () {
	    $scope.updateTheme();
	    // $modalInstance.close($scope.theme);
	    $http.post('api/themes/activate', { id: $scope.theme._id }).then(function (theme) {
	      $rootScope.$emit('activated theme', $scope.theme);
	      var reload = confirm('Themes changed please reload the page.');
	      if (reload) {
	        location.reload();
	      }
	    }, function (error) {
	      console.log('Switching themes error: ', error);
	    });
	  };
	
	  $scope.updateTheme = function () {
	    $modalInstance.close($scope.theme);
	    if (!$scope.theme._id) {
	      return false;
	    }
	    api.themes.update({ _id: $scope.theme._id }, $scope.theme).then(function (response) {
	      toastr.success('Updated theme.');
	      window.meanbaseGlobals.themeTemplates = $scope.theme.templates;
	    });
	  };
	
	  $scope.deleteTheme = function () {
	    if ($scope.theme.url) {
	      var sure = window.confirm('Are you sure you want to delete this theme?');
	      if (sure) {
	        api.themes.delete({ url: $scope.theme.url }).then(function (response) {
	          $rootScope.$emit('deleted theme');
	          console.log('response', response);
	        });
	      }
	      $modalInstance.close('deleted');
	    }
	  };
	
	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
	});

/***/ },
/* 64 */
/*!******************************************!*\
  !*** ./client/admin/code/media/media.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	angular.module('meanbaseApp').config(function ($stateProvider) {
	  $stateProvider.state('cms.media', {
	    url: '/media',
	    templateUrl: __webpack_require__(/*! ./media.jade */ 65),
	    controller: 'MediaCtrl',
	    hasPermission: 'manageMedia',
	    icon: 'fa-image'
	  });
	});

/***/ },
/* 65 */
/*!********************************************!*\
  !*** ./client/admin/code/media/media.jade ***!
  \********************************************/
/***/ function(module, exports) {

	var path = 'admin/code/media/media.jade';
	var html = "<p>Manage and see images, videos, and documents your site is using</p><div nv-file-drop=\"uploader\" nv-file-over multiple uploader=\"uploader\" class=\"drop-zone text-center form-inline\"><p>Drop files here to upload or</p><div class=\"form-group text-center\"><input type=\"file\" nv-file-select multiple uploader=\"uploader\" class=\"form-control\"></div><div class=\"progress\"><div role=\"progressbar\" ng-style=\"{ \'width\': uploader.progress + \'%\' }\" class=\"progress-bar\"></div></div></div><hr><h3>Edit Images</h3><image-selector image-selector-config=\"imageSelectorConfig\"></image-selector>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 66 */
/*!*****************************************************!*\
  !*** ./client/admin/code/media/media.controller.js ***!
  \*****************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').controller('MediaCtrl', function ($scope, endpoints, $modal, FileUploader, $timeout, $cookieStore, $rootScope, toastr) {
	
	  $scope.$parent.pageTitle = 'Upload and edit media';
	  $scope.media = [];
	  // $scope.allOperations = true;
	
	  $scope.imageSelectorConfig = {
	    multiple: true,
	    allOperations: true
	  };
	
	  if ($cookieStore.get('token')) {
	    var uploader = $scope.uploader = new FileUploader({
	      url: '/api/media',
	      headers: {
	        'Authorization': 'Bearer ' + $cookieStore.get('token')
	      },
	      autoUpload: true
	    });
	  }
	
	  var err = null;
	
	  uploader.onCompleteAll = function (res) {
	    if (err) {
	      toastr.error('Failed to upload');
	    } else {
	      toastr.success('Successfully uploaded');
	    }
	    uploader.clearQueue();
	  };
	
	  uploader.onCompleteItem = function (res) {
	    err = res.isError;
	    $rootScope.$emit('cms.imagesUploaded');
	  };
	});

/***/ },
/* 67 */
/*!****************************************************!*\
  !*** ./client/admin/code/extensions/extensions.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	angular.module('meanbaseApp').config(function ($stateProvider) {
	  $stateProvider.state('cms.extensions', {
	    url: '/extensions',
	    templateUrl: __webpack_require__(/*! ./extensions.jade */ 68),
	    controller: 'ExtensionsCtrl',
	    hasPermission: 'manageExtensions',
	    icon: 'fa-plug'
	  });
	});

/***/ },
/* 68 */
/*!******************************************************!*\
  !*** ./client/admin/code/extensions/extensions.jade ***!
  \******************************************************/
/***/ function(module, exports) {

	var path = 'admin/code/extensions/extensions.jade';
	var html = "<p>Upload reusable components to add to extensible areas of your site</p><div nv-file-drop=\"uploader\" uploader=\"uploader\" class=\"drop-zone text-center form-inline\"><p>Drop extension <strong>zip, gz, bz2,</strong> or <strong>tar</strong> file here to upload or</p><div class=\"form-group text-center\"><input type=\"file\" nv-file-select multiple uploader=\"uploader\" class=\"form-control\"></div><div class=\"progress\"><div role=\"progressbar\" ng-style=\"{ \'width\': uploader.progress + \'%\' }\" class=\"progress-bar\"></div></div></div><div class=\"row\"><div ng-repeat=\"extension in extensions\" class=\"col-md-4 col-sm-6 meanbase-extension-block\"><h4>{{extension.name}} </h4><img ng-src=\"{{extension.screenshot}}\" ng-click=\"openModal(extension)\" class=\"img-responsive img-thumbnail\"><button ng-click=\"deleteExtension(extension)\" class=\"btn btn-danger delete-extension-button\">Delete</button><button ng-click=\"toggleEnabled(extension)\" ng-show=\"!extension.active\" class=\"btn btn-success enable-extension-button\">Enable Use</button><button ng-click=\"toggleEnabled(extension)\" ng-show=\"extension.active\" class=\"btn btn-warning enable-extension-button\">Disable Use</button></div></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 69 */
/*!***************************************************************!*\
  !*** ./client/admin/code/extensions/extensions.controller.js ***!
  \***************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').controller('ExtensionsCtrl', function ($modal, $scope, endpoints, FileUploader, $cookieStore, toastr, $rootScope, api) {
	  $scope.$parent.pageTitle = 'Extensions';
	
	  if ($cookieStore.get('token')) {
	    var uploader = $scope.uploader = new FileUploader({
	      url: '/api/extension/upload',
	      headers: {
	        'Authorization': 'Bearer ' + $cookieStore.get('token')
	      },
	      autoUpload: true
	    });
	  }
	
	  api.extensions.find({}).success(function (response) {
	    $scope.extensions = response;
	    for (var i = 0; i < $scope.extensions.length; i++) {
	      if (!$scope.extensions[i].screenshot) {
	        console.log('this');
	        $scope.extensions[i].screenshot = 'http://placehold.it/500x200';
	      }
	    }
	  });
	
	  uploader.onCompleteAll = function (e) {
	    uploader.clearQueue();
	  };
	
	  uploader.onSuccessItem = function () {
	    $rootScope.$emit('cms.extensionUploaded');
	    toastr.success('Extension successfully uploaded! Refreshing page to compile code.');
	  };
	
	  uploader.onErrorItem = function (item, response, status, headers) {
	    toastr.error("Could not upload extension. " + status + ": " + response);
	  };
	
	  $scope.deleteExtension = function (extension) {
	    if (extension._id) {
	      var sure = window.confirm('Are you sure you want to delete this extension?');
	      if (sure) {
	        api.extensions.delete({ folderName: extension.folderName }).then(function (response) {
	          toastr.success('Deleted ' + extension.name + ' extension.');
	          $scope.extensions.splice($scope.extensions.indexOf(extension), 1);
	        });
	      }
	    }
	  };
	
	  $scope.toggleEnabled = function (extension) {
	    extension.active = !extension.active;
	    if (extension._id) {
	      api.extensions.update({ _id: extension._id }, { active: extension.active }).then(function (response) {
	        toastr.clear();
	        if (!extension.active) {
	          toastr.warning('"' + extension.name + '" will not longer be useable in your site.');
	        } else {
	          toastr.success('"' + extension.name + '" can now be used across your site.');
	        }
	      });
	    }
	  };
	});

/***/ },
/* 70 */
/*!************************************************!*\
  !*** ./client/admin/code/comments/comments.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	angular.module('meanbaseApp').config(function ($stateProvider) {
	  $stateProvider.state('cms.comments', {
	    url: '/comments',
	    templateUrl: __webpack_require__(/*! ./comments.jade */ 71),
	    controller: 'CommentsCtrl',
	    hasPermission: 'moderateComments',
	    icon: 'fa-comments'
	  });
	});

/***/ },
/* 71 */
/*!**************************************************!*\
  !*** ./client/admin/code/comments/comments.jade ***!
  \**************************************************/
/***/ function(module, exports) {

	var path = 'admin/code/comments/comments.jade';
	var html = "<tabset justified=\"true\" class=\"margin-top\"><tab><tab-heading>Moderate Comments <span class=\"badge\">{{comments.length}}</span></tab-heading><div id=\"moderate-comments\"><p>Only approved comments can be seen by site visitors</p><h4>Only show comments with...</h4><div class=\"row\"><div class=\"col-md-4 col-xs-12\"><div class=\"form-group date-field\"><label>Date:</label><div class=\"input-group\"><input type=\"text\" datepicker-popup=\"dd-MMMM-yyyy\" ng-model=\"commentDate\" is-open=\"dateOpened\" class=\"form-control\"><span class=\"input-group-btn\"><button type=\"button\" ng-click=\"open($event)\" class=\"btn btn-default\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span></div></div><div class=\"form-group\"><label class=\"radio-inline\"><input type=\"radio\" value=\"before\" ng-model=\"dateDirection\">Before</label><label class=\"radio-inline\"><input type=\"radio\" value=\"during\" ng-model=\"dateDirection\">During</label><label class=\"radio-inline\"><input type=\"radio\" value=\"after\" ng-model=\"dateDirection\">After</label></div></div><div class=\"col-md-4 col-xs-6\"><div class=\"form-group\"><label>Approval: </label><select ng-model=\"approval\" ng-options=\"approvalState.value as approvalState.label for approvalState in approvalStates\" class=\"form-control\"></select></div></div><div class=\"col-md-4 col-xs-6\"><div class=\"form-group\"><label>Page: </label><select ng-options=\"page.value as page.label for page in pagesWithComments\" ng-model=\"filterByThisPage\" class=\"form-control\"></select></div></div></div><div class=\"form-group\"><div class=\"input-group\"><div class=\"input-group-addon\"><i class=\"fa fa-search\"></i></div><input type=\"text\" placeholder=\"Search comments by text\" ng-model=\"commentFilter\" class=\"form-control\"></div></div><div class=\"form-group\"><button ng-click=\"approveAllVisible()\" class=\"btn btn-success\">Approve All Visibile</button><button ng-click=\"unapproveAllVisible()\" class=\"btn btn-warning\">Unapprove All Visibile</button><button ng-click=\"deleteAllVisible()\" class=\"btn btn-danger\">Delete All Visibile</button></div><div class=\"form-group checkbox\"><label><input type=\"checkbox\" ng-model=\"sortDirection\">Show oldest comments first?</label></div><accordion close-others=\"true\"><accordion-group ng-repeat=\"comment in ($parent.filteredComments = (comments | filter:commentFilter | filter: {approved: approval, url: filterByThisPage})) | orderBy:\'date\':sortDirection | dateRange: \'date\':commentDate:1:dateDirection\" is-open=\"status.open\" ng-class=\"{\'panel-success\': comment.approved, \'panel-warning\': !comment.approved}\" class=\"panel\"><accordion-heading ng-click=\"status.open=!status.open\" class=\"panel-heading\"><i ng-class=\"{\'fa-check\': comment.approved, \'fa-frown-o\': !comment.approved}\" class=\"fa comment-approved-icon\"></i><span class=\"commment-author\"><strong>{{comment.author}} </strong>: {{comment.date | relativeDate}}</span><i ng-class=\"{\'glyphicon-chevron-down\': status.open, \'glyphicon-chevron-right\': !status.open}\" class=\"pull-right glyphicon panel-chevron\"></i><span class=\"pull-right\">{{comment.url | removeSlash}} </span></accordion-heading><div class=\"panel-body equal\"><div class=\"row\"><div class=\"col-sm-4 col-xs-12\"><div class=\"h4\">email</div><p>{{comment.email}}</p></div><div class=\"col-sm-4 col-xs-6\"><div class=\"h4\">ip</div><p>{{comment.ip}}</p></div><div class=\"col-sm-4 col-xs-6\"><div class=\"h4\">Date</div><p>{{comment.date}}</p></div></div><div class=\"row\"><div class=\"col-sm-12\"><div class=\"h4\">content</div><p>{{comment.content}}</p></div></div><div class=\"row\"><div class=\"col-sm-12 text-right\"><button ng-show=\"!comment.banned\" ng-click=\"ban(comment)\" class=\"btn btn-danger\">Ban commentor</button><button ng-show=\"comment.banned\" ng-click=\"unban(comment)\" class=\"btn btn-warning\">Unban commentor</button><button ng-click=\"deleteComment(comment)\" class=\"btn btn-danger\">Delete</button><button ng-click=\"editComment(comment)\" class=\"btn btn-warning\">Edit</button><button ng-hide=\"comment.approved\" ng-click=\"approveComment(comment)\" class=\"btn btn-success\">Approve</button><button ng-show=\"comment.approved\" ng-click=\"unapproveComment(comment)\" class=\"btn btn-warning\">Unapprove</button></div></div></div></accordion-group></accordion><div class=\"row\"><div class=\"col-xs-12\"><div class=\"checkbox-inline\"><label><input type=\"checkbox\" ng-model=\"autoAccept\" ng-change=\"toggleAutoAccept(autoAccept)\">Automatically accept all new comments</label></div><div class=\"checkbox-inline\"><label><input type=\"checkbox\" ng-model=\"disableComments\" ng-change=\"toggleDisableComments(disableComments)\">Disable Comments</label></div></div></div></div></tab><tab><tab-heading>Banned Commentors <span class=\"badge\"> {{bannedMembers.length}}</span></tab-heading><h3>Banned Members</h3><accordion close-others=\"true\"><accordion-group ng-repeat=\"member in bannedMembers\" class=\"panel\"><accordion-heading ng-click=\"status.open=!status.open\" class=\"panel-heading\"><i ng-class=\"{\'fa-check\': comment.approved, \'fa-frown-o\': !comment.approved}\" class=\"fa comment-approved-icon\"></i><span class=\"commment-author\"><strong>{{member.email}} </strong></span><i ng-class=\"{\'glyphicon-chevron-down\': status.open, \'glyphicon-chevron-right\': !status.open}\" class=\"pull-right glyphicon panel-chevron\"></i><span class=\"pull-right\">{{member.ip}} </span></accordion-heading><div class=\"panel-body equal\"><div class=\"row\"><div class=\"col-xs-6\"><div class=\"h4\">email</div><p>{{member.email}}</p></div><div class=\"col-xs-6\"><div class=\"h4\">ip</div><p>{{member.ip}}</p></div></div><div class=\"row\"><div class=\"col-sm-12 text-right\"><button ng-click=\"unban(member)\" class=\"btn btn-warning\">Unban commentor</button></div></div></div></accordion-group></accordion></tab></tabset>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 72 */
/*!***********************************************************!*\
  !*** ./client/admin/code/comments/comments.controller.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').controller('CommentsCtrl', function ($scope, endpoints, helpers, toastr, api) {
	
	  $scope.$parent.pageTitle = 'Moderate Comments';
	  $scope.commentFilter = '';
	  $scope.autoAccept = false;
	  $scope.autoReject = false;
	  $scope.dateDirection = 'after';
	  $scope.pagesWithComments = [{ label: 'all', value: '' }];
	  $scope.filterByThisPage = '';
	  $scope.commentDate = null;
	  api.comments.find({}).then(function (response) {
	    $scope.comments = response.data;
	
	    api.bannedMembers.find({}).success(function (bannedComments) {
	      $scope.bannedMembers = bannedComments;
	      for (var i = 0; i < $scope.comments.length; i++) {
	        if ($scope.pagesWithComments.indexOf($scope.comments[i].url) === -1) {
	          $scope.pagesWithComments.push($scope.comments[i].url);
	        }
	        for (var j = 0; j < bannedComments.length; j++) {
	          if (bannedComments[j].email === $scope.comments[i].email || bannedComments[j].ip === $scope.comments[i].ip) {
	            $scope.comments[i].banned = true;
	          }
	        }
	      }
	      $scope.pagesWithComments = helpers.generateSelectOptions($scope.pagesWithComments, function (page) {
	        return page.substring(1);
	      });
	    }).error(function (err) {
	      toastr.warning('Could not figure out if comments are banned.');
	    });
	  });
	
	  // Get the auto accept comments status
	  api.settings.find({ name: 'auto-accept-comments' }).then(function (response) {
	    if (!response.data[0]) {
	      return $scope.autoAccept = false;
	    }
	    $scope.autoAccept = response.data[0].value === "true";
	  });
	
	  api.settings.find({ name: 'disable-comments' }).then(function (response) {
	    if (!response.data[0]) {
	      return $scope.disableComments = false;
	    }
	    $scope.disableComments = response.data[0].value === "true";
	  });
	
	  $scope.approvalStates = [{ label: 'both', value: '' }, { label: 'approved', value: 'true' }, { label: 'unapproved', value: 'false' }];
	
	  $scope.approval = '';
	
	  $scope.today = new Date();
	
	  $scope.dateOpened = false;
	
	  $scope.open = function ($event) {
	    $event.preventDefault();
	    $event.stopPropagation();
	    $scope.dateOpened = true;
	  };
	
	  // $scope.filterComments = function(comment) {
	  // 	return (comment.content + comment.author + comment.ip + comment.email + comment.date + comment.url).toLowerCase().indexOf($scope.commentFilter.toLowerCase()) >= 0;
	  // };
	
	  $scope.approveComment = function (comment, index) {
	    api.comments.update({ _id: comment._id }, { approved: true }).then(function (response) {
	      $scope.comments[$scope.comments.indexOf(comment)].approved = true;
	      toastr.clear();
	      toastr.success('Comment approved.');
	    });
	  };
	
	  $scope.unapproveComment = function (comment, index) {
	    api.comments.update({ _id: comment._id }, { approved: false }).then(function (response) {
	      $scope.comments[$scope.comments.indexOf(comment)].approved = false;
	      toastr.clear();
	      toastr.success('Comment unapproved.');
	    });
	  };
	
	  $scope.editComment = function (comment, index) {};
	
	  $scope.ban = function (comment) {
	    if (!comment || !comment.email || !comment.ip) {
	      return false;
	    }
	    api.bannedMembers.create({ email: comment.email, ip: comment.ip }).success(function (response) {
	      toastr.success('Commentor banned');
	      comment.banned = true;
	      $scope.bannedMembers.push(response[0]);
	    }).error(function (err) {
	      toastr.danger('Could not ban commentor', err);
	    });
	  };
	
	  $scope.unban = function (item) {
	    if (!item || !item.email || !item.ip) {
	      return false;
	    }
	    api.bannedMembers.delete({ $or: [{ email: item.email }, { ip: item.ip }] }).then(function (response) {
	      toastr.clear();
	      toastr.success('Commentor unbanned');
	      var index = $scope.bannedMembers.indexOf(item);
	      if (index > -1) {
	        $scope.bannedMembers.splice(index, 1);
	      }
	      if (item.date) {
	        item.banned = false;
	      } else {
	        for (var i = 0; i < $scope.comments.length; i++) {
	          if ($scope.comments[i].email === item.email || $scope.comments[i].ip === item.ip) {
	            $scope.comments[i].banned = false;
	          }
	        }
	      }
	    }, function (err) {
	      toastr.danger('Could not unban commentor', err);
	    });
	  };
	
	  $scope.deleteComment = function (comment) {
	    api.comments.delete({ _id: comment._id }).then(function (response) {
	      $scope.comments.splice($scope.comments.indexOf(comment), 1);
	      toastr.clear();
	      toastr.success('Comment deleted.');
	    });
	  };
	
	  $scope.deleteAllVisible = function () {
	    if (!$scope.filteredComments || $scope.filteredComments.length === 0) {
	      return false;
	    }
	    var confirm = window.confirm('Are you sure you want to delete so many?');
	    if (confirm) {
	      for (var i = 0; i < $scope.filteredComments.length; i++) {
	        if ($scope.comments.indexOf($scope.filteredComments[i]) > -1) {
	          $scope.comments.splice($scope.comments.indexOf($scope.filteredComments[i]), 1);
	        }
	      }
	
	      // Sync the database with the comments
	      api.comments.delete({}).then(function () {
	        toastr.clear();
	        toastr.success('Deleted all comments.');
	      });
	    }
	  };
	
	  $scope.approveAllVisible = function () {
	    for (var i = 0; i < $scope.filteredComments.length; i++) {
	      $scope.filteredComments[i].approved = true;
	    }
	
	    // Sync the database with the comments
	    api.comments.delete({}).then(function () {
	      api.comments.create($scope.comments);
	      toastr.clear();
	      toastr.success('Approved all visible comments.');
	    });
	  };
	
	  $scope.unapproveAllVisible = function () {
	    for (var i = 0; i < $scope.filteredComments.length; i++) {
	      $scope.filteredComments[i].approved = false;
	    }
	
	    // Sync the database with the comments
	    api.comments.delete({}).then(function () {
	      api.comments.create($scope.comments);
	      toastr.clear();
	      toastr.success('Unapproved all visible comments.');
	    });
	  };
	
	  $scope.toggleAutoAccept = function (boole) {
	    api.settings.update({ name: 'auto-accept-comments' }, { name: 'auto-accept-comments', value: boole }).then(function (response) {
	      boole = boole;
	    }, function () {
	      boole = !boole;
	    });
	  };
	
	  $scope.toggleDisableComments = function (boole) {
	    api.settings.update({ name: 'disable-comments' }, { name: 'disable-comments', value: boole }).then(function (response) {
	      boole = boole;
	    }, function () {
	      boole = !boole;
	    });
	  };
	});
	
	angular.module('meanbaseApp').filter('removeSlash', function () {
	  return function (input) {
	    return input.substring(1);
	  };
	});
	
	angular.module('meanbaseApp').filter('dateRange', function () {
	  return function (items, field, date, days, dateDirection) {
	    if (!date || date === '') {
	      return items;
	    }
	    if (!items) {
	      return items;
	    }
	    var timeEnd, timeStart;
	    if (dateDirection === 'during') {
	      timeStart = new Date(date);
	      timeStart = Date.parse(timeStart);
	      timeEnd = timeStart + days * 86400000; // 1 day in ms
	
	      return items.filter(function (item) {
	        var itemDate = Date.parse(item[field]);
	        return itemDate > timeStart && itemDate < timeEnd;
	      });
	    } else if (dateDirection === 'before') {
	      timeStart = new Date(date);
	      timeStart = Date.parse(timeStart);
	
	      return items.filter(function (item) {
	        var itemDate = Date.parse(item[field]);
	        return itemDate < timeStart;
	      });
	    } else if (dateDirection === 'after') {
	      timeStart = new Date(date);
	      timeStart = Date.parse(timeStart);
	
	      return items.filter(function (item) {
	        var itemDate = Date.parse(item[field]);
	        return itemDate > timeStart;
	      });
	    }
	  };
	});

/***/ },
/* 73 */
/*!**************************************!*\
  !*** ./client/admin/code/cms/cms.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// ### Parent route for backend.
	// - All routes for the admin interface have cms/ as their prefix
	
	angular.module('meanbaseApp').config(function ($stateProvider) {
	  $stateProvider.state('cms', {
	    url: '/cms',
	    templateUrl: __webpack_require__(/*! ./cms.jade */ 74),
	    controller: 'cmsCtrl',
	    controllerAs: 'cms',
	    authenticate: true
	  });
	});

/***/ },
/* 74 */
/*!****************************************!*\
  !*** ./client/admin/code/cms/cms.jade ***!
  \****************************************/
/***/ function(module, exports) {

	var path = 'admin/code/cms/cms.jade';
	var html = "<div id=\"wrapper\" ng-class=\"{\'toggled\': menuOpen}\"><div id=\"sidebar-wrapper\"><ul class=\"sidebar-nav\"><li class=\"sidebar-brand\"><a href=\"/\" target=\"_self\">Back to Site</a></li><li ng-repeat=\"state in cmsStates\" ui-sref=\"{{state.name}}\" ng-show=\"state.userHasPermission\" ng-click=\"toggleMenu()\"><i ng-class=\"state.icon\" class=\"fa\"></i><a>{{state.friendlyName}}</a></li></ul></div><div id=\"meanbase-cms\"><nav class=\"navbar-default navbar-inverse\"><div class=\"container\"><div class=\"navbar-header\"><button ng-click=\"toggleMenu()\" class=\"navbar-toggle collapsed pull-left dont-hide\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><div class=\"navbar-brand\">{{pageTitle}}</div></div></div></nav><div id=\"content-cms\"><div ui-view=\"\"><h1>Welcome to meanbase CMS</h1><p>I\'m sure your excited and maybe nervous to begin managing your website. Don\'t worry we\'ve made the process easy to follow. Just start clicking buttons. Just be careful on the theme\'s page, that could mess up your site.</p></div></div></div></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 75 */
/*!*************************************************!*\
  !*** ./client/admin/code/cms/cms.controller.js ***!
  \*************************************************/
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	angular.module('meanbaseApp').controller('cmsCtrl', function ($scope, Auth, $rootScope, endpoints, api, $state) {
	
		var states = $state.get();
		$scope.cmsStates = [];
		$scope.$parent.pageTitle = 'Manage Site';
		Auth.isLoggedInAsync(function (status) {
			$rootScope.isLoggedIn = status;
			$rootScope.currentUser = Auth.getCurrentUser();
	
			for (var i = 0; i < states.length; i++) {
				if (states[i].name.indexOf('cms.') > -1) {
					var state = angular.copy(states[i]);
					if (!state.hasPermission) {
						if (!state.authenticate || state.authenticate && $rootScope.currentUser) {
							state.userHasPermission = true;
						} else {
							state.userHasPermission = false;
						}
					} else if (!$rootScope.currentUser.permissions || $rootScope.currentUser.permissions.length === 0) {
						state.userHasPermission = false;
					} else {
						state.userHasPermission = $rootScope.currentUser.permissions.indexOf(state.hasPermission) > -1 || $rootScope.currentUser.permissions.indexOf('allPrivilages') > -1;
					}
					state.friendlyName = state.url.replace('/', '');
					$scope.cmsStates.push(state);
				}
			}
		});
		$rootScope.currentUser = Auth.getCurrentUser();
	
		$scope.toggleMenu = function () {
			$scope.menuOpen = !$scope.menuOpen;
		};
	
		$scope.pageTitle = 'Site Preferences';
	
		if ($scope.$parent.pageTitle) {
			document.title = $scope.$parent.pageTitle;
		}
	
		$scope.isBanned = function (identifier) {
			if ((typeof identifier === 'undefined' ? 'undefined' : _typeof(identifier)) === 'object' || identifier) {
				api.bannedMembers.find(identifier);
			}
		};
	
		$scope.isBanned({});
	
		$scope.ban = function (comment) {
			if (comment && comment.ip && comment.email) {
				api.bannedMembers.create({ ip: comment.ip, email: comment.email }).success(function (response) {
					console.log("response", response);
				});
			}
		};
	});

/***/ },
/* 76 */
/*!******************************************************************************!*\
  !*** ./client/admin/code/analytics/google-analytics-embed-customizations.js ***!
  \******************************************************************************/
/***/ function(module, exports) {

	// (function(w,d,s,g,js,fjs){
	// g=w.gapi||(w.gapi={});g.analytics={q:[],ready:function(cb){this.q.push(cb)}};
	// js=d.createElement(s);fjs=d.getElementsByTagName(s)[0];
	// js.src='https://apis.google.com/js/platform.js';
	// fjs.parentNode.insertBefore(js,fjs);js.onload=function(){g.load('analytics')};
	// }(window,document,'script'));
	//
	// gapi.analytics.ready(function() {
	//   // Step 3: Authorize the user.
	//   var CLIENT_ID = '';
	//   gapi.analytics.auth.authorize({
	//     container: 'auth-button',
	//     clientid: CLIENT_ID
	//   });
	//   // Step 4: Create the view selector.
	//   var viewSelector = new gapi.analytics.ViewSelector({
	//     container: 'view-selector'
	//   });
	//   // Step 5: Create the timeline chart.
	//   var timeline = new gapi.analytics.googleCharts.DataChart({
	//     reportType: 'ga',
	//     query: {
	//       'dimensions': 'ga:date',
	//       'metrics': 'ga:sessions',
	//       'start-date': '30daysAgo',
	//       'end-date': 'yesterday',
	//     },
	//     chart: {
	//       type: 'LINE',
	//       container: 'timeline'
	//     }
	//   });
	//
	//   // Step 6: Hook up the components to work together.
	//   gapi.analytics.auth.on('success', function(response) {
	//     console.log("success", response);
	//     viewSelector.execute();
	//   });
	//   viewSelector.on('change', function(ids) {
	//     var newIds = {
	//       query: {
	//         ids: ids
	//       }
	//     }
	//     timeline.set(newIds).execute();
	//   });
	// });
	"use strict";

/***/ },
/* 77 */
/*!**************************************************!*\
  !*** ./client/admin/code/analytics/analytics.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	angular.module('meanbaseApp').config(function ($stateProvider) {
	  $stateProvider.state('cms.analytics', {
	    url: '/analytics',
	    templateUrl: __webpack_require__(/*! ./analytics.jade */ 78),
	    controller: 'AnalyticsCtrl',
	    hasPermission: "viewAnalytics",
	    icon: 'fa-bar-chart'
	  });
	});

/***/ },
/* 78 */
/*!****************************************************!*\
  !*** ./client/admin/code/analytics/analytics.jade ***!
  \****************************************************/
/***/ function(module, exports) {

	var path = 'admin/code/analytics/analytics.jade';
	var html = "<div id=\"meanbase-analytics\" class=\"container\"><div class=\"row\"><div class=\"col-xs-6 col-md-4\"><div class=\"form-group\"><label>Google Analytics App ID</label><input type=\"text\" ng-model=\"appID\" class=\"form-control\"><button ng-click=\"changeAppID(appID)\" class=\"btn btn-success btn-block\">Set App ID</button></div></div><div class=\"col-xs-6 col-md-4\"><div class=\"form-group\"><label>Google Analytics Client ID</label><input type=\"text\" ng-model=\"clientID\" class=\"form-control\"><button ng-click=\"changeClientID(clientID)\" class=\"btn btn-success btn-block\">Set Client ID</button></div></div><div class=\"col-xs-12 col-md-4\"><div class=\"form-group\"><label>Site Verification ID [for email]</label><input type=\"text\" ng-model=\"verificationID\" class=\"form-control\"><button ng-click=\"changeVerificationID(verificationID)\" class=\"btn btn-success btn-block\">Set Verification ID</button></div></div></div><section id=\"auth-button\"></section><section id=\"view-selector\"></section><section id=\"chart\"></section><ng-analytics-auth label=\"Hello: \" hide-on-auth=\"true\" auth-container=\"auth-button\"></ng-analytics-auth><ng-analytics-view view-selector-container=\"view-selector\" auth-container=\"auth-button\"></ng-analytics-view><ng-analytics-chart chart=\"chart\" view-selector-container=\"view-selector\" auth-container=\"auth-button\"></ng-analytics-chart><ng-analytics-report queries=\"queries\" auth-container=\"auth-button\" view-selector-container=\"view-selector\"></ng-analytics-report></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 79 */
/*!*************************************************************!*\
  !*** ./client/admin/code/analytics/analytics.controller.js ***!
  \*************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	angular.module('meanbaseApp').controller('AnalyticsCtrl', function ($scope, api, toastr) {
	  $scope.$parent.pageTitle = 'Site Traffic and Stats';
	
	  api.settings.find({ name: 'appID' }).success(function (res) {
	    if (!res[0]) {
	      return false;
	    }
	    $scope.appID = res[0].value;
	  });
	
	  api.settings.find({ name: 'clientID' }).success(function (res) {
	    if (!res[0]) {
	      return false;
	    }
	    $scope.clientID = res[0].value;
	  });
	
	  api.settings.find({ name: 'verificationID' }).success(function (res) {
	    if (!res[0]) {
	      return false;
	    }
	    $scope.verificationID = res[0].value;
	  });
	
	  $scope.changeAppID = function (id) {
	    if (!id) {
	      return false;
	    }
	    api.settings.update({ name: 'appID' }, { value: id }).success(function (response) {
	      toastr.success('Set app id to ' + id);
	    });
	  };
	
	  $scope.changeClientID = function (clientID) {
	    if (!clientID) {
	      return false;
	    }
	    api.settings.update({ name: 'clientID' }, { value: clientID }).success(function (response) {
	      toastr.success('Set app clientID to ' + clientID);
	    });
	  };
	
	  $scope.changeVerificationID = function (verificationID) {
	    if (!verificationID) {
	      return false;
	    }
	    api.settings.update({ name: 'verificationID' }, { value: verificationID }).success(function (response) {
	      toastr.success('Set app verificationID to ' + verificationID);
	    });
	  };
	
	  $scope.chart = {
	    reportType: 'ga',
	    query: {
	      metrics: 'ga:sessions',
	      dimensions: 'ga:date',
	      'start-date': '30daysAgo',
	      'end-date': 'yesterday',
	      ids: 'ga:XXXXXX' // put your viewID here or leave it empty if connected with a viewSelector
	    },
	    chart: {
	      container: 'chart', // id of the created DOM-element
	      type: 'LINE',
	      options: {
	        width: '100%'
	      }
	    }
	  };
	
	  $scope.queries = [{
	    query: {
	      ids: 'view-selector', // put your viewID here
	      metrics: 'ga:sessions',
	      dimensions: 'ga:city'
	    }
	  }];
	});

/***/ },
/* 80 */
/*!********************************************************!*\
  !*** ./client/admin/code/analytics/import/import.jade ***!
  \********************************************************/
/***/ function(module, exports) {

	var path = 'admin/code/analytics/import/import.jade';
	var html = "<p>Import data from wordpress using an xml file</p><div nv-file-drop=\"uploader\" uploader=\"uploader\" class=\"drop-zone text-center form-inline\"><p>Drop <strong>xml</strong> file here to upload or</p><div class=\"form-group text-center\"><input type=\"file\" nv-file-select multiple uploader=\"uploader\" class=\"form-control\"></div><div class=\"progress\"><div role=\"progressbar\" ng-style=\"{ \'width\': uploader.progress + \'%\' }\" class=\"progress-bar\"></div></div></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 81 */
/*!****************************************************!*\
  !*** ./client/shared/cms.headbar/cms.headbar.jade ***!
  \****************************************************/
/***/ function(module, exports) {

	var path = 'shared/cms.headbar/cms.headbar.jade';
	var html = "<!--meanbase Head Tool Bar --><nav id=\"mb-headbar\" role=\"navigation\" ng-if=\"isLoggedIn\" ng-controller=\"cms.headbar.controller as headbar\" class=\"navbar navbar-default navbar-fixed-top navbar-inverse\"><div class=\"navbar-header\"><button ng-init=\"cmsHeabarClosed = true\" ng-click=\"cmsHeabarClosed = !cmsHeabarClosed\" class=\"navbar-toggle collapsed\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"/cms\" target=\"_self\" class=\"navbar-brand\">Manage Site</a></div><div id=\"mb-headbar-child\" collapse=\"cmsHeabarClosed\" class=\"navbar-collapse\"><ul class=\"nav navbar-nav\"><li ng-show=\"currentUser.permissions.indexOf(\'editContent\') &gt; -1\" class=\"dropdown\"><a data-toggle=\"dropdown\" role=\"button\" class=\"dropdown-toggle\">Create Page</a><ul role=\"menu\" class=\"dropdown-menu\"><li ng-repeat=\"template in themeTemplates\"><a href=\"#\" ng-click=\"headbar.createPage($event)\" ng-mouseover=\"headbar.showScreenshot(template)\" ng-mouseleave=\"headbar.hideScreenshot(template)\">{{template}}</a></li></ul></li><li ng-show=\"currentUser.permissions.indexOf(\'editContent\') &gt; -1\"><a ng-hide=\"editMode\" ng-click=\"headbar.toggleEdit()\">Edit</a><button ng-show=\"editMode\" ng-click=\"headbar.saveChanges()\" class=\"btn btn-success\">Save</button></li><li ng-show=\"editMode\"><button ng-click=\"headbar.editPageModal()\" class=\"btn btn-info\">Settings</button></li><li ng-show=\"editMode\"><button ng-click=\"headbar.discardChanges()\" class=\"btn btn-warning\">Discard</button></li><li ng-show=\"currentUser.permissions.indexOf(\'deleteContent\') &gt; -1 &amp;&amp; editMode\"><button ng-click=\"headbar.deletePage()\" class=\"btn btn-danger\">Delete page</button></li><li ng-show=\"currentUser.permissions.indexOf(\'publishContent\') &gt; -1 &amp;&amp; editMode\"><button ng-click=\"headbar.togglePublishPage()\" class=\"btn btn-primary\"><span ng-hide=\"page.published\">Publish</span><span ng-show=\"page.published\">Unpublish</span></button></li></ul><ul class=\"nav navbar-nav navbar-right\"><li class=\"dropdown\"><a data-toggle=\"dropdown\" role=\"button\" class=\"dropdown-toggle\">Hi, {{currentUser.name}} ({{currentUser.role}})</a><ul role=\"menu\" class=\"dropdown-menu dropdown-menu-right\"><li><a ng-click=\"logout()\">Log Out</a></li><li><a ui-sref=\"settings\">Account Settings</a></li></ul></li></ul></div></nav>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 82 */
/*!****************************************!*\
  !*** ./client/shared/modal/modal.jade ***!
  \****************************************/
/***/ function(module, exports) {

	var path = 'shared/modal/modal.jade';
	var html = "<div class=\"modal-header\"><button ng-if=\"modal.dismissable\" type=\"button\" ng-click=\"$dismiss()\" class=\"close\">&times;</button><h4 ng-if=\"modal.title\" ng-bind=\"modal.title\" class=\"modal-title\"></h4></div><div class=\"modal-body\"><p ng-if=\"modal.text\" ng-bind=\"modal.text\"></p><div ng-if=\"modal.html\" ng-bind-html=\"modal.html\"></div></div><div class=\"modal-footer\"><button ng-repeat=\"button in modal.buttons\" ng-class=\"button.classes\" ng-click=\"button.click($event)\" ng-bind=\"button.text\" class=\"btn\"></button></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 83 */
/*!******************************************!*\
  !*** ./client/shared/navbar/navbar.jade ***!
  \******************************************/
/***/ function(module, exports) {

	var path = 'shared/navbar/navbar.jade';
	var html = "<div ng-controller=\"NavbarCtrl\" class=\"navbar navbar-default navbar-static-top\"><div class=\"container\"><div class=\"navbar-header\"><button type=\"button\" ng-click=\"isCollapsed = !isCollapsed\" class=\"navbar-toggle\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"/\" class=\"navbar-brand\">home</a></div><div id=\"navbar-main\" collapse=\"isCollapsed\" class=\"navbar-collapse collapse\"><ul class=\"nav navbar-nav navbar-right\"><li ng-hide=\"isLoggedIn()\" ng-class=\"{active: isActive(&quot;/signup&quot;)}\"><a href=\"/signup\">Sign up</a></li><li ng-hide=\"isLoggedIn()\" ng-class=\"{active: isActive(&quot;/login&quot;)}\"><a href=\"/login\">Login</a></li><li ng-show=\"isLoggedIn()\"><p class=\"navbar-text\">Hello {{ getCurrentUser().name }}</p></li><li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive(&quot;/settings&quot;)}\"><a href=\"/settings\"><span class=\"glyphicon glyphicon-cog\"></span></a></li><li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive(&quot;/logout&quot;)}\"><a href=\"\" ng-click=\"logout()\">Logout</a></li></ul></div></div></div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 84 */
/*!**********************************************!*\
  !*** ./client/shared/sortable/sortable.jade ***!
  \**********************************************/
/***/ function(module, exports) {

	var path = 'shared/sortable/sortable.jade';
	var html = "<div>this is the sortable directive</div>";
	window.angular.module('meanbaseApp').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 85 */
/*!************************************!*\
  !*** ./client/admin/code/app.styl ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./../../../~/stylus-loader!./app.styl */ 86);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./app.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./app.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 86 */
/*!*********************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/admin/code/app.styl ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, ".browsehappy {\n  background: #ccc;\n  color: #000;\n  margin: 0.2em 0;\n  padding: 0.2em 0;\n}\n", ""]);
	
	// exports


/***/ },
/* 87 */
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 88 */
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 89 */
/*!****************************************************!*\
  !*** ./client/admin/code/analytics/analytics.styl ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./../../../../~/stylus-loader!./analytics.styl */ 90);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./analytics.styl", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./analytics.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 90 */
/*!*************************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/admin/code/analytics/analytics.styl ***!
  \*************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, "#meanbase-analytics {\n  padding-top: 1em;\n}\n#meanbase-analytics button {\n  margin-top: 0.5em;\n}\n", ""]);
	
	// exports


/***/ },
/* 91 */
/*!****************************************!*\
  !*** ./client/admin/code/cms/cms.styl ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./../../../../~/stylus-loader!./cms.styl */ 92);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./cms.styl", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./cms.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 92 */
/*!*************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/admin/code/cms/cms.styl ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, "/*\n * Start Bootstrap - Simple Sidebar HTML Template (http://startbootstrap.com)\n * Code licensed under the Apache License v2.0.\n * For details, see http://www.apache.org/licenses/LICENSE-2.0.\n */\n/* Toggle Styles */\n#wrapper {\n  box-sizing: border-box;\n  padding-left: 0;\n  -webkit-transition: all 0.5s ease;\n  -moz-transition: all 0.5s ease;\n  -o-transition: all 0.5s ease;\n  transition: all 0.5s ease;\n}\n#wrapper.toggled {\n  padding-left: 200px;\n}\n#sidebar-wrapper {\n  z-index: 1000;\n  position: fixed;\n  left: 200px;\n  width: 0;\n  height: 100%;\n  margin-left: -200px;\n  overflow-y: auto;\n  background: #000;\n  -webkit-transition: all 0.5s ease;\n  -moz-transition: all 0.5s ease;\n  -o-transition: all 0.5s ease;\n  transition: all 0.5s ease;\n}\n#wrapper.toggled #sidebar-wrapper {\n  width: 200px;\n}\n#meanbase-cms {\n  width: 100%;\n}\n#wrapper.toggled #meanbase-cms {\n  position: absolute;\n  margin-right: -200px;\n}\n/* Sidebar Styles */\n.sidebar-nav {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 200px;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.sidebar-nav li {\n  text-indent: 10px;\n  line-height: 40px;\n}\n.sidebar-nav li {\n  cursor: pointer;\n}\n.sidebar-nav a {\n  text-decoration: none;\n  color: #999;\n}\n.sidebar-nav i {\n  font-size: 1.3em;\n  margin-right: 0.75em;\n  color: #666;\n}\n.sidebar-nav li.disabled {\n  display: none;\n  text-decoration: none;\n  color: #555;\n}\n.sidebar-nav li:hover {\n  text-decoration: none;\n  background: rgba(255,255,255,0.2);\n}\n.sidebar-nav li:hover a {\n  color: #fff;\n}\n.sidebar-nav li:hover i {\n  color: #999;\n}\n.sidebar-nav li.disabled:hover {\n  background: none;\n  color: #555;\n}\n.sidebar-nav li a:active,\n.sidebar-nav li a:focus {\n  text-decoration: none;\n}\n.sidebar-nav > .sidebar-brand {\n  height: 65px;\n  font-size: 18px;\n  line-height: 60px;\n}\n.sidebar-nav > .sidebar-brand {\n  text-indent: 20px;\n}\n.sidebar-nav > .sidebar-brand a {\n  color: #999;\n}\n.sidebar-nav > .sidebar-brand a:hover {\n  color: #fff;\n  background: none;\n}\np {\n  font-size: 1.2em;\n  color: WET-ASPHALT;\n  line-height: 1.6em;\n  padding: 0.5em 0.25em;\n}\n#meanbase-cms .container {\n  margin-left: 1em;\n}\n#content-cms {\n  padding: 1em;\n}\n@media (min-width: 768px) {\n  .dont-hide {\n    display: inline-block;\n  }\n  #meanbase-cms .container {\n    width: 100%;\n  }\n  #wrapper {\n    padding-left: 200px;\n  }\n  #wrapper.toggled {\n    padding-left: 0;\n  }\n  #sidebar-wrapper {\n    width: 200px;\n  }\n  #wrapper.toggled #sidebar-wrapper {\n    width: 0;\n  }\n  #wrapper.toggled #meanbase-cms {\n    position: relative;\n    margin-right: 0;\n  }\n}\n", ""]);
	
	// exports


/***/ },
/* 93 */
/*!**************************************************!*\
  !*** ./client/admin/code/comments/comments.styl ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./../../../../~/stylus-loader!./comments.styl */ 94);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./comments.styl", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./comments.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 94 */
/*!***********************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/admin/code/comments/comments.styl ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, "#meanbase-cms .margin-top {\n  margin-top: 1em;\n}\n#meanbase-cms .panel-group .panel {\n  overflow: initial;\n}\n#meanbase-cms .commment-author {\n  padding-left: 0.75em;\n}\n#meanbase-cms .date-field {\n  margin-bottom: 0;\n}\n#meanbase-cms #moderate-comments .form-group .btn {\n  margin-right: 0.5em;\n  margin-bottom: 0.5em;\n}\n", ""]);
	
	// exports


/***/ },
/* 95 */
/*!******************************************************!*\
  !*** ./client/admin/code/extensions/extensions.styl ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./../../../../~/stylus-loader!./extensions.styl */ 96);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./extensions.styl", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./extensions.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 96 */
/*!***************************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/admin/code/extensions/extensions.styl ***!
  \***************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, ".delete-extension-button,\n.enable-extension-button {\n  margin: 0.5em 1em 0 0;\n}\n.meanbase-extension-block {\n  height: 300px;\n}\n.meanbase-extension-block img {\n  max-height: 100%;\n  width: 100%;\n}\n", ""]);
	
	// exports


/***/ },
/* 97 */
/*!********************************************!*\
  !*** ./client/admin/code/media/media.styl ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./../../../../~/stylus-loader!./media.styl */ 98);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./media.styl", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./media.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 98 */
/*!*****************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/admin/code/media/media.styl ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, "#meanbase-cms .drop-zone {\n  padding: 1em;\n  background-color: CLOUDS;\n  border: 2px dashed CONCRETE;\n}\n#meanbase-cms .drop-zone p {\n  margin-bottom: 0;\n  padding: 0;\n}\n#meanbase-cms .drop-zone .progress {\n  margin-top: 0.5em;\n  margin-bottom: 0;\n}\n#meanbase-cms .nv-file-over {\n  background-color: SILVER;\n  border-color: CLOUDS;\n}\n", ""]);
	
	// exports


/***/ },
/* 99 */
/*!**********************************************!*\
  !*** ./client/admin/code/themes/themes.styl ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./../../../../~/stylus-loader!./themes.styl */ 100);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./themes.styl", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./themes.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 100 */
/*!*******************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/admin/code/themes/themes.styl ***!
  \*******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, "#meanbase-cms .img-thumbnail {\n  cursor: pointer;\n}\n#meanbase-cms .mb-theme {\n  padding: 1em;\n}\n.template-tags {\n  vertical-align: middle;\n  display: inline-block;\n  min-width: 80%;\n  margin-bottom: 0;\n  padding: 0 0.5em;\n}\n.template-label {\n  vertical-align: middle;\n  margin-bottom: 0;\n  width: 80px;\n  margin-right: 1em;\n}\n.your-templates-label {\n  width: 80px;\n  margin-right: 1em;\n}\ntags-input .tags {\n  padding: 0;\n  margin: 0;\n  background-color: transparent;\n  box-shadow: none;\n  border: none;\n  outline: none;\n}\ntags-input .tags.focused {\n  box-shadow: none;\n  -webkit-box-shadow: none;\n  outline: none;\n}\ntags-input .tags .input {\n  border-bottom: 2px solid #808080;\n  background-color: transparent;\n}\ntags-input .tags .tag-list .tag-item {\n  height: auto;\n  border: none;\n  background: none;\n  background-color: #fff;\n  padding: 0 0.5em;\n}\n.mb-active-theme {\n  padding: 0.75em 1em;\n  margin-top: 0.5em;\n}\n", ""]);
	
	// exports


/***/ },
/* 101 */
/*!********************************************!*\
  !*** ./client/admin/code/users/users.styl ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./../../../../~/stylus-loader!./users.styl */ 102);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./users.styl", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./users.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 102 */
/*!*****************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/admin/code/users/users.styl ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, "#meanbase-cms #users,\n#meanbase-cms .form-group {\n  position: relative;\n  display: inline-block;\n}\n#meanbase-cms .mb-input {\n  background-color: transparent;\n  border: 2px solid #27ae60;\n  border-radius: 3px;\n  outline: none;\n  padding: 0.4em 0.4em;\n  font-size: 1.2em;\n  width: 100%;\n  box-sizing: border-box;\n}\n#meanbase-cms .mb-inputfocus {\n  border-color: #2ecc71;\n}\n#meanbase-cms #mb-users .mb-form-group {\n  padding: 0.5em 1em 0.5em 0;\n  width: 50%;\n}\n#meanbase-cms .mb-user-info {\n  font-size: 1.2em;\n  font-weight: bold;\n}\n#meanbase-cms .mb-calendar {\n  font-size: 1.5em;\n  padding: 0.25em 0.5em;\n}\n#meanbase-cms .mb-calendar,\n#meanbase-cms .mb-share-optionbefore,\n#meanbase-cms .mb-lockbefore {\n  font-family: \"FontAwesome\";\n}\n#meanbase-cms .panel-select {\n  background-color: #27ae60;\n  color: #ecf0f1;\n  border: none;\n  font-size: 1.5em;\n  border-radius: 3px;\n}\n#meanbase-cms .panel button {\n  margin-left: 0.5em;\n}\n#meanbase-cms .panel-dark {\n  margin-bottom: 0.5em;\n}\n#meanbase-cms .panel-dark .panel-head {\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px;\n  background-color: #2c3e50;\n  padding: 0.5em;\n}\n#meanbase-cms .panel-dark .panel-head button {\n  margin-left: 0.5em;\n}\n#meanbase-cms .panel-dark .panel-head .panel-title {\n  display: inline-block;\n  vertical-align: middle;\n  padding: 0.5em;\n}\n#meanbase-cms .panel-dark .panel-head .panel-righthand {\n  display: inline-block;\n  box-sizing: border-box;\n  vertical-align: middle;\n  text-align: right;\n  padding: 0.5em;\n}\n#meanbase-cms .panel-dark .panel-body {\n  background-color: #ecf0f1;\n  border: 2px solid #2c3e50;\n  padding: 1em;\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n}\n#meanbase-cms .panel-dark button,\n#meanbase-cms .panel-dark input[type=\"submit\"] {\n  color: #ecf0f1;\n  padding: 0.5em 1em;\n  border: none;\n  border-radius: 3px;\n  margin: 2px;\n  outline: none;\n}\n#meanbase-cms .panel-dark input[type=\"submit\"] {\n  background-color: #27ae60;\n}\n#meanbase-cms .panel-dark input[type=\"submit\"]:hover {\n  background-color: #2ecc71;\n}\n#meanbase-cms .panel-dark select {\n  background-color: #27ae60;\n  color: #ecf0f1;\n  border: none;\n  font-size: 1.5em;\n  border-radius: 3px;\n}\n#meanbase-cms .panel-dark .panel-body-open {\n  display: block;\n}\n#meanbase-cms .p-1 {\n  padding: 1em;\n}\n#meanbase-cms .p-1 .form-group {\n  display: block;\n}\n#meanbase-cms #users input[type=email] + label,\n#meanbase-cms #users input[type=text] + label,\n#meanbase-cms #users input[type=url] + label,\n#meanbase-cms #users input[type=tel] + label,\n#meanbase-cms #users input[type=search] + label,\n#meanbase-cms #users input[type=number] + label,\n#meanbase-cms #users input[type=password] + label,\n#meanbase-cms #users input[type=hidden] + label {\n  position: absolute;\n  font-size: 19px;\n  top: 4px;\n  color: #ddd;\n  left: 12px;\n}\n#meanbase-cms #users input[type=radio],\n#meanbase-cms #users input[type=checkbox] {\n  display: none;\n}\n#meanbase-cms #users input[type=radio] + label,\n#meanbase-cms #users input[type=checkbox] + label {\n  font-size: 1.3em;\n  font-family: 'Montserrat', sans-serif;\n  width: 250px;\n}\n#meanbase-cms #users input[type=radio] + label:before,\n#meanbase-cms #users input[type=checkbox] + label:before {\n  display: inline-block;\n  vertical-align: middle;\n  font-family: 'FontAwesome';\n  font-size: 1.5em;\n  color: #2c3e50;\n  margin-right: 0.5em;\n}\n#meanbase-cms #users input[type=radio] + label:before {\n  content: \"\\F10C\";\n}\n#meanbase-cms #users input[type=checkbox] + label:before {\n  content: \"\\F0C8\";\n}\n#meanbase-cms #users input[type=radio]:checked + label:before {\n  content: \"\\F05D\";\n}\n#meanbase-cms #users input[type=checkbox]:checked + label:before {\n  content: \"\\F14A\";\n}\n#meanbase-cms .mb-toggle-switch {\n  margin-top: -1em;\n}\n#meanbase-cms .mb-toggle-switch input {\n  display: none;\n}\n#meanbase-cms .mb-toggle-switch input + span.mb-switch:before {\n  font-family: 'FontAwesome';\n  font-size: 2.75em;\n  content: \"\\F204\" ;\n  color: #2c3e50;\n}\n#meanbase-cms .mb-toggle-switch input:checked + span.mb-switch:before {\n  content: \"\\F205\" ;\n  color: #27ae60;\n}\n", ""]);
	
	// exports


/***/ },
/* 103 */
/*!********************************************************!*\
  !*** ./client/admin/code/analytics/import/import.styl ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../../~/css-loader!./../../../../../~/stylus-loader!./import.styl */ 104);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/stylus-loader/index.js!./import.styl", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/stylus-loader/index.js!./import.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 104 */
/*!*****************************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/admin/code/analytics/import/import.styl ***!
  \*****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, "", ""]);
	
	// exports


/***/ },
/* 105 */
/*!****************************************************!*\
  !*** ./client/shared/cms.headbar/cms.headbar.styl ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./../../../~/stylus-loader!./cms.headbar.styl */ 106);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./cms.headbar.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./cms.headbar.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 106 */
/*!*************************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/shared/cms.headbar/cms.headbar.styl ***!
  \*************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, ".template-screenshot {\n  position: absolute;\n  max-width: 90%;\n  max-height: 80%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  left: 50%;\n  z-index: 11;\n}\n.template-screenshot-backdrop {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  width: 100%;\n  background-color: #fff;\n  z-index: 10;\n}\n.meanbase-front #mb-headbar a {\n  cursor: pointer;\n}\n.meanbase-front #mb-headbar .btn {\n  margin: 10px 4px;\n  padding: 5px 10px;\n  font-size: 0.9em;\n  outline: none;\n}\n.meanbase-front .mb-loading-screen {\n  padding-top: 1em;\n  color: #2c3e50;\n}\n.meanbase-front [contenteditable=\"true\"] {\n  outline: none;\n}\n.meanbase-front [contenteditable=\"true\"]:hover {\n  outline: 2px solid #2ecc71;\n  outline-offset: 1px;\n}\n.meanbase-front [contenteditable=\"true\"]:focus {\n  outline: none;\n}\n.meanbase-front .navbar {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  text-transform: none;\n  font-weight: normal;\n}\n.meanbase-front .navbar-fixed-top {\n  padding: 0;\n  margin: 0;\n}\n.meanbase-front .navbar-fixed-top .navbar-brand {\n  padding: 15px 10px;\n  font-size: 16px;\n}\n.meanbase-front .navbar-nav {\n  margin: 0;\n  padding: 0;\n}\n.scrollable-body {\n  max-height: 300px;\n  overflow: auto;\n}\n", ""]);
	
	// exports


/***/ },
/* 107 */
/*!************************************************************!*\
  !*** ./client/shared/extensions-area/extensions-area.styl ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./../../../~/stylus-loader!./extensions-area.styl */ 108);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./extensions-area.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./extensions-area.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 108 */
/*!*********************************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/shared/extensions-area/extensions-area.styl ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, ".universal-extension-edit-buttons {\n  margin-bottom: 1em;\n  background-color: CLOUDS;\n  padding: 0.5em;\n  margin-top: -15px;\n  border-radius: 4px;\n  margin-bottom: 0.5em;\n}\n.universal-extension-edit-buttons button {\n  margin: 0.5em 1em 0.5em 0;\n}\n.mb-drag-to-room {\n  margin: 0 0.5em 0.75em;\n  padding: 1.5em 1em 0.5em;\n  background-color: CLOUDS;\n  border: 2px dashed SILVER;\n}\n", ""]);
	
	// exports


/***/ },
/* 109 */
/*!********************************************************************!*\
  !*** ./client/shared/extensions-selector/extensions-selector.styl ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./../../../~/stylus-loader!./extensions-selector.styl */ 110);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./extensions-selector.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./extensions-selector.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 110 */
/*!*****************************************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/shared/extensions-selector/extensions-selector.styl ***!
  \*****************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, ".extensions-selector .nav-tabs {\n  cursor: pointer;\n}\n.extensions-selector .form-group {\n  margin-top: 1em;\n}\n.extensions-selector .extensions-list {\n  max-height: 300px;\n  overflow: auto;\n}\n.extensions-selector .list-item {\n  position: relative;\n  overflow: hidden;\n  padding: 0.3em;\n  margin: 0.5em 0;\n  border-bottom: 2px solid CLOUDS;\n  cursor: pointer;\n}\n.extensions-selector .list-image {\n  display: inline-block;\n  vertical-align: middle;\n  max-width: 200px;\n}\n.extensions-selector .checkbox {\n  position: absolute;\n  top: 50%;\n  right: 1em;\n  margin: 0;\n  transform: translateY(-50%);\n  display: inline-block;\n  color: MIDNIGHT-BLUE;\n  font-size: 1.5em;\n}\n.extensions-selector .list-title {\n  display: inline-block;\n  vertical-align: middle;\n  margin: 0 0;\n  color: MIDNIGHT-BLUE;\n  margin: 0.3em;\n}\n.extensions-selector .choose-extensions {\n  margin: 1em 0;\n}\n", ""]);
	
	// exports


/***/ },
/* 111 */
/*!****************************************************************!*\
  !*** ./client/shared/find-images-modal/find-images-modal.styl ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./../../../~/stylus-loader!./find-images-modal.styl */ 112);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./find-images-modal.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./find-images-modal.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 112 */
/*!*************************************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/shared/find-images-modal/find-images-modal.styl ***!
  \*************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, "", ""]);
	
	// exports


/***/ },
/* 113 */
/*!**************************************************!*\
  !*** ./client/shared/findImages/findImages.styl ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./../../../~/stylus-loader!./findImages.styl */ 114);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./findImages.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./findImages.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 114 */
/*!***********************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/shared/findImages/findImages.styl ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, "/* Morph Button: Default Styles */\n.morph-button {\n  position: relative;\n  display: block;\n  margin: 0 auto;\n}\n.morph-content .content-style-overlay {\n  text-align: left;\n}\n.morph-content .content-style-overlay h2 {\n  display: inline-block;\n  padding-left: 0.5em;\n  color: CLOUDS;\n}\n.morph-content .content-style-overlay button.choose-images-button {\n  margin: 0.5em;\n  margin-top: 1.5em;\n}\n.morph-content .content-style-overlay .escape {\n  float: right;\n  margin: 0.5em;\n  margin-top: 1.1em;\n  color: CLOUDS;\n  cursor: pointer;\n}\n.morph-button > button {\n  position: relative;\n  padding: 0 1em;\n  border: none;\n  background-color: MIDNIGHT-BLUE;\n  color: #f9f6e5;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  font-weight: 700;\n  line-height: 80px;\n  overflow: hidden;\n}\n.morph-button.open > button {\n  pointer-events: none;\n}\n.morph-content {\n  pointer-events: none;\n}\n.morph-button.open .morph-content {\n  pointer-events: auto;\n}\n/* Common styles for overlay and modal type (fixed morph) */\n.morph-button-fixed,\n.morph-button-fixed .morph-content {\n  width: 300px;\n  height: 80px;\n}\n.morph-button-fixed > button {\n  z-index: 1000;\n  width: 100%;\n  height: 100%;\n  -webkit-transition: opacity 0.1s 0.5s;\n  transition: opacity 0.1s 0.5s;\n  outline: none;\n}\n.morph-button-fixed.open > button {\n  opacity: 0;\n  -webkit-transition: opacity 0.1s;\n  transition: opacity 0.1s;\n}\n.morph-button-fixed .morph-content {\n  position: fixed;\n  z-index: 900;\n  opacity: 0;\n  -webkit-transition: opacity 0.3s 0.5s, width 0.4s 0.1s, height 0.4s 0.1s, top 0.4s 0.1s, left 0.4s 0.1s, margin 0.4s 0.1s;\n  transition: opacity 0.3s 0.5s, width 0.4s 0.1s, height 0.4s 0.1s, top 0.4s 0.1s, left 0.4s 0.1s, margin 0.4s 0.1s;\n}\n.morph-button-fixed.open .morph-content {\n  opacity: 1;\n}\n.morph-button-fixed .morph-content > div {\n  visibility: hidden;\n  height: 0;\n  opacity: 0;\n  -webkit-transition: opacity 0.1s, visibility 0s 0.1s, height 0s 0.1s;\n  transition: opacity 0.1s, visibility 0s 0.1s, height 0s 0.1s;\n}\n.morph-button-fixed.open .morph-content > div {\n  visibility: visible;\n  height: auto;\n  opacity: 1;\n  -webkit-transition: opacity 0.3s 0.5s;\n  transition: opacity 0.3s 0.5s;\n}\n.morph-button-fixed.active > button {\n  z-index: 2000;\n}\n.morph-button-fixed.active .morph-content {\n  z-index: 1900;\n}\n/* Transitions for overlay button and sidebar button */\n.morph-button-overlay .morph-content,\n.morph-button-sidebar .morph-content {\n  -webkit-transition: opacity 0.3s 0.5s, width 0.4s 0.1s, height 0.4s 0.1s, top 0.4s 0.1s, left 0.4s 0.1s;\n  transition: opacity 0.3s 0.5s, width 0.4s 0.1s, height 0.4s 0.1s, top 0.4s 0.1s, left 0.4s 0.1s;\n}\n.morph-button-overlay.open .morph-content,\n.morph-button-sidebar.open .morph-content {\n  -webkit-transition: width 0.4s 0.1s, height 0.4s 0.1s, top 0.4s 0.1s, left 0.4s 0.1s;\n  transition: width 0.4s 0.1s, height 0.4s 0.1s, top 0.4s 0.1s, left 0.4s 0.1s;\n}\n/* Morph Button Style: Overlay */\n.morph-button-overlay .morph-content {\n  overflow: hidden;\n  background: MIDNIGHT-BLUE;\n}\n.morph-button-overlay.open .morph-content {\n  top: 0 !important;\n  left: 0 !important;\n  width: 100%;\n  height: 100%;\n}\n/* Morph Button Style: Modal */\n.morph-button-modal::before {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 800;\n  width: 100%;\n  height: 100%;\n  background: rgba(0,0,0,0.5);\n  content: '';\n  opacity: 0;\n  -webkit-transition: opacity 0.5s;\n  transition: opacity 0.5s;\n  pointer-events: none;\n}\n.morph-button-modal.open::before {\n  opacity: 1;\n  pointer-events: auto;\n}\n.morph-button-modal.active::before {\n  z-index: 1800;\n}\n.morph-button-modal .morph-content {\n  overflow: hidden;\n  -webkit-transition: opacity 0.3s 0.5s, width 0.4s 0.1s, height 0.4s 0.1s, top 0.4s 0.1s, left 0.4s 0.1s, margin 0.4s 0.1s;\n  transition: opacity 0.3s 0.5s, width 0.4s 0.1s, height 0.4s 0.1s, top 0.4s 0.1s, left 0.4s 0.1s, margin 0.4s 0.1s;\n}\n.morph-button-modal.open .morph-content {\n  top: 50% !important;\n  left: 50% !important;\n  margin: -210px 0 0 -300px;\n  width: 600px;\n  height: 420px;\n  -webkit-transition: width 0.4s 0.1s, height 0.4s 0.1s, top 0.4s 0.1s, left 0.4s 0.1s, margin 0.4s 0.1s;\n  transition: width 0.4s 0.1s, height 0.4s 0.1s, top 0.4s 0.1s, left 0.4s 0.1s, margin 0.4s 0.1s;\n}\n/* Colors and sizes for individual modals */\n.morph-button.morph-button-modal-1 {\n  float: left;\n}\n.morph-button.morph-button-modal-2,\n.morph-button.morph-button-modal-3 {\n  display: inline-block;\n  margin: 10px 15px;\n}\n.morph-button-modal-1 > button,\n.morph-button-modal-1 .morph-content {\n  background-color: #553445;\n}\n.morph-button-modal-2 > button,\n.morph-button-modal-2 .morph-content,\n.morph-button-modal-3 > button,\n.morph-button-modal-3 .morph-content {\n  background-color: #fef0e3;\n  color: #e75854;\n}\n.morph-button-modal-4 {\n  display: inline-block;\n}\n.morph-button-modal-4 > button,\n.morph-button-modal-4 .morph-content {\n  background-color: #faf1e0;\n  color: #553445;\n}\n.morph-button-modal-4 > button span,\n.morph-button-modal-4 .morph-clone {\n  padding-left: 10px;\n  color: #286f81;\n}\n.morph-button-modal-4 .morph-clone {\n  position: absolute;\n  right: 34px;\n  bottom: 30px;\n  z-index: 100;\n  letter-spacing: 1px;\n  font-weight: 700;\n  -webkit-transition: bottom 0.4s 0.1s, right 0.4s 0.1s;\n  transition: bottom 0.4s 0.1s, right 0.4s 0.1s;\n}\n.morph-button-modal-4.open .morph-clone,\n.no-js .morph-button-modal-4 .morph-clone {\n  right: 10px;\n  bottom: 10px;\n}\n.morph-button-modal-1::before {\n  background: rgba(240,221,204,0.7);\n}\n.morph-button-modal-2.open .morph-content {\n  margin: -210px 0 0 -170px;\n  width: 340px;\n  height: 420px;\n}\n.morph-button-modal-3.open .morph-content {\n  margin: -255px 0 0 -210px;\n  width: 420px;\n  height: 510px;\n}\n.morph-button-modal-3.open .morph-content > div {\n  height: 420px;\n}\n.morph-button-modal-2.open .morph-content > div,\n.morph-button-modal-3.open .morph-content > div,\ntransition opacity 0.3s 0.3s,\n.morph-button-modal-4.open .morph-content {\n  margin: -200px 0 0 -320px;\n  width: 640px;\n  height: 400px;\n}\n/* Morph Button Style: In the content flow */\n.morph-button-inflow {\n  overflow: hidden;\n  max-width: 100%;\n  height: 70px;\n}\n.morph-button-inflow > button {\n  width: 100%;\n  line-height: 70px;\n}\n.morph-button-inflow .morph-content {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n}\n.morph-button-inflow .morph-content .morph-clone {\n  padding: 0;\n  font-weight: 700;\n  font-size: 1.5em;\n  line-height: 70px;\n}\n/* Colors and sizes for individual in flow buttons */\n.morph-button-inflow-1 {\n  width: 600px;\n  margin: 2em auto;\n  -webkit-transition: height 0.5s cubic-bezier(0.7, 0, 0.3, 1);\n  transition: height 0.5s cubic-bezier(0.7, 0, 0.3, 1);\n}\n.morph-button-inflow-1 > button span {\n  visibility: hidden;\n}\n.morph-button-inflow-1 .morph-content .morph-clone {\n  color: #f9f6e5;\n  background: MIDNIGHT-BLUE;\n}\n.morph-button-inflow-2 {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 220px;\n  background-color: #fef0e3;\n  -webkit-transition: height 0.3s, width 0.3s, -webkit-transform 0.3s;\n  transition: height 0.3s, width 0.3s, transform 0.3s;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n  transform: translateX(-50%) translateY(-50%);\n}\n.morph-button-inflow-2 > button {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: transparent;\n  color: #e75854;\n  -webkit-transition: -webkit-transform 0.3s;\n  transition: transform 0.3s;\n}\n.morph-button-inflow-2.open > button {\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n}\n.morph-button-inflow-2 .morph-content {\n  width: 260px;\n  height: 200px;\n}\n.morph-button-inflow-2.open {\n  width: 260px;\n}\n/* Morph Button Style: Sidebar */\n.morph-button-sidebar,\n.morph-button-sidebar .morph-content {\n  width: 60px;\n  height: 60px;\n}\n.morph-button-sidebar {\n  position: fixed;\n  bottom: 50px;\n  left: 50px;\n}\n.morph-button-sidebar > button {\n  line-height: 60px;\n  font-size: 1.6em;\n  padding: 0;\n}\n.morph-button-sidebar .morph-content {\n  background: MIDNIGHT-BLUE;\n}\n.morph-button-sidebar.open .morph-content {\n  top: 0 !important;\n  left: 0 !important;\n  width: 300px;\n  height: 100%;\n  overflow: hidden;\n  -webkit-backface-visibility: hidden;\n}\n/* Let's add some nice easing for all cases */\n.morph-button .morph-content,\n.morph-button.open .morph-content,\n.morph-button-modal-4 .morph-clone {\n  -webkit-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);\n  transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);\n}\n/* Helper classes */\n.noscroll {\n  overflow: hidden;\n}\n.morph-button-overlay.scroll .morph-content {\n  overflow-y: auto;\n}\n.morph-button-sidebar.scroll .morph-content {\n  overflow: auto;\n}\n/* No JS fallback: let's hide the button and show the content */\n.no-js .morph-button > button {\n  display: none;\n}\n.no-js .morph-button {\n  margin: 10px 0;\n  float: none;\n}\n.no-js .morph-button,\n.no-js .morph-button .morph-content,\n.no-js .morph-button .morph-content > div {\n  position: relative;\n  width: auto;\n  height: auto;\n  opacity: 1;\n  visibility: visible;\n  top: auto;\n  left: auto;\n  -webkit-transform: none;\n  transform: none;\n  pointer-events: auto;\n}\n.no-js .morph-button .morph-content .icon-close {\n  display: none;\n}\n.no-js .morph-button-sidebar {\n  width: 300px;\n  position: fixed;\n  top: 0;\n  left: 0;\n  margin: 0;\n  height: 100%;\n  background: MIDNIGHT-BLUE;\n  overflow: auto;\n}\n.no-transition {\n  -webkit-transition: none !important;\n  transition: none !important;\n}\n/* Media Queries */\n@media screen and (max-width: 600px) {\n  .morph-button-modal.open .morph-content {\n    top: 0% !important;\n    left: 0% !important;\n    margin: 0;\n    width: 100%;\n    height: 100%;\n    overflow-y: scroll;\n    -webkit-transition: width 0.4s 0.1s, height 0.4s 0.1s, top 0.4s 0.1s, left 0.4s 0.1s;\n    transition: width 0.4s 0.1s, height 0.4s 0.1s, top 0.4s 0.1s, left 0.4s 0.1s;\n  }\n}\n@media screen and (max-width: 400px) {\n  .morph-button-fixed,\n  .morph-button-fixed .morph-content {\n    width: 200px;\n    height: 80px;\n  }\n  .morph-button-fixed > button {\n    font-size: 75%;\n  }\n  .morph-button-sidebar > button {\n    font-size: 1.6em;\n  }\n  .morph-button-inflow .morph-content .morph-clone {\n    font-size: 0.9em;\n  }\n  .morph-button-modal-4,\n  .morph-button-modal-4 .morph-content {\n    width: 220px;\n    height: 120px;\n  }\n  .morph-button-modal-4 > button {\n    font-size: 100%;\n    line-height: 50px;\n  }\n  .morph-button-modal-4 > button span {\n    display: block;\n  }\n  .morph-button-modal-4 .morph-clone {\n    right: 83px;\n    bottom: 26px;\n  }\n  .morph-button-sidebar,\n  .morph-button-sidebar .morph-content {\n    width: 100% !important;\n    height: 60px !important;\n  }\n  .morph-button-sidebar {\n    bottom: 0px;\n    left: 0px;\n  }\n  .morph-button-sidebar.open .morph-content {\n    height: 100% !important;\n  }\n}\n", ""]);
	
	// exports


/***/ },
/* 115 */
/*!**********************************************************!*\
  !*** ./client/shared/image-selector/image-selector.styl ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./../../../~/stylus-loader!./image-selector.styl */ 116);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./image-selector.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./image-selector.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 116 */
/*!*******************************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/shared/image-selector/image-selector.styl ***!
  \*******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, ".double-tap-instructions {\n  color: ASBESTOS;\n  float: left;\n  padding: 0 0 0.5em;\n  margin: 0;\n}\n.choose-close-buttons {\n  min-width: 160px;\n  display: inline-block;\n}\n.image-selector {\n  position: relative;\n  text-align: center;\n}\n.image-selector .upload-box {\n  margin-bottom: 0.5em;\n}\n.image-selector .drop-zone {\n  padding: 0.5em;\n  background-color: CLOUDS;\n  border: 2px dashed CONCRETE;\n}\n.image-selector .drop-zone p {\n  margin-bottom: 0;\n  padding: 0;\n}\n.image-selector .drop-zone .progress {\n  margin-top: 0.5em;\n  margin-bottom: 0;\n}\n.image-selector .nv-file-over {\n  background-color: SILVER;\n  border-color: CLOUDS;\n}\n.image-selector .headbar {\n  padding: 0.5em;\n  color: #f1c40f;\n  border-radius: 3px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.image-selector .headbar .import-photos {\n  margin-bottom: 0.5em;\n}\n.image-selector .headbar .mass-edit-buttons {\n  margin-bottom: 0.5em;\n}\n.image-selector .headbar .mass-edit-buttons .btn {\n  margin-right: 0.5em;\n  margin-top: 0.3em;\n  color: CLOUDS;\n}\n.image-selector .headbar .mass-edit-buttons .download-selected {\n  background-color: MIDNIGHT-BLUE;\n}\n.image-selector .headbar .mass-edit-buttons .delete-visible {\n  background-color: PUMPKIN;\n}\n.image-selector .headbar .mass-edit-buttons .delete-selected {\n  background-color: POMEGRANATE;\n}\n.image-selector .headbar .mass-edit-buttons .group-selected {\n  background-color: GREEN-SEA;\n}\n.image-selector .headbar .mass-edit-buttons .ungroup-selected {\n  background-color: WET-ASPHALT;\n}\n.image-selector .headbar .select-all {\n  font-size: 1.75em;\n  color: CLOUDS;\n  color: MIDNIGHT-BLUE;\n  color: ASBESTOS;\n  padding: 0 1em 0 0.5em;\n  cursor: pointer;\n}\n.image-selector .headbar .form-group,\n.image-selector .headbar label {\n  margin-bottom: 0;\n}\n.image-selector .headbar input[type=checkbox] + label {\n  font-size: 1.25em;\n}\n.image-selector .headbar label:before {\n  color: #f1c40f !important;\n}\n.image-selector .body {\n  position: relative;\n  padding-top: 0.5em;\n  padding-bottom: 0.5em;\n  overflow-y: auto;\n  overflow-x: hidden;\n  max-height: 320px;\n}\n.image-selector .album-left {\n  margin-right: 1em;\n}\n.image-selector .set-albums {\n  margin-right: 1em;\n  padding-top: 0.5em;\n}\n.image-selector .image-details {\n  background-color: #2c3e50;\n  padding: 0.5em;\n  color: #f1c40f;\n  border-radius: 3px;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n.image-selector .btn-spacing button {\n  margin-right: 0.5em;\n}\n.image-selector .btn-spacing .pagination {\n  margin: 0em 0;\n}\n.image-selector .fullscreen-master-container {\n  height: 300px;\n  max-width: 100%;\n  overflow: hidden;\n  position: relative;\n  cursor: pointer;\n}\n.image-selector .fullscreen-master-container .select-button {\n  position: absolute;\n  top: 0;\n  left: 0;\n  padding: 0.3em 0.5em;\n  content: \"\\F119\";\n  border-bottom-right-radius: 3px;\n  font-size: 2em;\n  font-family: FontAwesome;\n  background-color: rgba(255,255,255,0.7);\n  color: ASBESTOS;\n  z-index: 4;\n}\n.image-selector .fullscreen-master-container .select-button.selected:before {\n  color: GREEN-SEA;\n  content: \"\\F00C\";\n}\n.image-selector .fullsize-box {\n  display: inline-block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  text-align: center;\n  -webkit-transition: transform 0.6s;\n  transition: transform 0.6s;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.image-selector .fullsize-box.left {\n  -webkit-transform: translateX(-100%);\n  -ms-transform: translateX(-100%);\n  transform: translateX(-100%);\n}\n.image-selector .fullsize-box.right {\n  -webkit-transform: translateX(100%);\n  -ms-transform: translateX(100%);\n  transform: translateX(100%);\n}\n.image-selector .fullsize-box.center {\n  -webkit-transform: translateX(0);\n  -ms-transform: translateX(0);\n  transform: translateX(0);\n}\n.image-selector .fullscreen-image {\n  position: relative;\n  display: inline-block;\n  max-height: 300px;\n  max-width: 90%;\n}\n.image-selector .previous-image-button {\n  color: CLOUDS;\n  font-size: 2em;\n  padding-right: 1em;\n  z-index: 3;\n  position: absolute;\n  left: 1em;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  -ms-transform: translateY(-50%);\n  transform: translateY(-50%);\n  background-color: rgba(52,73,94,0.5);\n  border-radius: 15em;\n  padding: 0.32em 0.55em 0.28em 0.35em;\n}\n.image-selector .next-image-button {\n  color: CLOUDS;\n  font-size: 2em;\n  padding-left: 1em;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  -ms-transform: translateY(-50%);\n  transform: translateY(-50%);\n  right: 1em;\n  background-color: rgba(52,73,94,0.5);\n  border-radius: 15em;\n  padding: 0.32em 0.35em 0.28em 0.55em;\n  z-index: 3;\n}\n.image-selector button.crop {\n  background-color: SUN-FLOWER;\n  color: MIDNIGHT-BLUE;\n}\n.image-selector .exit-fullscreen {\n  color: CLOUDS;\n  color: MIDNIGHT-BLUE;\n  margin-left: 1em;\n  font-size: 2.3em;\n}\n.image-selector .image-grid-4 {\n  position: relative;\n  display: inline-block;\n  box-sizing: border-box;\n  margin: 0.25em;\n  border-radius: 3px;\n  width: 33%;\n  max-width: 100px;\n  overflow: hidden;\n  max-height: 100px;\n}\n.image-selector .image-grid-4 .select-button {\n  position: absolute;\n  top: 0;\n  left: 0;\n  padding: 0.3em 0.5em;\n  content: \"\\F119\";\n  border-bottom-right-radius: 3px;\n  font-size: 1.75em;\n  font-family: FontAwesome;\n  background-color: rgba(255,255,255,0.7);\n  color: ASBESTOS;\n  z-index: 4;\n}\n.image-selector .image-grid-4 .select-button.selected:before {\n  color: GREEN-SEA;\n  content: \"\\F00C\";\n}\n.image-selector .image-thumbnail {\n  position: relative;\n  cursor: pointer;\n}\n.image-selector .image-thumbnail img {\n  min-width: 100%;\n  min-height: 100%;\n  left: 50%;\n  position: relative;\n  transform: translateX(-50%);\n}\n.image-selector .image-thumbnail .selector {\n  position: absolute;\n  top: 0;\n  left: 0;\n  padding: 0.2em 0.4em;\n  margin: 0.3em;\n  border-bottom-right-radius: 3px;\n  font-size: 1.5em;\n  z-index: 3;\n  cursor: pointer;\n}\n.image-selector .image-thumbnail .selector.fa-check-circle-o {\n  color: #27ae60;\n}\n.image-selector .image-thumbnail .invisible {\n  opacity: 0;\n}\n.image-selector .image-thumbnail .fullscreen {\n  position: static;\n  -webkit-transform: translateX(0);\n  -ms-transform: translateX(0);\n  transform: translateX(0);\n  min-width: initial;\n  min-height: initial;\n  width: auto;\n  height: auto;\n}\n.image-selector .image-thumbnail.backdrop {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 2;\n  background-color: #fff;\n  text-align: center;\n}\n", ""]);
	
	// exports


/***/ },
/* 117 */
/*!**************************************!*\
  !*** ./client/shared/main/main.styl ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./../../../~/stylus-loader!./main.styl */ 118);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./main.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./main.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 118 */
/*!***********************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/shared/main/main.styl ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, ".thing-form {\n  margin: 20px 0;\n}\n.loggedIn {\n  margin-top: 50px;\n}\n.fixed-header-stopper {\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n}\n#banner {\n  border-bottom: none;\n  margin-top: -20px;\n}\n#banner h1 {\n  font-size: 60px;\n  letter-spacing: -1px;\n  line-height: 1;\n}\n.hero-unit {\n  background: #4393b9;\n  color: #f5f5f5;\n  padding: 30px 15px;\n  position: relative;\n  text-align: center;\n  text-shadow: 0 1px 0 rgba(0,0,0,0.1);\n}\n.footer {\n  border-top: 1px solid #e5e5e5;\n  margin-top: 70px;\n  padding: 30px 0;\n  text-align: center;\n}\n.mb-draggable {\n  cursor: move;\n}\n.mb-draggable a {\n  cursor: move;\n}\n.mb-draggable-ghost {\n  background-color: #2ecc71;\n}\n.panel-chevron {\n  padding-left: 0.5em;\n}\n.panel-heading a {\n  cursor: pointer;\n}\n", ""]);
	
	// exports


/***/ },
/* 119 */
/*!**************************************************************************!*\
  !*** ./client/shared/meanbase-editable/meanbase-editable.directive.styl ***!
  \**************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./../../../~/stylus-loader!./meanbase-editable.directive.styl */ 120);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./meanbase-editable.directive.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./meanbase-editable.directive.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 120 */
/*!***********************************************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/shared/meanbase-editable/meanbase-editable.directive.styl ***!
  \***********************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, "/**\n * Trumbowyg v1.1.7 - A lightweight WYSIWYG editor\n * Default stylesheet for Trumbowyg editor\n * ------------------------\n * @link http://alex-d.github.io/Trumbowyg\n * @license MIT\n * @author Alexandre Demode (Alex-D)\n *         Twitter : @AlexandreDemode\n *         Website : alex-d.fr\n */\n.trumbowyg-box,\n.trumbowyg-editor {\n  display: block;\n  position: relative;\n}\n.trumbowyg-box.trumbowyg-fullscreen {\n  background: #fefefe;\n}\n.trumbowyg-editor,\n.trumbowyg-textarea {\n  position: relative;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 100%;\n  border-style: none;\n  resize: none;\n  outline: none;\n}\n.trumbowyg-box-blur .trumbowyg-editor * {\n  color: transparent !important;\n  text-shadow: 0 0 7px #333;\n}\n.trumbowyg-box-blur .trumbowyg-editor img {\n  opacity: 0.2;\n}\n.trumbowyg-textarea {\n  position: relative;\n  display: block;\n  overflow: auto;\n  border: none;\n  white-space: normal;\n}\n.trumbowyg-editor[contenteditable=true]:empty:before {\n  content: attr(placeholder);\n  color: #999;\n}\n.trumbowyg-button-pane {\n  z-index: 10;\n  display: none;\n}\n.trumbowyg-box.hasFocus .trumbowyg-button-pane,\n.trumbowyg-box.trumbowyg-fullscreen .trumbowyg-button-pane {\n  display: block;\n}\n.trumbowyg-button-pane {\n  position: relative;\n  background-color: #fff;\n  border: 2px solid #d7e0e2;\n  border-radius: 4px;\n  max-width: 264px;\n}\n.trumbowyg-button-pane::after {\n  content: '';\n  position: absolute;\n  left: 10%;\n  top: 100%;\n  width: 0;\n  height: 0;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  border-top: 10px solid #d7e0e2;\n  clear: both;\n}\n.trumbowyg-button-pane {\n  position: relative;\n  position: absolute;\n  bottom: 100%;\n  width: 100%;\n  min-width: 200px;\n  background: #ecf0f1;\n  border-bottom: 1px solid #d7e0e2;\n  margin: 0;\n  margin-bottom: 1em;\n  padding: 0;\n  list-style-type: none;\n  line-height: 10px;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n}\n.trumbowyg-button-pane li {\n  display: inline-block;\n  text-align: center;\n  overflow: hidden;\n}\n.trumbowyg-button-pane li.trumbowyg-separator {\n  width: 1px;\n  background: #d7e0e2;\n  margin: 0 5px;\n  height: 35px;\n}\n.trumbowyg-button-pane.trumbowyg-disable li:not(.trumbowyg-not-disable) button:not(.trumbowyg-active) {\n  opacity: 0.2;\n  cursor: default;\n}\n.trumbowyg-button-pane.trumbowyg-disable li.trumbowyg-separator {\n  background: #e3e9eb;\n}\n.trumbowyg-button-pane:not(.trumbowyg-disable) li button:hover,\n.trumbowyg-button-pane:not(.trumbowyg-disable) li button:focus,\n.trumbowyg-button-pane li button.trumbowyg-active,\n.trumbowyg-button-pane li.trumbowyg-not-disable button:hover,\n.trumbowyg-button-pane li.trumbowyg-not-disable button:focus {\n  background-color: #fff;\n  outline: none;\n}\n.trumbowyg-button-pane li .trumbowyg-open-dropdown:after {\n  display: block;\n  content: \" \";\n  position: absolute;\n  top: 25px;\n  right: 3px;\n  height: 0;\n  width: 0;\n  border: 3px solid transparent;\n  border-top-color: #555;\n}\n.trumbowyg-button-pane .trumbowyg-buttons-right {\n  float: right;\n  width: auto;\n}\n.trumbowyg-button-pane .trumbowyg-buttons-right button {\n  float: left;\n}\n.trumbowyg-dropdown {\n  top: 0 !important;\n  z-index: 9;\n  width: 200px;\n  border: 1px solid #ecf0f1;\n  padding: 5px 0;\n  border-top: none;\n  background: #fff;\n  margin-left: -1px;\n  -webkit-box-shadow: rgba(0,0,0,0.1) 0 2px 3px;\n  box-shadow: rgba(0,0,0,0.1) 0 2px 3px;\n}\n.trumbowyg-dropdown button {\n  display: block;\n  width: 100%;\n  height: 35px;\n  line-height: 35px;\n  text-decoration: none;\n  background: #fff;\n  padding: 0 14px;\n  color: #333;\n  border: none;\n  cursor: pointer;\n  text-align: left;\n  font-size: 15px;\n  -webkit-transition: all 0.15s;\n  -o-transition: all 0.15s;\n  transition: all 0.15s;\n}\n.trumbowyg-dropdown button:hover,\n.trumbowyg-dropdown button:focus {\n  background: #ecf0f1;\n}\n/* Modal box */\n.trumbowyg-modal {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  margin-left: -260px;\n  width: 520px;\n  height: 290px;\n  overflow: hidden;\n}\n.trumbowyg-modal-box {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  margin-left: -250px;\n  width: 500px;\n  height: 275px;\n  z-index: 1;\n  background-color: #fff;\n  text-align: center;\n  -webkit-box-shadow: rgba(0,0,0,0.2) 0 2px 3px;\n  box-shadow: rgba(0,0,0,0.2) 0 2px 3px;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n}\n.trumbowyg-modal-box .trumbowyg-modal-title {\n  font-size: 24px;\n  font-weight: bold;\n  margin: 0 0 20px;\n  padding: 15px 0 13px;\n  display: block;\n  border-bottom: 1px solid #eee;\n  color: #333;\n  background: #fbfcfc;\n}\n.trumbowyg-modal-box .trumbowyg-progress {\n  width: 100%;\n  background: #f00;\n  height: 3px;\n  position: absolute;\n  top: 58px;\n}\n.trumbowyg-modal-box .trumbowyg-progress .trumbowyg-progress-bar {\n  background: #2bc06a;\n  height: 100%;\n  -webkit-transition: width 0.15s linear;\n  -o-transition: width 0.15s linear;\n  transition: width 0.15s linear;\n}\n.trumbowyg-modal-box label {\n  display: block;\n  position: relative;\n  margin: 15px 12px;\n  height: 27px;\n  line-height: 27px;\n  overflow: hidden;\n}\n.trumbowyg-modal-box label .trumbowyg-input-infos {\n  display: block;\n  text-align: left;\n  height: 25px;\n  line-height: 25px;\n  -webkit-transition: all 0.15;\n  -o-transition: all 0.15;\n  transition: all 0.15;\n}\n.trumbowyg-modal-box label .trumbowyg-input-infos span {\n  display: block;\n  color: #859fa5;\n  background-color: #fbfcfc;\n  border: 1px solid #dedede;\n  padding: 0 2%;\n  width: 19.5%;\n}\n.trumbowyg-modal-box label .trumbowyg-input-infos span.trumbowyg-msg-error {\n  color: #e74c3c;\n}\n.trumbowyg-modal-box label.trumbowyg-input-error input,\n.trumbowyg-modal-box label.trumbowyg-input-error textarea {\n  border: 1px solid #e74c3c;\n}\n.trumbowyg-modal-box label.trumbowyg-input-error .trumbowyg-input-infos {\n  margin-top: -27px;\n}\n.trumbowyg-modal-box label input {\n  position: absolute;\n  top: 0;\n  right: 0;\n  height: 25px;\n  line-height: 25px;\n  border: 1px solid #dedede;\n  background: transparent;\n  width: 72%;\n  padding: 0 2%;\n  margin: 0 0 0 23%;\n  -webkit-transition: all 0.15s;\n  -o-transition: all 0.15s;\n  transition: all 0.15s;\n}\n.trumbowyg-modal-box label input:hover,\n.trumbowyg-modal-box label input:focus {\n  outline: none;\n  border: 1px solid #95a5a6;\n}\n.trumbowyg-modal-box label input:focus {\n  background: rgba(230,230,255,0.1);\n}\n.trumbowyg-modal-box .error {\n  margin-top: 25px;\n  display: block;\n  color: #f00;\n}\n.trumbowyg-modal-box .trumbowyg-modal-button {\n  position: absolute;\n  bottom: 10px;\n  right: 0;\n  text-decoration: none;\n  color: #fff;\n  display: block;\n  width: 100px;\n  height: 35px;\n  line-height: 33px;\n  margin: 0 10px;\n  background-color: #333;\n  border: none;\n  border-top: none;\n  cursor: pointer;\n  font-family: \"Trebuchet MS\", Helvetica, Verdana, sans-serif;\n  font-size: 16px;\n  -webkit-transition: all 0.15s;\n  -o-transition: all 0.15s;\n  transition: all 0.15s;\n}\n.trumbowyg-modal-box .trumbowyg-modal-button.trumbowyg-modal-submit {\n  right: 110px;\n  background: #2bc069;\n}\n.trumbowyg-modal-box .trumbowyg-modal-button.trumbowyg-modal-submit:hover,\n.trumbowyg-modal-box .trumbowyg-modal-button.trumbowyg-modal-submit:focus {\n  background: #40d47d;\n  outline: none;\n}\n.trumbowyg-modal-box .trumbowyg-modal-button.trumbowyg-modal-submit:active {\n  background: #25a259;\n}\n.trumbowyg-modal-box .trumbowyg-modal-button.trumbowyg-modal-reset {\n  color: #555;\n  background: #e6e6e6;\n}\n.trumbowyg-modal-box .trumbowyg-modal-button.trumbowyg-modal-reset:hover,\n.trumbowyg-modal-box .trumbowyg-modal-button.trumbowyg-modal-reset:focus {\n  background: #fbfbfb;\n  outline: none;\n}\n.trumbowyg-modal-box .trumbowyg-modal-button.trumbowyg-modal-reset:active {\n  background: #d4d4d4;\n}\n.trumbowyg-overlay {\n  position: absolute;\n  background-color: rgba(255,255,255,0.5);\n  width: 100%;\n  left: 0;\n  display: none;\n}\n/**\n * Fullscreen\n */\n.trumbowyg-fullscreen {\n  position: fixed;\n  top: 90px;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  z-index: 99999;\n}\n.trumbowyg-fullscreen .trumbowyg-button-pane {\n  display: block;\n}\n.trumbowyg-fullscreen.trumbowyg-box,\n.trumbowyg-fullscreen .trumbowyg-editor {\n  border: none;\n}\n.trumbowyg-fullscreen .trumbowyg-overlay {\n  height: 100% !important;\n}\n/*\n * Reset for resetCss option\n */\n.trumbowyg-editor object,\n.trumbowyg-editor embed,\n.trumbowyg-editor video,\n.trumbowyg-editor img {\n  width: auto;\n  max-width: 100%;\n}\n.trumbowyg-editor video,\n.trumbowyg-editor img {\n  height: auto;\n}\n.trumbowyg-editor img {\n  cursor: move;\n}\n.trumbowyg-editor.trumbowyg-reset-css {\n  background: #fefefe !important;\n  font-family: \"Trebuchet MS\", Helvetica, Verdana, sans-serif !important;\n  font-size: 14px !important;\n  line-height: 1.45em !important;\n  white-space: normal !important;\n  color: #333;\n}\n.trumbowyg-editor.trumbowyg-reset-css a {\n  color: #15c !important;\n  text-decoration: underline !important;\n}\n.trumbowyg-editor.trumbowyg-reset-css div,\n.trumbowyg-editor.trumbowyg-reset-css p,\n.trumbowyg-editor.trumbowyg-reset-css ul,\n.trumbowyg-editor.trumbowyg-reset-css ol,\n.trumbowyg-editor.trumbowyg-reset-css blockquote {\n  -webkit-box-shadow: none !important;\n  box-shadow: none !important;\n  background: none !important;\n  margin: 0 !important;\n  margin-bottom: 15px !important;\n  line-height: 1.4em !important;\n  font-family: \"Trebuchet MS\", Helvetica, Verdana, sans-serif !important;\n  font-size: 14px !important;\n  border: none;\n}\n.trumbowyg-editor.trumbowyg-reset-css iframe,\n.trumbowyg-editor.trumbowyg-reset-css object,\n.trumbowyg-editor.trumbowyg-reset-css hr {\n  margin-bottom: 15px !important;\n}\n.trumbowyg-editor.trumbowyg-reset-css blockquote {\n  margin-left: 32px !important;\n  font-style: italic !important;\n  color: #555;\n}\n.trumbowyg-editor.trumbowyg-reset-css ul,\n.trumbowyg-editor.trumbowyg-reset-css ol {\n  padding-left: 20px !important;\n}\n.trumbowyg-editor.trumbowyg-reset-css ul ul,\n.trumbowyg-editor.trumbowyg-reset-css ol ol,\n.trumbowyg-editor.trumbowyg-reset-css ul ol,\n.trumbowyg-editor.trumbowyg-reset-css ol ul {\n  border: none;\n  margin: 2px !important;\n  padding: 0 !important;\n  padding-left: 24px !important;\n}\n.trumbowyg-editor.trumbowyg-reset-css hr {\n  display: block;\n  height: 1px;\n  border: none;\n  border-top: 1px solid #ccc;\n}\n.trumbowyg-editor.trumbowyg-reset-css h1,\n.trumbowyg-editor.trumbowyg-reset-css h2,\n.trumbowyg-editor.trumbowyg-reset-css h3,\n.trumbowyg-editor.trumbowyg-reset-css h4 {\n  color: #111;\n  background: none;\n  margin: 0 !important;\n  padding: 0 !important;\n  font-weight: bold;\n}\n.trumbowyg-editor.trumbowyg-reset-css h1 {\n  font-size: 32px !important;\n  line-height: 38px !important;\n  margin-bottom: 20px !important;\n}\n.trumbowyg-editor.trumbowyg-reset-css h2 {\n  font-size: 26px !important;\n  line-height: 34px !important;\n  margin-bottom: 15px !important;\n}\n.trumbowyg-editor.trumbowyg-reset-css h3 {\n  font-size: 22px !important;\n  line-height: 28px !important;\n  margin-bottom: 7px !important;\n}\n.trumbowyg-editor.trumbowyg-reset-css h4 {\n  font-size: 16px !important;\n  line-height: 22px !important;\n  margin-bottom: 7px !important;\n}\n/*\n * Buttons icons\n */\n.trumbowyg-button-pane li button {\n  display: block;\n  position: relative;\n  text-indent: -9999px;\n  width: 35px;\n  height: 35px;\n  overflow: hidden;\n  background: transparent url(" + __webpack_require__(/*! ./icons.png */ 121) + ") no-repeat;\n  border: none;\n  cursor: pointer;\n  -webkit-transition: background-color 0.15s, background-image 0.15s, opacity 0.15s;\n  -o-transition: background-color 0.15s, background-image 0.15s, opacity 0.15s;\n  transition: background-color 0.15s, background-image 0.15s, opacity 0.15s;\n/* English and others */\n}\n.trumbowyg-button-pane li button.trumbowyg-viewHTML-button {\n  background-position: 5px -545px;\n}\n.trumbowyg-button-pane li button.trumbowyg-formatting-button {\n  background-position: 5px -120px;\n}\n.trumbowyg-button-pane li button.trumbowyg-bold-button,\n.trumbowyg-button-pane li button.trumbowyg-strong-button {\n  background-position: 5px -45px;\n}\n.trumbowyg-button-pane li button.trumbowyg-italic-button,\n.trumbowyg-button-pane li button.trumbowyg-em-button {\n  background-position: 5px 5px;\n}\n.trumbowyg-button-pane li button.trumbowyg-underline-button {\n  background-position: 5px -470px;\n}\n.trumbowyg-button-pane li button.trumbowyg-strikethrough-button,\n.trumbowyg-button-pane li button.trumbowyg-del-button {\n  background-position: 5px -445px;\n}\n.trumbowyg-button-pane li button.trumbowyg-link-button {\n  background-position: 5px -345px;\n}\n.trumbowyg-button-pane li button.trumbowyg-insertImage-button {\n  background-position: 5px -245px;\n}\n.trumbowyg-button-pane li button.trumbowyg-justifyLeft-button {\n  background-position: 5px -320px;\n}\n.trumbowyg-button-pane li button.trumbowyg-justifyCenter-button {\n  background-position: 5px -70px;\n}\n.trumbowyg-button-pane li button.trumbowyg-justifyRight-button {\n  background-position: 5px -395px;\n}\n.trumbowyg-button-pane li button.trumbowyg-justifyFull-button {\n  background-position: 5px -295px;\n}\n.trumbowyg-button-pane li button.trumbowyg-unorderedList-button {\n  background-position: 5px -495px;\n}\n.trumbowyg-button-pane li button.trumbowyg-orderedList-button {\n  background-position: 5px -370px;\n}\n.trumbowyg-button-pane li button.trumbowyg-horizontalRule-button {\n  background-position: 5px -220px;\n}\n.trumbowyg-button-pane li button.trumbowyg-fullscreen-button {\n  background-position: 5px -170px;\n}\n.trumbowyg-button-pane li button.trumbowyg-close-button {\n  background-position: 5px -95px;\n}\n.trumbowyg-fullscreen .trumbowyg-button-pane li button.trumbowyg-fullscreen-button {\n  background-position: 5px -145px;\n}\n.trumbowyg-button-pane li:first-child button {\n  margin-left: 6px;\n}\n.trumbowyg-button-pane li:last-child button {\n  margin-right: 6px;\n}\n/* French */\n.trumbowyg-fr .trumbowyg-button-pane li button.trumbowyg-bold-button,\n.trumbowyg-fr .trumbowyg-button-pane li button.trumbowyg-strong-button {\n  background-position: 5px -195px;\n}\n.trumbowyg-fr .trumbowyg-button-pane li button.trumbowyg-underline-button {\n  background-position: 5px -420px;\n}\n.trumbowyg-fr .trumbowyg-button-pane li button.trumbowyg-strikethrough-button,\n.trumbowyg-fr .trumbowyg-button-pane li button.trumbowyg-del-button {\n  background-position: 5px -270px;\n}\n@media only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 4/3), only screen and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx) {\n  .trumbowyg-button-pane li button {\n    -webkit-background-size: 25px 575px !important;\n    background-size: 25px 575px !important;\n    background-image: url(" + __webpack_require__(/*! ./icons-2x.png */ 122) + ") !important;\n/* English and others */\n  }\n  .trumbowyg-button-pane li button.trumbowyg-viewHTML-button {\n    background-position: 5px -545px;\n  }\n  .trumbowyg-button-pane li button.trumbowyg-formatting-button {\n    background-position: 5px -120px;\n  }\n  .trumbowyg-button-pane li button.trumbowyg-bold-button,\n  .trumbowyg-button-pane li button.trumbowyg-strong-button {\n    background-position: 5px -45px;\n  }\n  .trumbowyg-button-pane li button.trumbowyg-italic-button,\n  .trumbowyg-button-pane li button.trumbowyg-em-button {\n    background-position: 5px 5px;\n  }\n  .trumbowyg-button-pane li button.trumbowyg-underline-button {\n    background-position: 5px -470px;\n  }\n  .trumbowyg-button-pane li button.trumbowyg-strikethrough-button,\n  .trumbowyg-button-pane li button.trumbowyg-del-button {\n    background-position: 5px -445px;\n  }\n  .trumbowyg-button-pane li button.trumbowyg-link-button {\n    background-position: 5px -345px;\n  }\n  .trumbowyg-button-pane li button.trumbowyg-insertImage-button {\n    background-position: 5px -245px;\n  }\n  .trumbowyg-button-pane li button.trumbowyg-justifyLeft-button {\n    background-position: 5px -320px;\n  }\n  .trumbowyg-button-pane li button.trumbowyg-justifyCenter-button {\n    background-position: 5px -70px;\n  }\n  .trumbowyg-button-pane li button.trumbowyg-justifyRight-button {\n    background-position: 5px -395px;\n  }\n  .trumbowyg-button-pane li button.trumbowyg-justifyFull-button {\n    background-position: 5px -295px;\n  }\n  .trumbowyg-button-pane li button.trumbowyg-unorderedList-button {\n    background-position: 5px -495px;\n  }\n  .trumbowyg-button-pane li button.trumbowyg-orderedList-button {\n    background-position: 5px -370px;\n  }\n  .trumbowyg-button-pane li button.trumbowyg-horizontalRule-button {\n    background-position: 5px -220px;\n  }\n  .trumbowyg-button-pane li button.trumbowyg-fullscreen-button {\n    background-position: 5px -170px;\n  }\n  .trumbowyg-button-pane li button.trumbowyg-close-button {\n    background-position: 5px -95px;\n  }\n  .trumbowyg-fullscreen .trumbowyg-button-pane li a.trumbowyg-fullscreen-button {\n    background-position: 5px -145px;\n  }\n  .trumbowyg-fr .trumbowyg-button-pane li button.trumbowyg-bold-button,\n  .trumbowyg-fr .trumbowyg-button-pane li button.trumbowyg-strong-button {\n    background-position: 5px -195px;\n  }\n  .trumbowyg-fr .trumbowyg-button-pane li button.trumbowyg-underline-button {\n    background-position: 5px -420px;\n  }\n  .trumbowyg-fr .trumbowyg-button-pane li button.trumbowyg-strikethrough-button,\n  .trumbowyg-fr .trumbowyg-button-pane li button.trumbowyg-del-button {\n    background-position: 5px -270px;\n  }\n}\n", ""]);
	
	// exports


/***/ },
/* 121 */
/*!***************************************************!*\
  !*** ./client/shared/meanbase-editable/icons.png ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "820b278935101914871609ee94398fa5.png";

/***/ },
/* 122 */
/*!******************************************************!*\
  !*** ./client/shared/meanbase-editable/icons-2x.png ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fad5869af5b6d2d66d9cbb08f7d7cc49.png";

/***/ },
/* 123 */
/*!********************************************!*\
  !*** ./client/shared/missing/missing.styl ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./../../../~/stylus-loader!./missing.styl */ 124);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./missing.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./missing.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 124 */
/*!*****************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/shared/missing/missing.styl ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, ".meanbase-404 {\n  padding: 30px 10px;\n  font-size: 20px;\n  line-height: 1.4;\n  color: #737373;\n  background: #f0f0f0;\n  -webkit-text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n  max-width: 500px;\n  _width: 500px;\n  padding: 30px 20px 50px;\n  border: 1px solid #b3b3b3;\n  border-radius: 4px;\n  margin: 4em auto;\n  box-shadow: 0 1px 10px #a7a7a7, inset 0 1px 0 #fff;\n  background: #fcfcfc;\n}\n.meanbase-404 input {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n.meanbase-404 -moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n.meanbase-404 selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n.meanbase-404 h1 {\n  margin: 0 10px;\n  font-size: 50px;\n  text-align: center;\n}\n.meanbase-404 h1 span {\n  color: #bbb;\n}\n.meanbase-404 h3 {\n  margin: 1.5em 0 0.5em;\n}\n.meanbase-404 p {\n  margin: 1em 0;\n}\n.meanbase-404 ul {\n  padding: 0 0 0 40px;\n  margin: 1em 0;\n}\n.meanbase-404 .container {\n  max-width: 380px;\n  _width: 380px;\n  margin: 0 auto;\n}\n", ""]);
	
	// exports


/***/ },
/* 125 */
/*!****************************************!*\
  !*** ./client/shared/modal/modal.styl ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./../../../~/stylus-loader!./modal.styl */ 126);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./modal.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./modal.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 126 */
/*!*************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/shared/modal/modal.styl ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, ".modal-primary .modal-header,\n.modal-info .modal-header,\n.modal-success .modal-header,\n.modal-warning .modal-header,\n.modal-danger .modal-header {\n  color: #fff;\n  border-radius: 5px 5px 0 0;\n}\n.modal-primary .modal-header {\n  background: #428bca;\n}\n.modal-info .modal-header {\n  background: #5bc0de;\n}\n.modal-success .modal-header {\n  background: #5cb85c;\n}\n.modal-warning .modal-header {\n  background: #f0ad4e;\n}\n.modal-danger .modal-header {\n  background: #d9534f;\n}\n", ""]);
	
	// exports


/***/ },
/* 127 */
/*!******************************************************!*\
  !*** ./client/shared/single-image/single-image.styl ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./../../../~/stylus-loader!./single-image.styl */ 128);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./single-image.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./single-image.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 128 */
/*!***************************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/shared/single-image/single-image.styl ***!
  \***************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, ".meanbase-image-wrapper {\n  position: relative;\n}\n.meanbase-image-wrapper [find-images-for] {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.image-upload-progress-bar {\n  margin-top: 0.3em;\n}\n.select-images-button {\n  margin-top: 0.5em;\n}\n", ""]);
	
	// exports


/***/ },
/* 129 */
/*!**********************************************!*\
  !*** ./client/shared/sortable/sortable.styl ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./../../../~/stylus-loader!./sortable.styl */ 130);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./sortable.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./sortable.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 130 */
/*!*******************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/shared/sortable/sortable.styl ***!
  \*******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, ".wobble {\n  -webkit-animation: wiggle 0.4s ease infinite;\n  animation: wiggle 0.4s ease infinite;\n}\n@-webkit-keyframes wiggle {\n  0% {\n    -webkit-transform: rotateZ(4deg);\n  }\n  50% {\n    -webkit-transform: rotateZ(-4deg);\n  }\n  100% {\n    -webkit-transform: rotateZ(4deg);\n  }\n}\n@-moz-keyframes wiggle {\n  0% {\n    -moz-transform: rotateZ(4deg);\n  }\n  50% {\n    -moz-transform: rotateZ(-4deg);\n  }\n  100% {\n    -moz-transform: rotateZ(4deg);\n  }\n}\n@-o-keyframes wiggle {\n  0% {\n    -o-transform: rotateZ(4deg);\n  }\n  50% {\n    -o-transform: rotateZ(-4deg);\n  }\n  100% {\n    -o-transform: rotateZ(4deg);\n  }\n}\n@-moz-keyframes wiggle {\n  0% {\n    transform: rotateZ(4deg);\n  }\n  50% {\n    transform: rotateZ(-4deg);\n  }\n  100% {\n    transform: rotateZ(4deg);\n  }\n}\n@-webkit-keyframes wiggle {\n  0% {\n    transform: rotateZ(4deg);\n  }\n  50% {\n    transform: rotateZ(-4deg);\n  }\n  100% {\n    transform: rotateZ(4deg);\n  }\n}\n@-o-keyframes wiggle {\n  0% {\n    transform: rotateZ(4deg);\n  }\n  50% {\n    transform: rotateZ(-4deg);\n  }\n  100% {\n    transform: rotateZ(4deg);\n  }\n}\n@keyframes wiggle {\n  0% {\n    transform: rotateZ(4deg);\n  }\n  50% {\n    transform: rotateZ(-4deg);\n  }\n  100% {\n    transform: rotateZ(4deg);\n  }\n}\n", ""]);
	
	// exports


/***/ },
/* 131 */
/*!********************************************!*\
  !*** ./client/shared/taglist/taglist.styl ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./../../../~/stylus-loader!./taglist.styl */ 132);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./taglist.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./taglist.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 132 */
/*!*****************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/shared/taglist/taglist.styl ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, ".tag-list {\n  display: inline-block;\n  min-width: 80%;\n  padding: 6px 1px 1px 6px;\n  margin-bottom: 18px;\n  font-size: 0;\n  text-align: left;\n  background-color: #fff;\n  border: 2px solid #1abc9c;\n  border-radius: 6px;\n}\n.tag-list input {\n  min-width: 80px;\n  max-width: inherit;\n  padding: 0;\n  margin: 0;\n  font-size: 14px;\n  color: #34495e;\n  vertical-align: top;\n  background-color: transparent;\n  border: none;\n  outline: 0;\n  box-shadow: none;\n}\n.tag-list input.error {\n  color: #e74c3c;\n}\n.tag {\n  color: #fff;\n  background-color: #1abc9c;\n  position: relative;\n  display: inline-block;\n  padding: 6px 21px 6px 8px;\n  margin: 0 5px 5px 0;\n  overflow: hidden;\n  font-size: 13px;\n  line-height: 15px;\n  color: #7b8996;\n  vertical-align: middle;\n  cursor: pointer;\n  border-radius: 4px;\n  font-weight: 700;\n  line-height: 1;\n  color: #fff;\n  white-space: nowrap;\n}\n.tag .remove {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 2;\n  width: 100%;\n  padding: 0 10px 0 0;\n  font-size: 12px;\n  text-align: right;\n  text-decoration: none;\n  cursor: pointer;\n}\n.tag .remove:after {\n  line-height: 27px;\n  font-family: FontAwesome;\n  content: \"\\F00D\";\n  color: #fff;\n}\n", ""]);
	
	// exports


/***/ },
/* 133 */
/*!**********************************************!*\
  !*** ./client/shared/validate/validate.styl ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./../../../~/stylus-loader!./validate.styl */ 134);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./validate.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./validate.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 134 */
/*!*******************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/shared/validate/validate.styl ***!
  \*******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, ".has-error .help-block.error {\n  display: block;\n  padding: 6px;\n}\n.has-error .help-block.required {\n  display: none;\n}\n.has-warning .help-block.required {\n  display: block;\n  padding: 6px;\n}\n.has-warning .help-block.error {\n  display: none;\n}\n.has-success .help-block {\n  display: none;\n  padding: 6px;\n}\n", ""]);
	
	// exports


/***/ },
/* 135 */
/*!************************************************!*\
  !*** ./client/shared/account/login/login.styl ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./../../../../~/stylus-loader!./login.styl */ 136);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../~/style-loader/addStyles.js */ 88)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./login.styl", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./login.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 136 */
/*!*********************************************************************************!*\
  !*** ./~/css-loader!./~/stylus-loader!./client/shared/account/login/login.styl ***!
  \*********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 87)();
	// imports
	
	
	// module
	exports.push([module.id, ".btn-facebook {\n  color: #fff;\n  background-color: #3b5998;\n  border-color: #133783;\n}\n.btn-twitter {\n  color: #fff;\n  background-color: #2daddc;\n  border-color: #0271bf;\n}\n.btn-google-plus {\n  color: #fff;\n  background-color: #dd4b39;\n  border-color: #c53727;\n}\n.btn-github {\n  color: #fff;\n  background-color: #fafafa;\n  border-color: #ccc;\n}\n", ""]);
	
	// exports


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map