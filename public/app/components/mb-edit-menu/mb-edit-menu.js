Vue.component('mb-choose-add-on', {
  template: require('./mb-edit-menu.jade'),
  props: ['modalConfig', 'close'],
  data: () => ({

  }),
  methods: {
    close: function() {
      radio.$emit('cms.currentModal', undefined)
    }
  },
  created: function() {

  }
})
