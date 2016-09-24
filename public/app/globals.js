const Vue = require('vue')
const VueRouter = require('vue-router')
import Sortable from 'vue-sortable'
const vueForm = require('vue-form');
window.Vue = Vue
window.VueRouter = VueRouter
window.Vue.use(window.VueRouter)
Vue.use(Sortable)
Vue.use(vueForm);

window.radio = new Vue()
window.services = {}
