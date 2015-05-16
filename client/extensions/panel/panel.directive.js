'use strict';

// This directive uses the slug passed in to get the appropriate images and display them in a slider

angular.module('extensions')
  .directive('panel', function (endpoints, $rootScope) {
    return {
      templateUrl: 'extensions/panel/panel.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

      	if(!scope.extension.data || scope.extension.data.length < 1) { scope.extension.data = {}; }
        // var sharedResource = new extensionData(scope.extension.sharedSource);

        // if(scope.extension.useShared && scope.extension.sharedSource) {
        //   sharedResource.useSharedData(true);
        //   sharedResource.getData().success(function(res) {
        //     scope.extension.data = res.data;
        //   });
        // }

        // scope.$watchCollection(function() { return scope.extension.data; }, function(newValue, oldValue) {
        //   if(!newValue) { return false; }

        //   sharedResource.data = newValue;

          // if(newValue.useShared) {
          //   // Update the sharedResource Data
          //   // sharedResource.source = newValue.sharedSource;
          //   sharedResource.data = newValue;
          //   // sharedResource.useSharedData(true);
          //   console.log('sharedResource', sharedResource);
          // } else {
          //   // sharedResource.useSharedData(false);
          // }

        // });
  

        if(scope.extension.useShared && scope.extension.sharedSource) {
          if(!$rootScope.extensiondata[scope.extension.sharedSource]) {
            $rootScope.extensiondata[scope.extension.sharedSource] = {
              name: scope.extension.sharedSource,
              data: scope.extension.data
            };
          }
          scope.extension.data = $rootScope.extensiondata[scope.extension.sharedSource].data;
        }

        // scope.$watchCollection(function() { return $rootScope.extensiondata; }, function(newValue, oldValue) {

        //   console.log('scope.extensiondata data', newValue);

        //   if(scope.extension.useShared && scope.extension.sharedSource) {
        //     for(var idx = 0; idx < newValue.length; idx++) {
        //       if(scope.extension.sharedSource === newValue[idx].name) {
        //         scope.extension.data = newValue[idx].data;
        //         console.log('newValue[idx].data', newValue[idx].data);
        //       }
              
        //     }
        //   }
        // });
        
      }
    };
  });