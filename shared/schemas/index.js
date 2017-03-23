const _ = require("lodash")

/**
 * Checks for mongoose in the browser and if it's not loaded recognizes this is a node environment. Mongoose in the browser has a promise bug that is fixed by using bluebird
 */

if(!global.mongoose) {
  global.mongoose = require('mongoose')
} else {
  const bluebird = require('bluebird')
  global.mongoose.Promise = bluebird
}

let schemas = {
  // inject schemas
  ban: require("./ban.js"),
  comments: require("./comments.js"),
  custom: require("./custom.js"),
  extensions: require("./extensions.js"),
  images: require("./images.js"),
  menus: require("./menus.js"),
  message: require("./message.js"),
  pages: require("./pages.js"),
  roles: require("./roles.js"),
  settings: require("./settings.js"),
  shared_content: require("./shared-content.js"),
  staging: require("./staging.js"),
  themes: require("./themes.js"),
  user: require("./user.js"),
  // end inject schemas
}
let models = {}



/**
 * Maps patterns and patternMessages into mongoose validators and creates mongoose models
 * Also runs pre and post hooks on schema
 */

_.forOwn(schemas, (schema, key) => {
  const composition = schema.schema
  const validations = schema.validations
  const indexBy = schema.indexBy
  _.forOwn(composition, function(val, key) {
    if(val.pattern && val.patternMessage) {
      composition[key].validate = {
        validator: function(v) {
          return val.pattern.test(v)
        },
        message: val.patternMessage
      }
    }
  })
  schemas[key].schema = new global.mongoose.Schema(composition)

  if(validations) {
    _.forOwn(validations, function(val, k) {
      if(k === 'pre') {
        _.forOwn(validations.pre, function(val, k) {
          schemas[key].schema.pre(k, val)
        })
      } else if (k === 'post') {
        _.forOwn(validations.post, function(val, k) {
          schemas[key].schema.post(k, val)
        })
      }
    })
  }

  if(indexBy) {
    schemas[key].schema.index(indexBy, {unique: true});
  }

  if(global.mongoose.model) {
    models[key] = global.mongoose.model(key, schemas[key].schema)
  }
})

module.exports = {
  models,
  schemas
}
