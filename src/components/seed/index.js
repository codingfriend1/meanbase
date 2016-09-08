'use strict'

const rolesData = require('./seed/roles.js')
const pagesData = require('./seed/pages.js')
const menusData = require('./seed/menus.js')
const commentsData = require('./seed/comments.js')
const themes = require('./seed/themes.js')
const extensions = require('./seed/extensions.js')

// var seeds = fs.readdirSync('./seed').filter(function(file) {
//  return fs.statSync(path.join('seed', file)).isFile()
// })
//
// seeds.forEach(function (file) {
//   if(app.get('seed')) {
//     app.configure(ifEmptyCreate(rolesService, rolesData))
//   }
// 	require( path.join(folders.admin.gulp, file))(gulp, plugins, folders.admin, config)
// })


module.exports = function() {
  const app = this

  const userData = require('./seed/user.js')(app)

  ifEmptyCreate = ifEmptyCreate.bind(this)
  resetData = resetData.bind(this)
  removeData = removeData.bind(this)

  app.configure(ifEmptyCreate('roles', rolesData))
  app.configure(resetData('extensions'))

  let seed = process.env.SEED && typeof process.env.SEED === 'string'? process.env.SEED.toLowerCase(): process.env.SEED
  
  let reset_seed = process.env.RESET_SEED && typeof process.env.RESET_SEED === 'string'? process.env.RESET_SEED.toLowerCase(): process.env.RESET_SEED

  if(seed === "true") {
    console.log('seeding site data');
    app.configure(ifEmptyCreate('pages', pagesData))
    app.configure(ifEmptyCreate('menus', menusData))
    app.configure(ifEmptyCreate('comments', commentsData))
  }

  if(reset_seed === "true") {
    console.log('resetting site data');
    app.configure(resetData('pages', pagesData))
    app.configure(resetData('menus', menusData))
    app.configure(resetData('comments', commentsData))
    app.configure(resetData('themes'))
    app.configure(resetData('roles', rolesData))
    removeData('users')()
    removeData('staging')()
    removeData('settings')()
    removeData('ban')()
  }

  // app.configure(resetData('themes'))

  setTimeout(() => {
    themes.call(this)
    extensions.call(this)
  }, 300)
}

// ### ifEmptyCreate(model, data)
/**
 * If the model is empty then populate it's data
 * @param {object} model Mongoose Model
 * @param {object|object[]} data Object data or Array of Object data to insert
 * @return {function} Returns a method to be called by configure
 */
function ifEmptyCreate(name, data) {
  return async () => {
    try {
      let found = await this.service(name).find({query: {}})
      if(found && Number.isInteger(found.total) && Array.isArray(found.data)) {
        found = found.data
      }
      if(found.length !== 0) { return false }
      await this.service(name).create(data)
      console.log('default ' + name  + ' created')
    } catch (err) {
      if(err) { console.log('trouble seeding ' + name + ': ', err) }
    }
  }
}

// ### resetData(model, data)
/**
 * Erases all data in the model and calls ifEmptyCreate
 * @param {object} model Mongoose model
 * @param {object|object[]} data Data to insert
 */
function resetData(name, data) {
  return async () => {
    try {
      let response = await this.service(name).remove(null, {query: {}})
      ifEmptyCreate(name, data)()
    } catch (err) {
      console.log("trouble resetting data for " + name, err)
    }
  }
}

function removeData(name) {
  return async () => {
    console.log('resetting ' + name);
    await this.service(name).remove(null, {query:{}})
  }
}
