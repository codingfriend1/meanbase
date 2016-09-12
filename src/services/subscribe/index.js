'use strict';

const hooks = require('./hooks');
import feathersErrors from 'feathers-errors'
import _ from 'lodash'

let mailgun, mailingList
if(process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN && process.env.MAILGUN_SUBSCRIPTION_EMAIL && process.env.ACCOUNT_EMAIL) {
  mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN})
  mailingList = mailgun.lists(process.env.MAILGUN_SUBSCRIPTION_EMAIL)
}

class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    return Promise.resolve([]);
  }

  get(id, params) {
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    });
  }

  create(data, params) {
    if(!mailgun || ! mailingList) { return new feathersErrors.BadRequest("Sorry but this server isn't setup to handle email subscriptions.") }

    if(!data.message || ! data.subject) { return new feathersErrors.BadRequest('You must provide a message and subject') }

    return new Promise((resolve, reject) => {
      let email = {
        from: process.env.ACCOUNT_EMAIL,
        to: process.env.MAILGUN_SUBSCRIPTION_EMAIL,
        subject: data.subject,
        html: data.message
      }

      mailgun.messages().send(email, function (err, body) {
        if(err) {
          return reject(err)
        } else {
          return resolve(body)
        }
      })
    })
  }

  update(id, data, params) {
    return Promise.reject('The update method is not supported on this server. Use patch instead.')
  }

  patch(id, data, params) {
    if(!mailgun || !mailingList) { return Promise.reject(new feathersErrors.NotImplemented("Sorry but this server isn't setup to handle email subscriptions."))  }
    if(!data.email) { return Promise.reject(new feathersErrors.BadRequest('An email must be required.')) }
    return new Promise((resolve, reject) => {

      let memberExists = false
      mailingList.members().list(function (err, members) {
        if(err) {
          return reject(err)
        }
        _.each(members.items, (member) => {
          if(member.address === data.email) {
            memberExists = true
            if(member.subscribed) {
              return resolve("This member is already subscribed.")
            }
          }
        })

        function respond(err, response) {
          if(err) { return reject(err) }
          if(response.message.indexOf("Address already exists") > -1) {
            return reject("That email already exists.")
          } else {
            return resolve(data.email + ' is now subscribed and will be notified when new pages are published.')
          }
        }

        if(memberExists) {
          mailingList.members(data.email).update({subscribed: 'true'}, respond)
        } else {
          mailingList.members().create({subscribed: true, address: data.email}, respond)
        }
      })

    })
  }

  remove(id, params) {
    if(!mailgun || ! mailingList) { return Promise.reject(new feathersErrors.NotImplemented("Sorry but this server isn't setup to handle email subscriptions.")) }
    if(!id) { return Promise.reject(new feathersErrors.BadRequest('An email is required in the params.')) }

    return new Promise((resolve, reject) => {
      mailingList.members(id).update({subscribed: false}, function (err, response) {
       if(err) {
         return reject(err)
       } else {
         return resolve(id + ' is unsubscribed.')
       }
     });
    })
  }
}

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/subscribe', new Service());

  // Get our initialize service to that we can bind hooks
  const subscribeService = app.service('/subscribe');

  // Set up our before hooks
  subscribeService.before(hooks.before);

  // Set up our after hooks
  subscribeService.after(hooks.after);
};

module.exports.Service = Service;
