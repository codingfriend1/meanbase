

Vue.component('mb-choose-icon', {
  template: require('./mb-choose-icon.jade'),
  props: ['modalConfig'],
  data: () => ({
    icon: {}
  }),
  methods: {
    close: function() {
      radio.$emit('cms.currentModal', undefined)
    },
    saveIcon: function() {
      this.modalConfig.source = this.icon
    }
  },
  created: function() {
    this.icon = _.cloneDeep(_.get(this.modalConfig, 'source'))
  }
})
