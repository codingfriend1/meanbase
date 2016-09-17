

let cmsHeadbar = Vue.component('cms-headbar', {
  template: require('./cms-headbar.jade'),
  props: [
    'page',
    'editMode'
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


  },
  data: () => ({
    pages: [],
    mbSearchPagesDrawer: '',
    previousEditUrls: [],
    drawerPages: [],
    themeTemplates: Object.getOwnPropertyNames(window.meanbaseGlobals.themeTemplates),
    permissions: _.get(auth, 'currentUser.permissions') || []
  }),
  methods: {
    updateTemplate: function(template) {

    },
    showScreenshot: function(template) {

    },
    hideScreenshot: function(template) {

    },
    preview: function() {

    },
    undoMoment: function() {

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
