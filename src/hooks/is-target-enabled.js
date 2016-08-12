import errors from 'feathers-errors';

export default (options) => {
  return async hook => {

    if(!hook.params.provider) { return Promise.resolve(hook); }

    if(!hook.data.email) {
      return Promise.resolve(hook);
    }

    try {
      const found = await hook.app.service('users').find({query: {email: hook.data.email}});
      if(found.length > 0) {
        if(found[0].enabled) {
          return Promise.resolve(hook);
        } else {
          return Promise.reject(new errors.Forbidden('This user is not enabled'));
        }
      } else {
        return Promise.reject(new errors.Forbidden('Could not find this user.'));
      }
    } catch(err) {
      console.log('Checking user enabled error', err);
    }

  }
}
