import _ from 'lodash';
import errors from 'feathers-errors';

module.exports = (options) => {
  return async (hook, next) => {

    if (!hook.params.provider) {
      return next();
    }

    try {
      const isDisabled = await hook.app.service('settings').find({query: {name: 'disable-comments'}}) || false;

      if(_.isEmpty(hook.data)) { return next(new errors.BadRequest('The comment did not contain any content.')); }

      if(isDisabled.length === 0 || !isDisabled[0].value) {
        // Setup query for banned commentors
        var findBanned;
        if(hook.data.email) {
          findBanned = {$or: [ {ip: hook.params.ip}, {email: hook.data.email} ]};
        } else {
          findBanned = {ip: hook.params.ip};
        }

        const isMemberBanned = await hook.app.service('bans').find({query:findBanned});

        if(Array.isArray(isMemberBanned) && isMemberBanned.length === 0) {
          return next()
        } else {
          return next(new errors.Forbidden('Sorry but you have been banned from commenting on this site.'));
        }

      } else {
        return next(new errors.Unavailable('Comments are disabled for this site'));
      }
    } catch(err) {
      console.log('error permitting comment', err);
      return next(err);
    }

  }
}
