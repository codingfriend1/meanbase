(() => {

  @mbService()

  class editExtensionModal {

    constructor($rootScope, $modal) {
      this.$rootScope = $rootScope
      this.$modal = $modal
    }

    editExtensionModalInstance

    @autobind
    open(item) {
      if(this.editExtensionModalInstance) { return false }
      this.editExtensionModalInstance = this.$modal.open({
        templateUrl: require('./mb-extension-edit.modal.jade'),
        controller: function($scope, $modalInstance, item, api, toastr, $rootScope) {
          $scope.sync = item.sync
          $scope.syncGroup = item.syncGroup

          $scope.syncGroups = []
          api.custom.find({belongsTo: item.label}).then(function(response) {
            $scope.syncGroups = response
          })

          $scope.updateExtension = function(syncGroup, newSyncGroup) {
            item.sync = $scope.sync

            if(item.sync) {
              if(!syncGroup) {
                toastr.warning('Please choose a group to sync with')
                return false
              }

              item.syncGroup = syncGroup

              for (var i = 0; i < $scope.syncGroups.length; i++) {
                if(syncGroup === $scope.syncGroups[i].key) {
                  $rootScope.$emit('cms.fetchExtensionData')
                }
              }
            }

            if(newSyncGroup) {
              item.syncGroup = newSyncGroup
              item.sync = true
              api.custom.create({belongsTo: item.label, key: newSyncGroup, permission: 'editContent', value: {}, enabled: true})
            }

            toastr.success('Sync settings updated')
            $rootScope.$emit('cms.elementsChanged')
            $modalInstance.close();
          }
        },
        size: 'md',
        resolve: {
          item: function() {
            return item
          }
        }
      })

      this.editExtensionModalInstance.result.finally( (selectedImages) => {
        this.editExtensionModalInstance = undefined
      })
    }
  }

})()
