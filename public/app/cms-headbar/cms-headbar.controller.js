

let cmsHeadbar = Vue.component('cms-headbar', {
  template: require('./cms-headbar.jade'),
  props: [
    'page',
    'editMode',
    'menus'
  ],
  ready: async function() {

    window.dropdown.init()

    let mbPageDrawer = document.getElementById("mb-pages-drawer")
    /* Set the width of the side navigation to 250px */
    this.openMBPageDrawer = ($event) => {
      if(mbPageDrawer) {
        mbPageDrawer.classList.add('mb-drawer-open')
      }

      $event.stopPropagation()

      document.body.addEventListener('click', function mbCloseDrawer(event) {
        if(!$(event.target).closest("#mb-pages-drawer").length || $(event.target).is('.mb-page-link')) {
          mbPageDrawer.classList.remove('mb-drawer-open')
          document.body.removeEventListener('click', mbCloseDrawer)
        }
        event.stopPropagation()
      })

      api.pages.find({$select: ['url', 'title']}).then((response) => {
        console.log("response", response);
        this.drawerPages = response
      });
    }

    radio.$on('cms.finishPublishPages', function() {
      radio.$emit('cms.updateMenusToReflectPages')
    })

  },
  data: () => ({
    pages: [],
    mbSearchPagesDrawer: '',
    previousEditUrls: [],
    drawerPages: [],
    currentScreenshot: null,
    themeTemplates: Object.getOwnPropertyNames(window.meanbaseGlobals.themeTemplates),
    permissions: _.get(auth, 'currentUser.permissions') || []
  }),
  methods: {
    updateTemplate: function(template) {
      this.page.template = template
      radio.$emit('cms.elementsChanged')
      this.hideScreenshot(template)

      radio.$once('cms.finishedAutoSaving', function(event, successful) {
        radio.$emit('cms.updateTemplate')
      })
    },
    showScreenshot: function(template) {
      if(!window.meanbaseGlobals.themeTemplatePaths[template]) { return false; }
			var screenshot = window.meanbaseGlobals.themeTemplatePaths[template].screenshot;
			if(screenshot) {
        try {
          document.body.removeChild(self.currentScreenshot);
        } catch(err) {}
				this.currentScreenshot = document.createElement("div");
				this.currentScreenshot.classList.add('template-screenshot-backdrop');
				var image = new Image();
				image.src = screenshot;
				image.onerror = function() {
					self.hideScreenshot(template);
				};
				image.alt = template + ' screenshot';
				image.classList.add('template-screenshot');
				this.currentScreenshot.appendChild(image);
				document.body.appendChild(this.currentScreenshot);
			}
    },
    hideScreenshot: function(template) {
      if(this.currentScreenshot) {
        try {
          document.body.removeChild(this.currentScreenshot);
        } catch(err) {

        }
			}
    },
    preview: function() {

    },
    undoMoment: function() {
      this.lastPageUndoData2 = this.lastPageUndoData
      lastMenuUndoData2 = lastMenuUndoData
      if(this.lastPageUndoData) {
        this.page = _.clone(this.lastPageUndoData, true)
      }

      if(lastMenuUndoData) {
        this.menus = _.clone(lastMenuUndoData, true)
      }

      $rootScope.$emit('cms.updateView')
    },
    resetDraft: function() {

    },
    deletePage: function() {

    },
    createPage: function(event) {

    },
    togglePublishPage: function() {

    },
    toggleEdit: function() {

    },
    publishChanges: function() {
      radio.$emit('cms.addRecentEditLink', this.page.url)
			radio.$emit('cms.publishChanges', this.page)
			radio.$emit('cms.publishExtensionData')
      this.autoSaveSessionSnapshot = {}
      radio.$emit('cms.takePageSnapshot', true)
      this.lastPageUndoData2 = _.clone(this.page, true)
    },
    openMBPageDrawer: function() {

    }
  }
})


Vue.filter('searchDrawer', function (value, input) {
  if(value.includes(cmsHeadbar.data.mbSearchPagesDrawer)) {
    return value
  }
})
