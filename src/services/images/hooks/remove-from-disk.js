import fse from 'fs-extra';
import path from 'path';

export default options => {
  return hook => {
    for (var i = 0; i < hook.result.length; i++) {
      const image = hook.result[i];
      if(!hook.app.get('clientPath')) {
        return new Error('Sorry client path is missing');
      }
      const folderName = path.join(hook.app.get('clientPath'), image.url || 'al23gl239');
      fse.remove(folderName);
    }
    return hook;
  }
}

export default options => {
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
      let results = await hook.app.service('images').find({query: query});

      for (var i = 0; i < results.length; i++) {
        const image = results[i];
        if(!hook.app.get('uploadsPath')) {
          return Promise.reject(new Error('Sorry uploadsPath is missing'));
        }
        if(!image.url) {
          return Promise.reject(new Error('Sorry but the image was missing a url and could not be deleted from disk.'));
        }
        const folderName = path.join(hook.app.get('uploadsPath'), image.url || 'al23gGj1j5335j235jl239');
        fse.remove(folderName);
      }
      return Promise.resolve(hook);
    } catch(err) {
      console.log('Error removing image from disk', err);
      return Promise.reject(err);
    }

  }
}
