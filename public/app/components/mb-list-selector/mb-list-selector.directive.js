angular.module('meanbaseApp')
  .directive('mbListSelector', function(endpoints, $modal, $rootScope, $timeout) {
    return {
      templateUrl: require('./mb-list-selector.jade'),
      restrict: 'A',
      link: function (scope, element, attrs) {
      	var modalInstance;
      	scope.openModal = function () {
      	  modalInstance = $modal.open({
            templateUrl: require('./mb-list.modal.jade'),
      	    controller: 'list.modal.controller',
      	    size: 'md',
            resolve: {
              group: function() {
                return attrs.mbListSelector
              }
            }
      	  });

	      	modalInstance.result.then(function (chosenExtension) {
	      		if(!$rootScope.page || !$rootScope.page.url || !chosenExtension || attrs.mbListSelector < 1) { return false; }
            if(!$rootScope.page.lists[attrs.mbListSelector]) {
              $rootScope.page.lists[attrs.mbListSelector] = [];
            }
            var listResponse = [];
            var listItem = {
              group: attrs.mbListSelector,
              position: ($rootScope.page.lists[attrs.mbListSelector].length - 1 < 0)? 0: $rootScope.page.lists[attrs.mbListSelector].length - 1,
              label: chosenExtension.label,
              key: chosenExtension.key,
              html: chosenExtension.html,
              data: chosenExtension.data || {
                items: []
              }
            };
            listResponse.push(listItem);

            $rootScope.page.lists[attrs.mbListSelector] = $rootScope.page.lists[attrs.mbListSelector].concat(listResponse);

            $rootScope.$emit('cms.elementsChanged')

            modalInstance = null;
	  	    });
      	};

      }
    };
  });
