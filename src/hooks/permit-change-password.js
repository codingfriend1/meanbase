import errors from 'feathers-errors';
const auth = require('feathers-authentication').hooks;
import bcrypt from 'bcryptjs';

const defaults = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
};

export default options => {
  options = Object.assign({}, defaults, options);
  return hook => {
    if (!hook.params.provider) { return hook; }

    return new Promise(async function(resolve, reject) {
      try {
        if(hook.data[options.passwordField]) { return reject(new errors.Forbidden('You are not allowed to change the password without providing the oldPassword and the newPassword')); }

        if(!hook.data.oldPassword && !hook.data.newPassword) {
          return resolve(hook);
        }

        if(!hook.data.oldPassword || !hook.data.newPassword) {
          return reject(new errors.BadRequest('You need to provide both the oldPassword and the newPassword'));
        }

        if(!hook.params.user) { return reject('You must be logged in to change your password'); }


        let user = await hook.app.service('users').get(hook.params.user._id);

        const crypto = options.bcrypt || bcrypt;
        // Check password
        const hash = user[options.passwordField];

        if (!hash) {
          return reject(new Error(`User record in the database is missing a '${options.passwordField}'`));
        }

        crypto.compare(hook.data.oldPassword, hash, async (error, result) => {
          if (error) {
            return reject(error);
          }

          if(result) {
            hook.data.password = hook.data.newPassword;
            hook.data.newPassword = undefined;
            hook.data.oldPassword = undefined;
            return resolve(hook);
          } else {
            reject(new errors.Forbidden("The old password you provided and the one in your account don't match"));
          }
        });
      } catch(err) {
        console.log('err', err);
        reject(err);
      }
    });
  }
}
