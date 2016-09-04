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

  app.configure(ifEmptyCreate('roles', rolesData))
  app.configure(ifEmptyCreate('users', userData))

  app.configure(resetData('extensions'))

  // if(app.get('reset-users')) {
  //   app.configure(resetData('users', userData))
  // }

  if(app.get('seed')) {
    app.configure(ifEmptyCreate('users', userData))
    app.configure(ifEmptyCreate('pages', pagesData))
    app.configure(ifEmptyCreate('menus', menusData))
    app.configure(ifEmptyCreate('comments', commentsData))
  }

  if(app.get('reset-seed')) {
    app.configure(resetData('pages', pagesData))
    app.configure(resetData('menus', menusData))
    app.configure(resetData('comments', commentsData))
    app.configure(resetData('themes'))
    app.configure(resetData('roles', rolesData))
    app.configure(resetData('users', userData))
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
      if(found.length !== 0) return false
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
    await this.service(name).remove(null, {query:{}})
  }
}
