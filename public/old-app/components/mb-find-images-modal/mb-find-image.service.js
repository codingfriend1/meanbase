(() => {

  @mbService()

  class imageModal {

    constructor($rootScope, $modal) {
      this.$rootScope = $rootScope
      this.$modal = $modal
    }

    @autobind
    open(config, callback) {
      var modalInstance = this.$modal.open({

        templateUrl: require('./mb-find-image.modal.jade'),

        controller: function($scope, $modalInstance, config, $timeout) {
          $scope.config = config

          config.allOperations = true
          $scope.imageSelectorApi = {}
          var areChanges

          if($scope.config.multiple) {
            $scope.instructions = 'Choose Images'
          } else {
            $scope.instructions = 'Choose Image'
          }


          $modalInstance.opened.then(() => {
            $timeout(function() {
              $scope.imageSelectorApi.getAlreadySelected($scope.config.alreadySelected)
            }, 0, true)

          })
          // $scope.allOperations = false
          $scope.chooseImages = function() {
            areChanges = true
            var selectedImages = $scope.imageSelectorApi.getSelectedImages()
            $modalInstance.close(selectedImages)
          }
        },
        size: 'lg',
        resolve: {
          config: function() {
            return config || {}
          }
        }
      })

      modalInstance.result.then((selectedImages) => {
        if(callback) {
          callback(selectedImages)
        }
      })
    }

  }
})()
