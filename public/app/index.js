// import 'babel-polyfill';

import './app.styl'
import './globals.js'

import "./services/api/feathers.service.js"
import "./services/api/endpoints.service.js"
import "./services/api/api.service.js"
import "./services/auth/auth.service.js"
import './services/page/page.service'

// inject js
import "./components/cms-headbar/cms-headbar.controller.js"
import "./components/mb-choose-image/mb-choose-image.js"
import "./components/mb-text/mb-text.js"
import "./components/page/page.controller.js"
import "./filters/html-to-text/html-to-text.js"
// end inject js

import "./app/app.controller.js"
