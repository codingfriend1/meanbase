

Vue.component('mb-icon', {
  template: `
    <i :class="source.classes" @click="openModal"></i>
  `,
  props: ['source'],
  methods: {
    openModal: function() {
      radio.$emit('cms.modalConfig', { source: this.source })
      radio.$emit('cms.currentModal', 'mb-choose-icon')
    }
  },
  created: function() {
    if(!this.source) {
      this.source = {
        classes: 'fa fa-pencil example'
      }
    }
  }
})
