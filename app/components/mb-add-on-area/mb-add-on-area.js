Vue.component('mb-add-on-area', {
  template: require('./mb-add-on-area.jade'),
  props: ['area', 'extensions'],
  data: () => ({
    editMode: window.editMode
  }),
  methods: {
    openModal: function() {
      radio.$emit('cms.modalConfig', {area: this.area})
      radio.$emit('cms.currentModal', 'mb-choose-add-on')
    }
  }
})
