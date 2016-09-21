let mbPageDrawer
let cmsHeadbar = Vue.component('mb-cms-headbar', {
  template: require('./mb-cms-headbar.jade'),
  props: [
    'pageTemplate',
    'isPublished',
    'editMode',
    'menus'
  ],
  ready: function() {
    window.dropdown.init()
    mbPageDrawer = document.getElementById("mb-pages-drawer")
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
      radio.$emit('cms.updateTemplate')
      this.hideScreenshot(template)
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
      radio.$emit('cms.toggleEditMode')
    },
    undoMoment: function() {
      radio.$emit('cms.undoMoment')
    },
    resetDraft: function() {
      radio.$emit('cms.resetDraft')
    },
    deletePage: function() {
      radio.$emit('cms.removePage')
    },
    createPage: function(event) {
      radio.$emit('cms.createPage')
    },
    togglePublishPage: function() {
      radio.$emit('cms.togglePublish')
    },
    toggleEdit: function() {
      radio.$emit('cms.toggleEditMode')
    },
    publishChanges: function() {
      radio.$emit('cms.publishChanges')
      this.addRecentEditLink(this.page.url)
    },
    addRecentEditLink: function(recentLink) {
      if(!recentLink) { return false; }

      for (var i = 0; i < recentUrls.length; i++) {
        if(recentLink === recentUrls[i] && recentLink.indexOf('/missing') === -1) {
          return false
        }
      }

      if(recentUrls.length > 2) {
        recentUrls[0] = recentLink
      } else {
        recentUrls.unshift(recentLink)
      }
      localStorage.setItem('previousEditUrls', JSON.stringify(recentUrls))
      this.previousEditUrls = recentUrls
    },
    openMBPageDrawer: function($event) {
      console.log("mbPageDrawer", mbPageDrawer);
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

      api.pages.find({$select: ['url', 'title']}).then(response => {
        this.drawerPages = response
      });
    }
  }
})
