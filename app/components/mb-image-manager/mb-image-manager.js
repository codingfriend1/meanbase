Vue.filter('filterMedia', function (media) {
  return (media.url + media.alt).toLowerCase().indexOf(vm.mediaFilter.toLowerCase()) >= 0
})

Vue.filter('filterByAlbum', function (value, selectedImages, selectedGroup) {
  if(value) {
    if(selectedGroup === 'all') return true;
    if(selectedGroup === 'selected' && selectedImages.indexOf(value) > -1) { return true; }
    if(value.groups.indexOf(selectedGroup) >= 0) {
      return true
    }
  }
  console.log('returning false');
  return false
})


let vm = Vue.component('mb-image-manager', {
  template: require('./mb-image-manager.jade'),
  props: ['modalConfig', 'close'],
  data: () => ({
    media: [],
    instructions: "Choose image(s)",
    groups: ['all', 'selected'],
    selectedImages: [],
    selectedGroup: '',
    longTermSelection: [],
    shortTermSelection: [],
    fullscreenImage: {},
    allSelected: false,
    hasToken: false,
    globals: {
      direction: '',
      nextImage: null,
      previousImage: null,
      multiple: false,
      fullsizeImageIndex: null,
      _fullscreenImage: null
    },
    dom: {
      fullscreenContainer: document.querySelector('.fullscreen-master-container'),
      mainFullsizeBox: document.querySelector('.fullsize-box.main'),
      nextImageTag: null, //is the next image in sequence when moving right
      previousImageTag: null //is the previous image in sequence when moving left
    }
  }),
  computed: {
    filteredMedia: function () {
      let filter = Vue.filter('filterByAlbum')
      return _.clone(this.media, true).filter(image => filter(image, this.selectedImages, this.selectedGroup))
    }
  },
  methods: {
    close: function() {
      radio.$emit('cms.currentModal', undefined)
    },
    chooseImages: function() {
      radio.$emit('cms.choseImages', {gallerySlug:  this.modalConfig.gallerySlug, images: this.getSelectedImages()})
      this.close()
    },
    getMedia: function() {
      api.media.find({}).then(media => {
        this.media = media;

        // Take the image path from the server and choose the appropriate image to display
        for (var i = 0; i < this.media.length; i++) {
          this.media[i].thumbnail = this.media[i].url + 'thumbnail.jpg';
          this.media[i].small = this.media[i].url + 'small.jpg';
          this.media[i].medium = this.media[i].url + 'medium.jpg';
          this.media[i].large = this.media[i].url + 'large.jpg';
          this.media[i].original = this.media[i].url + 'original.jpg';
        };

        this.getGroups();
        this.getAlreadySelected(this.modalConfig.alreadySelected);
      });
    },
    getGroups: function() {
      this.groups = ['all', 'selected'];
      for (var i = 0; i < this.media.length; i++) { //Loop through each media
        for (var x = 0; x < this.media[i].groups.length; x++) { //Loop through each group in media
          if(this.groups.indexOf(this.media[i].groups[x]) === -1) { //Already exists?
            this.groups.push(this.media[i].groups[x]); //else add to groups array
          }
        }
      }
      if(this.groups.indexOf(this.selectedGroup) === -1) {
        this.selectedGroup = 'all';
      }
    },

    getAlreadySelected: function() {
      this.selectedImages = [];
      if(this.modalConfig.alreadySelected) {
        if(!Array.isArray(this.modalConfig.alreadySelected)) { this.modalConfig.alreadySelected = [this.modalConfig.alreadySelected]; }
        for(var idx = 0; idx < this.modalConfig.alreadySelected.length; idx++) {
          if(this.media.length > 0) {
            for(var idx2 = 0; idx2 < this.media.length; idx2++) {
              if(this.media[idx2]._id === this.modalConfig.alreadySelected[idx]._id) {
                this.selectedImages.push(this.media[idx2]);
              }
            }
          }
        }
      }
    },

    switchImages: function() {
      // Inform our controls that we are currently moving
      this.globals.transitioning = false;

      // Remove the current binding since we are about to destory this element and redefine it
      this.dom.mainFullsizeBox.unbind('transitionend', this.switchImages);
      this.dom.mainFullsizeBox.remove();

      if(this.globals.direction === 'left') {
        // The new mainFullsizeBox is now the image that just finished sliding in
        this.dom.mainFullsizeBox = this.dom.previousImageTag;

        // Bind transitionend to this element
        this.dom.mainFullsizeBox.bind('transitionend', this.switchImages);

        // Decrease the index
        this.globals.fullsizeImageIndex--;
      } else if(this.globals.direction === 'right') {
        // Repeat of above but for right instead
        this.dom.mainFullsizeBox = this.dom.nextImageTag;
        this.dom.mainFullsizeBox.bind('transitionend', this.switchImages);
        this.globals.fullsizeImageIndex++;
      }

      // Store the image data snapshot in case we don't save our changes
      this.globals._fullscreenImage = angular.copy(this.fullscreenImage);
    },

    findPrevious: function(currentIndex) {
      this.globals.previousImage = $('.image-thumbnail').eq(currentIndex - 1).find('img');

      if(this.globals.previousImage.length > 0) {
        // Returns this data object of image
        return this.globals.previousImage.this().item;
      }
      return {};
    },

    findNext: function() {
      // Using the index of the currently viewed image, find the image that comes afterwards
      this.globals.nextImage = $('.image-thumbnail').eq(currentIndex + 1).find('img');

      if(this.globals.nextImage.length > 0) {
        // Returns this data object of image
        return this.globals.nextImage.this().item;
      }
      return {};
    },

    // Makes the clicked image fullsize
    expand: function($event, image, $index) {
      if(this.fullscreen) { return this.exitFullscreen(); }
      // Store the index position of the fullscreen image
      this.globals.fullsizeImageIndex = $index;

      // Set the fullscreen image to the image that was clicked on
      this.fullscreenImage = image;

      this.firstImageUrl = this.fullscreenImage.small;

      $compile(dom.mainFullsizeBox)(this);
      this.globals._fullscreenImage = angular.copy(this.fullscreenImage);

      this.fullscreen = true;
    },

    // Exits fullsize image
    exitFullscreen: function() {
      this.saveImageEdits();
      this.fullscreen = false;
    },

    // Slide to the next image
    next: function() {

      // If the slider is already sliding don't run this click
      if(this.globals.transitioning) return false;

      // Check if we are at the end of beginning of the images and so move the currentIndex to the beginning
      if(this.globals.fullsizeImageIndex >= this.media.length-1) {
        this.globals.fullsizeImageIndex = -1;
      }

      // inform our transitionend what direction we've moved
      this.globals.direction = 'right';

      // Save any changes made to captions, alt, and albums
      this.saveImageEdits();

      // Set the new fullscreen image
      this.fullscreenImage = findNext(this.globals.fullsizeImageIndex);

      // Create a new image element to the right of the current fullscreen image
      dom.nextImageTag = $('<div class="fullsize-box right"><img ng-src="' + this.fullscreenImage.small + '" class="fullscreen-image"></div>');
      dom.fullscreenContainer.append(dom.nextImageTag);
      $compile(dom.nextImageTag)(this);

      // Has to go in a timeout so the '.right' class has time to set initial position
      // That way when the 'center' class is added it will slide to the middle
      $timeout(function() {
        dom.nextImageTag.removeClass('right').addClass('center main');
        dom.mainFullsizeBox.addClass('left').removeClass('main center');
      });

      this.globals.transitioning = true;
    },

    // Slide to the previous image
    prev: function() {
      if(this.globals.transitioning) return false;
      if(this.globals.fullsizeImageIndex <= 0) {
        this.globals.fullsizeImageIndex = this.media.length;
      }

      this.globals.direction = 'left';

      this.saveImageEdits();

      this.fullscreenImage = findPrevious(this.globals.fullsizeImageIndex);
      dom.previousImageTag = $('<div class="fullsize-box left"><img ng-src="' + this.fullscreenImage.small + '" class="fullscreen-image"></div>');
      dom.fullscreenContainer.append(dom.previousImageTag);
      $compile(dom.previousImageTag)(this);

      $timeout(function() {
        dom.previousImageTag.removeClass('left').addClass('center main');
        dom.mainFullsizeBox.addClass('right').removeClass('main center');
      });

      this.globals.transitioning = true;
    },

    saveImageEdits: function() {
      if(!this.fullscreenImage || !this.fullscreenImage._id) return false;

      var groupsArraysMatch = this.fullscreenImage.groups.sort().join(',') === this.globals._fullscreenImage.groups.sort().join(',');
      var galleriesArraysMatch = this.fullscreenImage.galleries.sort().join(',') === this.globals._fullscreenImage.galleries.sort().join(',');

      if(this.globals._fullscreenImage.alt === this.fullscreenImage.alt && this.globals._fullscreenImage.attribute === this.fullscreenImage.attribute && groupsArraysMatch && galleriesArraysMatch) {
        return false;
      }

      var image = _.merge({}, this.fullscreenImage);
      image.$$hashKey = undefined;
      api.media.update({_id: this.fullscreenImage._id}, image);
    },

    groupSelected: function() {
      var prompt = window.prompt('Album Name?');
      var re = new RegExp("[_a-zA-Z0-9\\-\\.]+");

      if(!prompt || !re.test(prompt)) return false;

      var urlArray = [];

      // Get the visibile images' urls
      for (var i = 0; i < this.selectedImages.length; i++) {
        urlArray.push(this.selectedImages[i].url);
      };

      if(urlArray.length < 1) return false;

      // Update those images
      api.media.update({ url: {$in: urlArray } }, { $push: {groups: prompt} }).then(() => {
        for (var i = 0; i < this.selectedImages.length; i++) {
          if(this.selectedImages[i].groups.indexOf(prompt) === -1) {
            this.selectedImages[i].groups.push(prompt);
          }
        }
        this.selectedGroup = prompt;
        this.getGroups();
      });
    },

    ungroupSelected: function() {
      var urlArray = [];

      // Get the visibile images' urls
      for (var i = 0; i < this.selectedImages.length; i++) {
        urlArray.push(this.selectedImages[i].url);
      }

      if(!this.selectedGroup || this.selectedGroup === 'all' || this.selectedGroup === 'selected') { return false; }
      if(urlArray.length < 1) { return false };

      // Update those images
      api.media.update({ url: {$in: urlArray } }, { $pull: {groups: this.selectedGroup} }).then(() => {
        for (var i = 0; i < this.selectedImages.length; i++) {
          if(this.selectedImages[i].groups.indexOf(this.selectedGroup) !== -1) {
            this.selectedImages[i].groups.splice(this.selectedGroup, 1);
          }
        }
        this.getGroups();
      });
    },

    deleteOne: function() {
      // Delete image
      if(image.url) {
        api.media.delete({ url: image.url}).then(response => {
          console.log("response", response);
          toastr.success('Successfully deleted that image');
          this.fullscreen = false;
          this.media.splice(this.media.indexOf(image), 1);
        });
      }
    },

    deleteSelected: function() {
      var urlArray = [];

      // Get the visibile images' urls
      for (var i = 0; i < this.selectedImages.length; i++) {
        urlArray.push(this.selectedImages[i].url);
      };

      if(urlArray.length < 1) return false;

      // Delete those images
      api.media.delete({ url: {$in: urlArray } }).then((response) => {
        toastr.success('Successfully deleted those images');
        for (var i = 0; i < this.selectedImages.length; i++) {
          this.media.splice(this.media.indexOf(this.selectedImages[i]), 1);
        }
      });
    },

    deleteAllVisible: function() {
      var urlArray = [];

      // Get the visibile images' urls
      for (var i = 0; i < this.filteredMedia.length; i++) {
        urlArray.push(this.filteredMedia[i].url);
      };

      if(urlArray.length < 1) return false;

      // Delete those images
      api.media.delete({ url: {$in: urlArray } }).then(response => {
        toastr.success('Deleted All visible images');
        for (var i = 0; i < this.filteredMedia.length; i++) {
          this.media.splice(this.media.indexOf(this.filteredMedia[i]), 1);
        }
      })
    },

    selectAllVisible: function() {
      if(this.selectedImages.length >= this.filteredMedia.length) {
        this.selectedImages = [];
        this.allSelected = false;
      } else {
        this.selectedImages = [];
        this.selectedImages = this.selectedImages.concat(this.filteredMedia);
        this.allSelected = true;
      }
    },

    getSelectedImages: function() {
      if(this.modalConfig.single) {
        return this.selectedImages[0];
      } else {
        return this.selectedImages;
      }
    },

    selectImage: function(e, item) {
      // If image is not selected
      if(this.selectedImages.indexOf(item) === -1) { //Image is not selected
        if(this.modalConfig.single) { this.selectedImages = []; };
        if(e.shiftKey || e.metaKey) {
          var startingPosition = this.media.indexOf(this.selectedImages[this.selectedImages.length-1]);
          var endingPosition = this.media.indexOf(item);
          if(startingPosition > -1 && endingPosition > -1) {
            this.selectedImages = this.selectedImages.concat(this.media.slice(startingPosition, endingPosition));
          } else {
            this.selectedImages.push(item);
          }
        }
        this.selectedImages.push(item);
      } else {
        this.selectedImages.splice(this.selectedImages.indexOf(item), 1);
      }
    },

    downloadSelected: function() {
      // Get the visibile images' urls
      for (var i = 0; i < this.selectedImages.length; i++) {
        var path = this.selectedImages[i].url + this.selectedImages[i].filename;
        var name = this.selectedImages[i].url.match(/([^\/]*)\/*$/)[1];
        this.downloadURI(path, name);
      };
    },

    downloadURI: function(uri, name) {
      var link = document.createElement("a");
      link.download = name;
      link.href = uri;
      link.click();
    },

    exitFullscreen: function() {
      this.saveImageEdits();
      this.fullscreen = false;
    }
  },
  ready: function () {
    if(!auth.currentUser) { return false; }

    this.selectedGroup = this.groups[0]

    // Stores all interactive elements in the dom object
    this.dom = {
      fullscreenContainer: $('.fullscreen-master-container'),
      mainFullsizeBox: $('.fullsize-box.main'),
      nextImageTag: null, //is the next image in sequence when moving right
      previousImageTag: null //is the previous image in sequence when moving left
    };


    // When the slider has finished it's animated slide then function the switchImages function
    this.dom.mainFullsizeBox.bind('transitionend', this.switchImages);

    this.getMedia();

    radio.$on('cms.imagesUploaded', function() {
      this.getMedia();
    });



    document.onkeydown = function(e) {

      // Check if keys right and left are coming from an input field or that the altKey is pressed
      // If not then slide the slider in the appropriate direction
      if(e.target.tagName !== 'INPUT' || e.altKey) {
        if(e.keyCode === 37) { //left
          e.preventDefault();
          this.prev();
        } else if(e.keyCode === 39) { //right
          e.preventDefault();
          this.next();
        }
      }
    };

    this.hasToken = auth.getToken()
    if (this.hasToken) {
      var uploader = new ss.SimpleUpload({
        button: 'upload-image-btn',
        url: '/api/image-uploads',
        customHeaders: {
          'Authorization': 'Bearer ' + auth.getToken()
        },
        multiple: true,
        maxSize: 1024,
        responseType: 'json',
        name: 'file',
        allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
        onSubmit: function(filename, extension) {
          // Create the elements of our progress bar
          var progress = document.createElement('div'), // container for progress bar
              bar = document.createElement('div'), // actual progress bar
              fileSize = document.createElement('div'), // container for upload file size
              wrapper = document.createElement('div'), // container for this progress bar
              //declare somewhere: <div id="progressBox"></div> where you want to show the progress-bar(s)
              progressBox = document.getElementById('progressBox'); //on page container for progress bars

          // Assign each element its corresponding class
          progress.className = 'progress progress-striped';
          bar.className = 'progress-bar progress-bar-success';
          fileSize.className = 'size';
          wrapper.className = 'wrapper';

          // Assemble the progress bar and add it to the page
          progress.appendChild(bar);
          wrapper.innerHTML = '<div class="name">'+filename+'</div>'; // filename is passed to onSubmit()
          wrapper.appendChild(fileSize);
          wrapper.appendChild(progress);
          progressBox.appendChild(wrapper); // just an element on the page to hold the progress bars

          // Assign roles to the elements of the progress bar
          this.setProgressBar(bar); // will serve as the actual progress bar
          this.setFileSizeBox(fileSize); // display file size beside progress bar
          this.setProgressContainer(wrapper); // designate the containing div to be removed after upload
        },
        onComplete: function(filename, response) {
          if (!response) {
              toastr.warning('Sorry but the images failed to upload. You may not have permission to upload images.')
              return false;
          }

          radio.$emit('cms.imagesUploaded')
          toastr.success('Images successfully saved');
        }
      })

      // var uploader = this.mediaUploader = new FileUploader({
      //     url: '/api/image-uploads',
      //     headers: {
      //       'Authorization': 'Bearer ' + auth.getToken()
      //     },
      //     autoUpload: true
      // });
    }

    this.getMedia();

    // Clean up our event listeners when we leave this page
    this.$on('$destroy', () => {
      this.dom.mainFullsizeBox.unbind('transitionend', switchImages);
    })
  }
})
