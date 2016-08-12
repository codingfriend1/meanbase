import fse from 'fs-extra';
import path from 'path';

export default options => {
  if(!options) { throw new Error('You must provide an options object.') }
  if(!options.service) { throw new Error('You must provide a service name'); }
  if(!options.containerProperty) { throw new Error('You must provide a containerProperty'); }
  if(!options.folderNameProperty) { throw new Error('You must provide a folderNameProperty name'); }

  return async hook => {

    if (!hook.params.provider) { return hook; }


    if(!hook.params.query && !hook.id) {
      return Promise.reject(new Error('You must provide a query or id in order to delete'));
    }

    let query;
    if(hook.id !== null && hook.id !== undefined) {
      query = {_id: hook.id};
    } else {
      query = hook.params.query;
    }

    try {
      let results = await hook.app.service(options.service).find({query: query});

      for (var i = 0; i < results.length; i++) {
        const item = results[i];
        if(!hook.app.get(options.containerProperty)) {
          return Promise.reject(new Error('Sorry container path is missing'));
        }
        if(!item[options.folderNameProperty]) {
          return Promise.reject(new Error('Sorry but the item was missing a ' + options.folderNameProperty + ' and could not be deleted from disk.'));
        }
        const folderName = path.join(hook.app.get(options.containerProperty), item[options.folderNameProperty] || 'al23gGj1j5335j235jl239');
        console.log("Deleted " + folderName + ' from disk');
        fse.remove(folderName);
      }
      return Promise.resolve(hook);
    } catch(err) {
      console.log('Error removing item from disk', err);
      return Promise.reject(err);
    }

  }
}
