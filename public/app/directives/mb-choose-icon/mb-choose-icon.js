

Vue.component('mb-choose-icon', {
  template: require('./mb-choose-icon.jade'),
  props: ['modalConfig'],
  data: () => ({
    icon: undefined,
    editIconForm: {},
    patterns: services.patterns,
    errorMessages: services.errors,
    hasContent: true,
    mergeClasses: '',
    hasContentError: '',
    showHiddenOptions: false,
    pages: []
  }),
  methods: {
    close: function() {
      radio.$emit('cms.currentModal', undefined)
    },
    saveIcon: function() {
      if(this.editIconForm.$valid && (this.hasContent || !this.icon.classes)) {
        if(this.icon.target === 'undefined') {
          this.icon.target = ""
        }
        this.modalConfig.source = Object.assign(this.modalConfig.source, this.icon)
        radio.$emit('cms.currentModal', undefined)
      }
    },
    updateTarget: function(url) {
      if(url && (url.includes('http://') || url.includes('https://'))) {
        if(this.icon.target === 'undefined') {
          this.icon.target = "_blank"
        }
      } else {
        this.icon.target = "undefined"
      }
    },
    checkHasContent: function() {
      let classes = this.icon.classes
      if(this.icon.classes && this.icon.classes.search(/[ ]fa$/) === -1 && this.icon.classes.search(/^fa[ ]/) === -1 && this.icon.classes.search(/[ ]fa[ ]/) === -1) {
        classes = 'fa ' + this.icon.classes
      }
      this.mergeClasses = classes
      Vue.nextTick(() => {
        var testIcon = $('#test-icon')

        let character = getComputedStyle(testIcon[0], ':before').content.replace(/'|"/g, '')
        this.hasContent = character.charCodeAt(0)

        if(!this.hasContent && this.icon.classes) {
          this.hasContentError = "Please choose a class name that will make the icon appear or erase all the class names."
        } else {
          this.hasContentError = ''
        }
      })
    }
  },
  created: function() {

    api.pages.find({$select: ['url']}).then(response => {
      this.pages = response
    }, function(err) {
      console.log('trouble finding pages for select');
    });

    this.icon = Object.assign({target: "", url: ""}, _.cloneDeep(_.get(this.modalConfig, 'source')))
    this.mergeClasses = this.icon.classes
  }
})
