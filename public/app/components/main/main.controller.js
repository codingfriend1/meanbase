// #Main Controller
// This controller is kind of a conglomeration of functionality needed for the CMS. Anything that needs to be accessable by every part of the front end goes here. By front end I mean everything the user sees but not the CMS admin pages.
(function(){
  angular.module('meanbaseApp').controller('MainCtrl', MainCtrl)

  // @ngInject
  function MainCtrl($rootScope, $scope, $http, Auth, $location, endpoints, $modal, $sanitize, helpers, $timeout, toastr, api, $compile, $templateCache, editMenuModal, imageModal) {

    const autoSaveLapse = 100

    setTimeout(function() {
      window.prerenderReady = true;
    }, 1000);


    // It's becoming a standard in meanbase prepare the api endpoints the controller will hit at the top of the file.

    // Get all the menus on the server.
    api.menus.find({}).then(function(response) {
      if(Array.isArray(response) && response.length === 0)
        response = {}

      $rootScope.menus = response || {}
    })

    $rootScope.newComment = {}

    $rootScope.submitComment = function(newComment) {
      if(!newComment.recaptcha) { return false }
      var valid = validateComment(newComment)
      if(valid) {
        // console.log("vcRecaptchaService.getResponse()", vcRecaptchaService.getResponse())
        // if(vcRecaptchaService.getResponse() === ""){ //if string is empty
        if(newComment.recaptcha === ""){ //if string is empty
          toastr.warning("Please resolve the captcha and submit!")
        } else {
          newComment['g-recaptcha-response'] = newComment.recaptcha
          newComment.recaptcha = undefined
          api.comments.create(newComment).then(function(response) {
            $rootScope.newComment = newComment = {}
            $rootScope.commentSent = true
            $timeout(function() { $rootScope.commentSent = false }, 2000)
          })
        }
      }
    }

    $rootScope.comments = []
    if($rootScope.page.url) { //If, in case this is a missing page
      api.comments.find({url: $rootScope.page.url, $limit: 1000000}).then(function(response) {
        $rootScope.comments = response.data
      }, function(err) {
        console.log('promise rejected', err);
      });
    }

    $rootScope.subscribe = function(email) {
      api.subscribe.update(null, {email}).then(function(response) {
        console.log("Successfully subscribed email", response);
        toastr.success(response)
      }, function(err) {
        console.log('Error subscribing email', err);
        toastr.warning(err.message)
      });
    }

    $rootScope.unsubscribe = function(email) {
      api.subscribe.deleteOne(email).then(function(response) {
        console.log("Successfully unsubscribed email", response);
        toastr.success(response)
      }, function(err) {
        console.log('Error unsubscribing email', err);
        toastr.warning(err.message)
      });
    }


    function validateComment(comment) {
      if(comment && $rootScope.page) {

        // If someone tries to set comment to already approved this will unset it
        // Validation is also done server side
        if(comment.approved) { comment.approved = false }

        // Add forward slash if missing from page url
        if($rootScope.page.url) {
          if($rootScope.page.url.charAt(0) !== '/') {
            $rootScope.page.url = '/' + $rootScope.page.url
          }
        }

        comment.url = $rootScope.page.url
        return true
      }
      return false
    }

    // ###handleClick
    // If the user is in edit mode, we prevent menus that use this function in their ng-click from navigating away and instead open the edit menu modal. If the user is not in edit mode, navigation functions normally.
    $scope.handleClick = function($event, menuItem, href) {
      editMenuModal.open($event, menuItem, href)
    }

    // Rubaxa's library "sortable" and "ng-sortable" (the drag and drop capabilities) need a configuration to be passed in. Here we define it. Inside the ng-repeat, any item with a class of `.mb-draggable` will be able to be dragged.
    //
    let meanbaseFront = document.getElementById('mb-meanbase-front')

    let activeElGroup

    let sortableTemplateDefaults = {
      ghostClass: "mb-draggable-ghost",
      draggable: ".mb-draggable",
      delay: 140,
      filter: ".ignore-draggable, .medium-editor-placeholder:after",
      // onMove: function (evt) {
      //   return evt.related.className.indexOf('ignore-draggable') === -1;
      // },
      animation: 250,
      scroll: true,
      scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
      scrollSpeed: 10 // px
    }

    $rootScope.menusConfig = _.extend({}, sortableTemplateDefaults, {
      group: 'menus',
      onStart: function (event) {
        meanbaseFront.classList.add('in-drag-mode')
        activeElGroup = $rootScope.menus
      },
      onEnd: function () {
        $rootScope.$emit('cms.elementsChanged')
        meanbaseFront.classList.remove('in-drag-mode')
      }
    })

    $rootScope.sortableLists = _.extend({}, sortableTemplateDefaults, {
      group: 'lists',
      onStart: function (event) {
        meanbaseFront.classList.add('in-drag-mode')
        activeElGroup = $rootScope.page.lists
      },
      onEnd: function () {
        $rootScope.$emit('cms.elementsChanged')
        meanbaseFront.classList.remove('in-drag-mode')
      }
    })

    $rootScope.subMenuList = _.extend({}, sortableTemplateDefaults, {
      group: 'sub-menus',
      ghostClass: "mb-sub-draggable-ghost",
      draggable: ".mb-sub-draggable",
      filter: ".ignore-sub-draggable, .medium-editor-placeholder:after",
      onStart: function (event) {
        activeElGroup = $rootScope.menus
        meanbaseFront.classList.add('in-drag-mode')
      },
      onEnd: function () {
        $rootScope.$emit('cms.elementsChanged')
        meanbaseFront.classList.remove('in-drag-mode')
      }
    })

    $rootScope.mbSortableExtensionList = _.extend({}, sortableTemplateDefaults, {
      group: 'extension-list',
      ghostClass: "mb-inner-draggable-ghost",
      draggable: ".mb-inner-draggable",
      filter: ".ignore-inner-draggable, .medium-editor-placeholder:after",
      onStart: function (event) {
        meanbaseFront.classList.add('in-drag-mode')
        activeElGroup = $rootScope.page.lists
      },
      onEnd: function () {
        $rootScope.$emit('cms.elementsChanged')
        meanbaseFront.classList.remove('in-drag-mode')
      }
    })

    $rootScope.trashCanDraggable = {
      group: {
        put: ['lists', 'extensions', 'menus', 'extension-list', 'sub-menus']
      },
      onAdd: function (event) {
        $rootScope.$emit('cms.deleteTrashContent', activeElGroup)
      },
    }

    if(!$rootScope.isLoggedIn) { return false }


    $rootScope.listOptions = [];

    (async () => {
      try {
        let response = await api.themes.find({active: true})
        response = response[0]

        let extensions = []

        if(response) {
          extensions = response.extensions
        }

        for (var i = 0; i < extensions.length; i++) {
          extensions[i].html = $templateCache.get(extensions[i].html)
          if(!extensions[i].html) {
            extensions.splice(i, 1)
          }
        }

        $rootScope.listOptions = extensions
      } catch(err) {
        console.log('Error fetching theme extensions', err)
      }
    })()


    $rootScope.extensionOptions = [];
    (async () => {
      try {

        let foundExtensions = await api.extensions.find({active: true})

        for (var i = 0; i < foundExtensions.length; i++) {
          foundExtensions[i].html = $templateCache.get(foundExtensions[i].html)
          if(!foundExtensions[i].html) {
            foundExtensions.splice(i, 1)
          }
        }

        $rootScope.extensionOptions = foundExtensions
      } catch(err) {
        console.log('Error fetching extensions', err)
      }
    })()

    // // Let's check if the user is logged in
    // $rootScope.isLoggedIn = Auth.isLoggedIn()

    // // Get the current logged in user
    // $scope.currentUser = Auth.getCurrentUser()

    // A method that logs the user out
    $scope.logout = function() {
      $rootScope.$emit('cms.logout')
      Auth.logout()
    }



    var doit
    $rootScope.windowWidth = $(window).width()
    window.onresize = function(){
      clearTimeout(doit)
      doit = setTimeout(function() {
        $rootScope.windowWidth = $(window).width()
      }, 200)
    }

    // ###Client Side Validation
    // We want to validate client side data before sending it to the server so the user can know what to correct. The server also validates the data.

    // These regexes may we used throughout forms on the site
    $rootScope.validators = {
      isTitle: /^[A-Za-z0-9@:?&=.\/ _\-]*$/,
      isURI: /(((http|https|ftp):\/\/([\w-\d]+\.)+[\w-\d]+){0,1}((\/|#)[\w~,\-\._\/?%&+#=]*))/,
      isFilePath: /^[0-9A-Za-z\/*_.\\\-]*$/,
      isCSSClass: /^[A-Za-z0-9_ \-*]*$/,
      isAnchorTarget: /^[_blank|_self|_parent|_top]*$/,
      isEmail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      isText: /^$/,
      isHTML: /^$/
    }

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
    }

    // ###Snapshots
    // What if the user hits edit, makes many changes and then decides they don't like those changes?

    // We need some way of reseting the content back to what it was before. That's what snapshots do. We do an angular.copy() on all major pieces of data when the user hits edit and if the user then hits discard, we set that data to the initial copied value.
    var snapshots = {}
    $scope.$onRootScope('cms.takePageSnapshot', function(event, editMode) {
      // Rubaxa's library has the ability to be disabled.
      // We only want draggable elements while in edit mode
      if(editMode) {
        snapshots.menus = angular.copy($rootScope.menus)
        snapshots.page = angular.copy($rootScope.page)

        // In the admin pages, extensions may be disabled so they cannot be added to the page.
        // Here we get only the active extensions so the admin can select extensions to add
        api.extensions.find({active: true}).then(function(res) {
          $rootScope.extensions = res
          for (var i = 0; i < $rootScope.extensions.length; i++) {
            if(!$rootScope.extensions[i].screenshot) {
              $rootScope.extensions[i].screenshot = 'http://placehold.it/200x100'
            }
          }
        })
      }
    })

    $scope.$onRootScope('cms.takeMenusSnapshot', function(event, editMode) {
      // Rubaxa's library has the ability to be disabled.
      // We only want draggable elements while in edit mode
      $rootScope.menusConfig.disabled = !editMode

      if(editMode) {
        snapshots.menus = angular.copy($rootScope.menus)
      }
    })


    $scope.$onRootScope('cms.autoSave', _.debounce(async function(event, pageContent, menuContent) {
      var url = $rootScope.page.url

      $rootScope.$emit('cms.addRecentEditLink', $rootScope.page.url)

      // $rootScope.menus = helpers.updatePositionData($rootScope.menus)

      document.title = $rootScope.page.tabTitle
      jQuery('meta[name=description]').attr('content', $rootScope.page.description)

      try {
        // let response = await api.staging.find({key: url})

        if(!pageContent) {
          pageContent = _.pick($rootScope.page, [
            'title',
            'tabTitle',
            'description',
            'content',
            'images',
            'extensions',
            'lists',
            'grid',
            'links',
            'template'
          ])
        }

        // let menusPromise
        if(!menuContent) {
          menuContent = angular.copy($rootScope.menus)
        }

        await api.staging.update({key: url}, {data: pageContent})
        await api.staging.update({key: 'menus'}, {data: menuContent})

        $rootScope.$emit('cms.finishedAutoSaving', true)

      } catch(err) {
        console.log('Error auto saving', err)
        $rootScope.$emit('cms.finishedAutoSaving', false)
      }
    }, autoSaveLapse))

    $scope.$onRootScope('cms.publishChanges', async function() {
      try {
        let pageStagingData = await api.staging.find({key: $rootScope.page.url})
        pageStagingData = pageStagingData[0]

        if(pageStagingData && pageStagingData.data)
          $rootScope.page = angular.merge($rootScope.page, pageStagingData.data)

        let menusStagingData = await api.staging.find({key: 'menus'})
        menusStagingData = menusStagingData[0]

        if(menusStagingData && menusStagingData.data) {

          _.each(menusStagingData.data, group => {
            _.each(group, menu => {
              if(!menu.published) {
                if((menu.url && (menu.url.indexOf('http://') > -1 || menu.url.indexOf('https://') > -1)) || menu.isDropdown) {
                  menu.published = true
                }
              }
            })
          })

          await api.menus.delete({})
          let newMenus = await api.menus.create(menusStagingData.data)
          $rootScope.menus = newMenus
          await api.staging.delete({key: 'menus'})
        }

        $rootScope.$emit('cms.saveEdits')

        if(pageStagingData)
          await api.staging.delete({key: $rootScope.page.url})

        $rootScope.$emit('cms.finishPublishPages')

      } catch(err) {
        console.log('Error publishing changes', err)
      }
    })

    // ###Save Edits!
    // This is the event that listens for when the user clicks the save button after being in edit mode.
    $scope.$onRootScope('cms.saveEdits', function() {

      // We play a pulse animation on the page. We are using [daneden/animate.css](https://github.com/daneden/animate.css) so we could pass any of those values here
      $scope.pageAnimation = 'pulse'

      // #### Update the menus
      // Update positions and locations of the menu items
      $rootScope.menus = helpers.updatePositionData($rootScope.menus)

      // We use a timeout so that the meanbase-editable html changes have time to update their models before we save the page.
      $timeout(async function(){
        if(!$rootScope.page._id) { return false }

        try {
          let updatedPage = await api.pages.update({_id: $rootScope.page._id}, $rootScope.page)
          updatedPage = updatedPage[0]

          document.title = $rootScope.page.tabTitle
          jQuery('meta[name=description]').attr('content', $rootScope.page.description);

          if(updatedPage) {
            if(snapshots.page.url !== updatedPage.url) {
              $rootScope.$emit('cms.addRecentEditLink', updatedPage.url)
              try {
                await api.menus.update({url: snapshots.page.url}, {url: updatedPage.url})
              } catch(err) {
                console.log('Error updating menus to match url change', err);
                toastr.warning('Make sure to update any menus that point to the previous url for the page.')
              }
            }
          }
        } catch(err) {
          console.log('err', err);
        }

        toastr.success('Changes saved')

      }) //$timeout
    }) //saveEdits()

    // ### Discard Edits
    // When cms.headbar or any other script releases the event to discard edits, reset everything to the way it was when the user first clicked edit
    $scope.$onRootScope('cms.returnToSnapshot', function() {
      $scope.pageAnimation = 'shake'
      // We want to set the data to it's old initial snapshot
      $rootScope.menus = snapshots.menus
      $rootScope.page = snapshots.page

      document.title = $rootScope.page.tabTitle
      jQuery('meta[name=description]').attr('content', $rootScope.page.description)
    })

    $scope.$onRootScope('cms.resetDraft', async function(event, url) {
      if(!url) { url = $rootScope.page.url }

      document.title = $rootScope.page.tabTitle
      jQuery('meta[name=description]').attr('content', $rootScope.page.description)

      try {
        let response = await api.staging.delete({key: url})
        await api.staging.delete({key: 'menus'})
        console.log('Deleting autosave data for ' + url, response)
        $rootScope.$emit('cms.finishedResetingDraft', true)
      } catch(err) {
        $rootScope.$emit('cms.finishedResetingDraft', false)
        console.log('Trouble deleting autosave data for ' + url, err)
      }
    })

    // ### Publish Gallery Selection
    // In meanbase, a gallery is simply a group of images. When images a selected with the image-selector and chosen, we need a way of saving that selection when the user hits save. This takes the images that were selected and the name of the slug (collection) and saves that slug to those images on the server.
    $rootScope.publishGallerySelection = function(slug, gallerySelection) {
      var imageArray = []

      // Get the visibile images' urls
      for (var i = 0; i < gallerySelection.length; i++) {
        gallerySelection[i].galleries.push(slug)
        imageArray.push(gallerySelection[i].url)
      }

      // Remove this gallery slug from all the images that use it and then add it back to the appropriate images
      // This strategy is quicker than checking which ones were added and removed
      api.media.update({galleries: slug}, { $pull: {galleries: slug} }).then(function() {
        if(imageArray.length < 1) return false
        api.media.update({ url: {$in: imageArray } }, { $push: {galleries: slug} })
      })
    }

  }
})()
