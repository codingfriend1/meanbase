Vue.component('mbDynamicComponent', {
  props: ['addon'],
  created: function(h) {
    console.log("this.addon", this.addon);
    if(!this.addon.data) {
      this.addon.data = {list: []}
    }
    this.$options.template = this.addon.html
  },
})

// Vue.component('dynamic-add-on', {
//   template: require('./mb-add-on-area.jade'),
//   props: ['area', 'extensions'],
//   data: () => ({
//     editMode: window.editMode
//   }),
//   methods: {
//     openModal: function() {
//       radio.$emit('cms.modalConfig', {area: this.area})
//       radio.$emit('cms.currentModal', 'mb-choose-add-on')
//     }
//   }
// })
