import 'babel-polyfill'

import './app.styl'
import './globals.js'

import "./api/feathers.service.js"
import "./api/endpoints.service.js"
import "./api/api.service.js"

// inject js
import "./cms-headbar/cms-headbar.controller.js"
import "./routing/config-router.js"
import "./routing/template-router.js"
// end inject js

import "./master/master.controller.js"
