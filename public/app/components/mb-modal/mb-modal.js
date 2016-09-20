/**
 * Modal thanks to Adam Wathan
 * https://adamwathan.me/2016/01/04/composing-reusable-modal-dialogs-with-vuejs/
 */

Vue.component('mb-modal', {
  template: require('./mb-modal.jade'),
  props: ['show', 'modalConfig'],
  methods: {
    close: function () {
      radio.$emit('cms.currentModal', undefined)
    }
  },
  ready: function () {
    document.addEventListener("keydown", (e) => {
      if (this.show && e.keyCode == 27) {
        radio.$emit('cms.currentModal', undefined)
      }
    })
  }
})
