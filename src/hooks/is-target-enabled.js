import errors from 'feathers-errors';

export default (options) => {
  return async hook => {

    if(hook.params.isRepeat) { return Promise.resolve(hook); }

    if(!hook.id) {
      return Promise.reject(new errors.Forbidden('The user is missing.'));
    }

    hook.params = Object.assign(hook.params, {isRepeat: true});

    try {
      const found = await hook.app.service('users').get(hook.id, hook.params);
      if(found) {
        if(found.enabled) {
          return Promise.resolve(hook);
        } else {
          return Promise.reject(new errors.Forbidden('This user is not enabled'));
        }
      } else {
        return Promise.reject(new errors.Forbidden('Could not find that user.'));
      }
    } catch(err) {
      console.log('Checking user enabled error', err);
    }

  }
}
