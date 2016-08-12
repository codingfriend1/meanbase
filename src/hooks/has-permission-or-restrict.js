import errors from 'feathers-errors';

export default (permissionName, restriction) => {
  return async (hook) => {
    if (!hook.params.provider) { return hook; }
    if(!hook.params.user || (hook.params.user.permissions.indexOf(permissionName) === -1 && hook.params.user.permissions.indexOf('allPrivilages') === -1) ) {

      let query = Object.assign({}, hook.params.query, restriction);
      const params = Object.assign({}, hook.params, { provider: undefined });
      if(hook.id !== null && hook.id !== undefined) {
        const id = {};
        id._id = hook.id;
        query = Object.assign(query, id);
      }
      try {
        let results = await this.find({ query }, params);

        if(hook.method === 'get' && Array.isArray(results) && results.length === 1) {
          hook.result = results[0];
          return hook;
        } else {
          hook.result = results;
          return Promise.resolve(hook);
        }
      } catch (e) {
        return Promise.reject(new errors.NotFound(`No record found`));
      }

    }
  };
};
