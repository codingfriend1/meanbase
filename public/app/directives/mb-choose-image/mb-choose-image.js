Vue.directive('mbChooseImage', {
  params: ['single', 'belongsTo'],
  twoWay: true,
  bind: function (value) {
    console.log("this.params", this.params);
    let id = this.expression + Date.now()

    let single = window.services.helpers.asBoolean(this.params.single)

    // let single = true
    // if((typeof this.params.single === 'string' && this.params.single.toLowerCase() === 'false') || (typeof this.params.single === 'boolean' && this.params.single === false) ) {
    //   this.params.single = false
    // }
    // console.log("single", single);
    this.el.addEventListener("click", () => {
      radio.$emit('cms.modalConfig', { single, id })
      radio.$emit('cms.currentModal', 'mb-image-manager')
    });
  }
})
