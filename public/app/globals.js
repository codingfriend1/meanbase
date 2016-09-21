var Vue = require('vue')
var VueRouter = require('vue-router')
import Sortable from 'vue-sortable'
window.Vue = Vue
window.VueRouter = VueRouter
window.Vue.use(window.VueRouter)
Vue.use(Sortable)

window.radio = new Vue()
window.services = {}
