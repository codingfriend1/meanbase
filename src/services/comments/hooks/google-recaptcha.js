var requestify = require('requestify');
import _ from 'lodash';
import errors from 'feathers-errors';

module.exports = (options) => {
  return async hook => {

    if (!hook.params.provider) {
      return hook;
    }

    if(_.isEmpty(hook.data)) { return next(new errors.BadRequest('The comment did not contain any content.')); }

    if(!hook.data['g-recaptcha-response']) {
      return Promise.reject(new errors.BadRequest("The request did not contain a 'g-recaptcha-response' property."));
    }

    try {
      const hasKey = await hook.app.service('settings').find({query: {name: 'recaptchaKey'}}) || '';

      let response = await requestify.request('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        params: {
          'response': hook.data['g-recaptcha-response'],
          'remoteip': hook.params.ip,
          'secret': hasKey[0].value
        }
      });

      const isValid = response.getBody();
      hook.data['g-recaptcha-response'] = undefined;
      if(hasKey[0].value && !isValid.success) {
        return Promise.reject(new errors.Forbidden('Sorry but this comment looks like spam.'));
      } else {
        const isAutoAcceptOn = hook.app.service('settings').find({ query: {name: 'auto-accept-coments' } });

        if(isAutoAcceptOn[0] && isAutoAcceptOn[0].value) {
          if(hook.data) {
            hook.data.approved = autoApprove;
          }
        }
        return Promise.resolve(hook);
      }
    } catch(err) {
      console.log('error validing with google recaptcha', err);
      return Promise.reject(err);
    }
  }
}
