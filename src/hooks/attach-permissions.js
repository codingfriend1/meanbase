import _ from 'lodash';

export default options => {
  return async hook => {
    try {

      if (!hook.params.provider) { return Promise.resolve(hook); }

      const role = hook.params.user.role;
      let access = await hook.app.service('roles').find({query: { role } });

      let permissions;
      if(access.length > 0) {
        access = access[0];
        permissions = _.keys(_.pickBy(access.permissions, value => value));
      } else {
        permissions = [];
      }

      hook.params.user.permissions = permissions;

      if(hook.type === 'after' && hook.result && !Array.isArray(hook.result)) {
        hook.result.permissions = permissions;
      }

      Promise.resolve(hook);
    } catch(err) {
      console.log("error attaching permissions: ", err);
      Promise.reject(err);
    }
  }
};
